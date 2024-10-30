import * as pc from "playcanvas";
export class CoinManager {
  private app: pc.Application;
  private coins: pc.Entity[] = [];
  private cellSize: number;

  constructor(app: pc.Application, cellSize: number) {
    this.app = app;
    this.cellSize = cellSize;
  }

  createCoin(x: number, z: number) {
    const coin = new pc.Entity();

    // Thêm model
    coin.addComponent("model", {
      type: "cylinder",
    });

    // Scale phù hợp
    coin.setLocalScale(1, 0.1, 1);

    // Đặt position
    coin.setPosition(x, 1, z);

    coin.setEulerAngles(90, 0, 0);

    // Thêm material
    const material = new pc.StandardMaterial();
    material.diffuse = new pc.Color(1, 0.84, 0);
    material.metalness = 1;
    material.shininess = 100;
    material.update();
    coin.model.material = material;

    // Điều chỉnh collision radius lớn hơn
    coin.addComponent("collision", {
      type: "sphere",
      radius: 0.8, // Điều chỉnh radius phù hợp
      height: 0.2,
    });

    coin.tags.add("coin");
    this.app.root.addChild(coin);
    this.coins.push(coin);

    return coin;
  }

  getCoins() {
    return this.coins;
  }

  // Xóa coin khỏi scene và array
  removeCoin(coin: pc.Entity) {
    // Remove from scene
    coin.destroy();

    // Remove from array
    const index = this.coins.indexOf(coin);
    if (index > -1) {
      this.coins.splice(index, 1);
    }
  }

  clearAllCoins() {
    this.coins.forEach((coin) => {
      coin.destroy();
    });
    this.coins = [];
  }
}
