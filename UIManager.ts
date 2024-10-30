import * as pc from "playcanvas";

class UIManager {
  private app: pc.Application;
  private screen: pc.Entity;

  constructor(app: pc.Application) {
    this.app = app;
    this.createScreen();
    this.createText();
    this.createButton();
  }

  // Tạo màn hình nền cho UI
  private createScreen() {
    this.screen = new pc.Entity("UIScreen");
    this.screen.addComponent("screen", {
      referenceResolution: new pc.Vec2(1280, 720),
      scaleMode: pc.SCALEMODE_BLEND,
      screenSpace: true,
    });
    this.app.root.addChild(this.screen);
  }

  // Tạo một văn bản UI
  private createText() {
    const textEntity = new pc.Entity("UIText");
    textEntity.addComponent("element", {
      type: pc.ELEMENTTYPE_TEXT,
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      fontAsset: this.app.assets.find("fontName"), // Đảm bảo đã thêm font vào assets
      fontSize: 32,
      color: new pc.Color(1, 1, 1),
      text: "Welcome to the Game!",
    });
    textEntity.setLocalPosition(0, 200, 0); // Định vị văn bản trên màn hình
    this.screen.addChild(textEntity);
  }

  // Tạo một nút bấm UI
  private createButton() {
    const buttonEntity = new pc.Entity("UIButton");
    buttonEntity.addComponent("element", {
      type: pc.ELEMENTTYPE_IMAGE,
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      width: 200,
      height: 50,
      color: new pc.Color(0.2, 0.5, 1),
    });
    buttonEntity.setLocalPosition(0, 100, 0); // Định vị nút trên màn hình

    // Thêm sự kiện click cho nút
    buttonEntity.element.on("click", () => {
      console.log("Button clicked!");
    });

    this.screen.addChild(buttonEntity);
  }
}

export default UIManager;
