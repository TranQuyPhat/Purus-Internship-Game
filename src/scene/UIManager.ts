import * as pc from "playcanvas";

export class UIManager {
  private app: pc.Application;
  private scoreText: pc.Entity;
  private coinText: pc.Entity;
  private score: number;
  private coins: number;

  constructor(app: pc.Application, score, coins) {
    this.app = app;
    this.score = score;
    this.coins = coins;
    this.createHUD();
  }

  private createHUD() {
    const fontAsset = new pc.Asset("font", "font", {
      url: "./Utils/Courier Prime Bold Italic/200536323/Courier Prime Bold Italic.json",
    });
    this.app.assets.add(fontAsset);
    this.app.assets.load(fontAsset);

    // Tạo screen
    const screen = new pc.Entity();
    screen.addComponent("screen", {
      referenceResolution: new pc.Vec2(1280, 720),
      scaleBlend: 0.5,
      scaleMode: pc.SCALEMODE_BLEND,
      screenSpace: true,
    });
    this.app.root.addChild(screen);

    // Tạo container cho score và coin
    const hudContainer = new pc.Entity("HUDContainer");
    hudContainer.addComponent("element", {
      anchor: new pc.Vec4(0, 1, 0, 1), // Đặt ở góc trên bên trái
      pivot: new pc.Vec2(0, 1),
      margin: new pc.Vec4(10, -10, 10, 10), // Margin để không sát cạnh màn hình
      type: pc.ELEMENTTYPE_GROUP,
      useInput: false,
    });
    screen.addChild(hudContainer);

    // Tạo score text
    this.scoreText = new pc.Entity("ScoreText");
    this.scoreText.addComponent("element", {
      pivot: new pc.Vec2(0, 1),
      anchor: new pc.Vec4(0, 1, 0, 1),
      fontAsset: fontAsset.id,
      fontSize: 32,
      color: new pc.Color(1, 1, 1),
      text: `Score: ${this.score}`,
      type: pc.ELEMENTTYPE_TEXT,
    });
    hudContainer.addChild(this.scoreText);
    this.scoreText.setLocalPosition(0, 0, 0);

    // Tạo coin text
    this.coinText = new pc.Entity("CoinText");
    this.coinText.addComponent("element", {
      pivot: new pc.Vec2(0, 1),
      anchor: new pc.Vec4(0, 1, 0, 1),
      fontAsset: fontAsset.id,
      fontSize: 32,
      color: new pc.Color(1, 1, 0), // Màu vàng cho coin
      text: `Coins: ${this.coins}`,
      type: pc.ELEMENTTYPE_TEXT,
    });
    hudContainer.addChild(this.coinText);
    this.coinText.setLocalPosition(0, -40, 0); // Đặt dưới score text
  }

  public addScore(value: number) {
    this.score += value;
    this.updateScoreText();
  }

  public addCoin() {
    this.coins += 10;
    this.updateCoinText();
  }

  private updateScoreText() {
    if (this.scoreText && this.scoreText.element) {
      this.scoreText.element.text = `Score: ${this.score}`;
    }
  }

  private updateCoinText() {
    if (this.coinText && this.coinText.element) {
      this.coinText.element.text = `Coins: ${this.coins}`;
    }
  }
}
