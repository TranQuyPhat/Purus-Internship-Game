import * as pc from "playcanvas";
import { CarManager } from "./obstacle/Car.ts";
import { WoodManager } from "./obstacle/woods.ts";
import { RoadManager } from "./obstacle/Road.ts";
import { treeManager } from "./obstacle/tree.ts";
import { showGameOver } from "../scene/gameover.ts";
import { isColliding } from "../collision/checkCollision.ts";
import { checkCollision } from "../collision/isColling.ts";
import { UIManager } from "../scene/UIManager";
import { SoundManager } from "../audio/AudioManager.ts";
import { showVictory } from "../scene/victory";
import { CoinManager } from "./coin.ts";

export class SegmentManager {
  private app: pc.Application;
  private box: pc.Entity;
  private segments: pc.Entity[];
  private segmentPool: pc.Entity[];
  private rows: number;
  private cols: number;
  private cellSize: number;
  private lastSegmentPosition: number;
  private woodManager: WoodManager;
  private carManager: CarManager;
  private RoadManager: RoadManager;
  private isGameRunning: boolean;
  private segmentCount: number;
  private segmentMAX: number;
  private isFinalSegmentCreated: boolean;
  private uiManager: UIManager;
  private soundManager: SoundManager;
  private obstacles: pc.Entity[] = [];
  private speed: number;
  private coinManager: CoinManager;
  private treeManager: treeManager;
  constructor(
    app,
    box,
    rows,
    cols,
    cellSize,
    uiManager: UIManager
    // audioManager: AudioManager
  ) {
    this.app = app;
    this.box = box;
    this.segments = [];
    this.segmentPool = [];
    this.listCoin = [];
    this.rows = rows;
    this.cols = cols;
    this.cellSize = cellSize;
    this.lastSegmentPosition = -rows * 2;
    this.woodManager = new WoodManager(
      app,
      cellSize,
      cols * cellSize,
      rows,
      cols
    );
    this.carManager = new CarManager(
      app,
      cellSize,
      cols * cellSize,
      rows,
      cols
    );
    this.RoadManager = new RoadManager(
      app,
      cellSize,
      cols * cellSize,
      rows,
      cols
    );
    this.isGameRunning = true;
    this.segmentCount = 0;
    this.isFinalSegmentCreated = false;
    this.segmentMAX = 5;
    // this.audioManager = audioManager;
    this.uiManager = uiManager;
    this.coinManager = new CoinManager(app, cellSize);
    this.treeManager = new treeManager(app, cellSize, cols, rows);
  }

  async createSegment(zPosition) {
    const randomValue = generateRandomValues(200, 1000, 100);
    let segment;
    if (this.segmentPool.length > 0) {
      segment = this.segmentPool.pop(); // Lấy từ pool
    } else {
      segment = new pc.Entity();
      segment.addComponent("model", { type: "box" });
      if (zPosition === 0) {
        segment.setLocalScale(
          this.cols * this.cellSize,
          0,
          this.rows * this.cellSize
        );
      } else {
        segment.setLocalScale(
          this.cols * this.cellSize,
          0,
          this.rows * this.cellSize
        );
        this.createCoinsForSegment(zPosition);
      }

      const material = new pc.StandardMaterial();
      // material.diffuse = this.getRandomColor();
      material.diffuse = new pc.Color(0, 1, 0); // Màu xanh lá cây (Green)
      material.update();
      segment.model.material = material;
      this.app.root.addChild(segment);

      segment.addComponent("collision", { type: "box" });
      segment.name = "segment";
    }

    segment.setPosition(0, 0, zPosition - this.rows + this.cellSize / 2);

    if (this.segmentCount < this.segmentMAX - 1) {
      this.treeManager.createTrees(10, zPosition - this.cellSize * 5);
    }
    if (this.segmentCount < this.segmentMAX - 1 && zPosition != 0) {
      if (Math.random() < 0.5) {
        await this.carManager.createCars(zPosition, randomValue);
      } else {
        this.woodManager.createWoods(zPosition);
      }
    }

    // this.woodManager.createWoods(zPosition);
    this.segments.push(segment);
    this.segmentCount++;
  }
  private createCoinsForSegment(zPosition: number) {
    // Lấy 2 rows đầu
    const firstTwoRows = [zPosition, zPosition - this.cellSize];

    // Lấy 2 rows cuối
    const lastTwoRows = [
      zPosition - this.cellSize * (this.rows - 1),
      zPosition - this.cellSize * this.rows,
    ];

    // Tạo coins cho 2 rows đầu
    firstTwoRows.forEach((z) => {
      this.createRandomCoinsAtRow(z);
    });

    // Tạo coins cho 2 rows cuối
    lastTwoRows.forEach((z) => {
      this.createRandomCoinsAtRow(z);
    });
  }
  private createRandomCoinsAtRow(z: number) {
    // Random số lượng coin (2-4)
    const numberOfCoins = Math.floor(Math.random() * 3) + 2; // random từ 2 đến 4

    // Tạo array chứa tất cả vị trí x có thể
    const possibleXPositions = [];
    const segmentWidth = this.cols * this.cellSize;
    for (let x = -8; x <= 8; x += this.cellSize) {
      possibleXPositions.push(x);
    }

    // Shuffle array để random vị trí
    for (let i = possibleXPositions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [possibleXPositions[i], possibleXPositions[j]] = [
        possibleXPositions[j],
        possibleXPositions[i],
      ];
    }
    // Lấy n vị trí đầu tiên từ array đã shuffle, với n là số coin cần tạo
    for (let i = 0; i < numberOfCoins; i++) {
      const x = possibleXPositions[i];

      this.coinManager.createCoin(x, z);
    }

    this.listCoin = this.coinManager.getCoins();
  }

