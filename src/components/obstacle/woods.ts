import * as pc from "playcanvas";
import { isColliding } from "../../collision/checkCollision";

export class WoodManager {
  constructor(app, cellSize, posX, rows, cols) {
    this.app = app;
    this.cellSize = cellSize;
    this.Woods = [];
    this.posX = posX;
    this.rows = rows;
    this.Roads = [];
    this.cols = cols;
  }
  async loadWoodAsset() {
    return new Promise((resolve, reject) => {
      this.app.assets.loadFromUrl(
        "../../../assets/plank/plank.glb",
        "model",
        (err, asset: pc.Asset | undefined) => {
          if (err) {
            console.error("Error loading wood asset: ", err);
            reject(err);
          } else {
            resolve(asset); // Giải quyết promise với tài sản đã tải
          }
        }
      );
    });
  }
  async loadRoadAsset() {
    return new Promise((resolve, reject) => {
      this.app.assets.loadFromUrl(
        "../../../assets/4/road.glb",
        "model",
        (err, asset: pc.Asset | undefined) => {
          if (err) {
            console.error("Error loading Road asset: ", err);
            reject(err);
          } else {
            resolve(asset); // Giải quyết promise với tài sản đã tải
          }
        }
      );
    });
  }
  // Tạo 2 chướng ngại vật tại vị trí giữa của segment (trục Z)
  async createWoods(zPosition) {
    // Tải tài sản cho gỗ
    const woodAsset = await this.loadWoodAsset();
    const RoadAsset = await this.loadRoadAsset();
    const Road = new pc.Entity();
    Road.addComponent("model", {
      type: "asset",
      asset: RoadAsset,
    });

    const startZ =
      zPosition - this.cellSize - this.rows / 3 - this.cellSize * 2 - 0.25;
    Road.setEulerAngles(0, 90, 0);
    const scale = 2.5 * 4; // Kích thước của gỗ có thể được điều chỉnh
    Road.setLocalScale(scale, 0.01, this.cols - 6); // Điều chỉnh tỷ lệ của gỗ
    Road.setPosition(0, 0.05, startZ); // Thiết lập vị trí cho gỗ
    Road.addComponent("collision", { type: "box" }); // Thêm component va chạm
    this.app.root.addChild(Road); // Thêm gỗ vào ứng dụng
    this.Roads.push(Road); // Lưu gỗ vào mảng Roads
    let flip = true; // Biến kiểm soát vị trí ban đầu

    for (let i = 1; i <= 4; i++) {
      const Wood = new pc.Entity();
      Wood.addComponent("model", {
        type: "asset",
        asset: woodAsset,
      });

      let posXObs = this.posX / 2;
      let startX = flip ? -posXObs : posXObs; // Nếu flip là true thì startX là -posXObs, ngược lại là posXObs
      flip = !flip; // Đảo ngược flip cho lần tiếp theo

      const startZ =
        zPosition - this.cellSize * i - this.rows / 3 - this.cellSize / 2;
      const scale = 15; // Kích thước của gỗ có thể được điều chỉnh
      Wood.setLocalScale(scale, scale, scale); // Điều chỉnh tỷ lệ của gỗ
      Wood.setPosition(startX, 0.2, startZ); // Thiết lập vị trí cho gỗ
      Wood.setEulerAngles(0, 78, 6);
      Wood.addComponent("collision", { type: "box" });
      this.app.root.addChild(Wood);
      this.Woods.push(Wood);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  getRandomColor() {
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();

    return new pc.Color(r, g, b);
  }

  // Di chuyển các chướng ngại vật từ trái sang phải
  update() {
    this.Woods.forEach((Wood, index) => {
      const pos = Wood.getPosition();
      const posXObs = this.posX / 2 - 2;
      if (index % 2 === 0) {
        pos.x += 0.1;
        if (pos.x > posXObs) {
          pos.x = -posXObs;
        }
      } else {
        pos.x -= 0.1;
        if (pos.x < -posXObs) {
          pos.x = posXObs;
        }
      }

      Wood.setPosition(pos);
    });
  }
  getListWoods() {
    return this.Woods;
  }
}
