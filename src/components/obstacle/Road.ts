import * as pc from "playcanvas";
import { isColliding } from "../../collision/checkCollision";

export class RoadManager {
  constructor(app, cellSize, posX, rows, cols) {
    this.app = app;
    this.cellSize = cellSize;
    this.Roads = [];
    this.posX = posX;
    this.rows = rows;
    this.cols = cols;
  }
  async loadRoadAsset() {
    return new Promise((resolve, reject) => {
      this.app.assets.loadFromUrl(
        "../../../assets/road (1)/road.glb",
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
  async createRoads(zPosition, randomValue) {
    // Tải tài sản cho gỗ
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
    await new Promise((resolve) => setTimeout(resolve, randomValue));
    // for (let i = 0; i < 4; i++) {

    // }
  }
}