  update(dt) {
    if (!this.isGameRunning) return;
    const boxPos = this.box.getPosition();

    if (this.segments.length === this.segmentMAX) {
      const lastSegment = this.segments[this.segments.length - 1];
      const lastSegmentPos = lastSegment.getPosition();
      if (boxPos.z <= lastSegmentPos.z) {
        this.isGamefRunning = false;
        this.showVictoryScreen();
        return;
      }
    }
    const halfwayZ = this.lastSegmentPosition / 2;
    if (boxPos.z < halfwayZ && this.segments.length < this.segmentMAX) {
      this.createSegment(this.lastSegmentPosition);
      this.uiManager.addScore(5);
      this.lastSegmentPosition -= this.rows * 2;
    }

    this.woodManager.update();
    this.carManager.update();
    this.handleWood(boxPos);
    this.handleCar();
    this.handleCoin(dt);
    // handleCoinCollision();
  }
  showVictoryScreen() {
    showVictory(this.app);
  }
  stopGame() {
    this.isGameRunning = false;
    showGameOver(this.app);
    this.soundManager.playSound("gameover");
  }
  handleCar() {
    const listCar = this.carManager.getListCar();
    listCar.forEach((car) => {
      if (isColliding(this.box, car)) {
        this.stopGame();
        return;
      }
    });
  }
  handleCoin(dt) {
    this.listCoin.forEach((coin) => {
      if (coin) {
        coin.rotate(0, dt * 100, 0);
      }
      if (checkCollision(coin, this.box)) {
        this.coinManager.removeCoin(coin);
        this.uiManager.addCoin();
        this.uiManager.addScore(20);
      }
    });
  }
  handleWood(boxPos) {
    const listWoods = this.woodManager.getListWoods();
    let isOnWood = false;
    let isAtWoodLevel = false;

    listWoods.forEach((wood, index) => {
      const woodPos = wood.getPosition();

      // Kiểm tra xem box có ở cùng vị trí z với wood không (với một khoảng dung sai nhỏ)
      if (Math.abs(boxPos.z - woodPos.z) < this.cellSize / 2) {
        isAtWoodLevel = true;

        if (isColliding(this.box, wood)) {
          isOnWood = true;
          const boxPos = this.box.getPosition();

          const posXObs = this.woodManager.posX / 2;

          if (index % 2 === 0) {
            boxPos.x += 0.1;
            if (boxPos.x > posXObs) {
              this.stopGame();
              return;
            }
          } else {
            boxPos.x -= 0.1;
            if (boxPos.x < -posXObs) {
              this.stopGame();
              return;
            }
          }

          boxPos.y = 0.2;
          this.box.setPosition(boxPos);
          this.box.isOnWood = true;
        }
      }
    });

    if (isAtWoodLevel && !isOnWood) {
      this.stopGame();
      return;
    }

    if (!isOnWood) {
      this.box.isOnWood = false;
    }
  }
}
function generateRandomValues(min, max, step) {
  const values = [];

  // Tạo danh sách các giá trị từ min đến max
  for (let i = min; i <= max; i += step) {
    values.push(i);
  }

  // Trộn danh sách để lấy giá trị ngẫu nhiên
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]]; // Hoán đổi
  }
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}
