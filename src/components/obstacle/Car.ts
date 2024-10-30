import * as pc from "playcanvas";

export class CarManager {
  private app: pc.Application;
  private Cars: pc.Entity[]; // Mảng để lưu trữ các đối tượng ô tô
  private posX: number;
  private cellSize: number; // Kích thước ô của mỗi xe
  private rows: number;
  private carAssets: pc.Asset[]; // Mảng asset của xe

  constructor(app, cellSize, posX, rows, cols) {
    this.app = app;
    this.cellSize = cellSize;
    this.Cars = [];
    this.posX = posX;
    this.rows = rows;
    this.Roads = [];
    this.cols = cols;
    // Tải các asset xe khi khởi tạo CarManager
    this.carAssets = [];
    this.loadCarAssets();
  }

  // Phương thức để tải nhiều asset xe từ file .glb
  loadCarAssets() {
    const carAssetUrls = [
      "../../../assets/SportsCa1/SportsCar.glb",
      "../../../assets/SportsCar/SportsCar.glb",
    ];

    carAssetUrls.forEach((url) => {
      this.app.assets.loadFromUrl(
        url,
        "model",
        (err, asset: pc.Asset | undefined) => {
          if (err) {
            console.error("Error loading car asset: ", err);
            return;
          }
          this.carAssets.push(asset); // Thêm asset vào mảng
        }
      );
    });
  }
  getRandomCarAsset() {
    const randomIndex = Math.floor(Math.random() * this.carAssets.length);
    return this.carAssets[randomIndex];
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
  async createCars(zPosition, randomValue) {
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
    for (let i = 0; i < 4; i++) {
      const Car = new pc.Entity();
      Car.name = "car";
      const randomAsset = this.getRandomCarAsset();

      Car.addComponent("model", {
        type: "asset",
        asset: randomAsset,
      });
      let posXObs = this.posX / 2;
      let startX;
      if (i % 2 == 0) {
        startX = -posXObs;
        Car.setEulerAngles(0, 90, 0);
      } else {
        startX = posXObs;
        Car.setEulerAngles(0, -90, 0);
      }
      const startZ =
        zPosition - this.cellSize * (i + 1) - this.rows / 3 - this.cellSize / 2;

      if (randomAsset === this.carAssets[0]) {
        Car.setPosition(startX, 0, startZ);
      } else {
        Car.setPosition(startX, 0, startZ);
      }

      const scale = 1;
      Car.setLocalScale(scale, scale, scale);
      this.app.root.addChild(Car);
      this.Cars.push(Car);

      await new Promise((resolve) => setTimeout(resolve, randomValue));
    }
  }
  update() {
    this.Cars.forEach((Car, index) => {
      const pos = Car.getPosition();
      const posXObs = this.posX / 2;
      // pos.x += 0.3;
      // if (pos.x > posXObs) {
      //   pos.x = -posXObs;
      // }
      if (index % 2 === 0) {
        pos.x += 0.3;
        if (pos.x > posXObs) {
          pos.x = -posXObs;
        }
      } else {
        pos.x -= 0.3;
        if (pos.x < -posXObs) {
          pos.x = posXObs;
        }
      }

      Car.setPosition(pos);
    });
  }

  getListCar() {
    return this.Cars;
  }
}
