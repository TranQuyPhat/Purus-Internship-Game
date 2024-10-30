import * as pc from "playcanvas";

window.onload = async () => {
  console.log("Window loaded");
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const app = new pc.Application(canvas);
  app.start();

  // Đặt cấu hình cho chế độ màn hình và độ phân giải
  app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);

  window.addEventListener("resize", () => {
    console.log("Canvas resized");
    app.resizeCanvas();
  });

  // Tạo và tải phông chữ
  const fontAsset = new pc.Asset("font", "font", {
    url: "./Utils/Courier Prime Bold Italic/200536323/Courier Prime Bold Italic.json",
  });
  app.assets.add(fontAsset);
  // await new Promise((resolve, reject) => {
  //   fontAsset.once("load", () => {
  //     console.log("Font loaded successfully");
  //     resolve(null);
  //   });
  //   fontAsset.once("error", (err) => {
  //     console.error("Error loading font:", err);
  //     reject(err);
  //   });
  // });
  app.assets.load(fontAsset);
  console.log(fontAsset);

  // Tạo màn hình nền cho UI
  const screen = new pc.Entity();
  screen.addComponent("screen", {
    referenceResolution: new pc.Vec2(1280, 720),
    scaleBlend: 0.5,
    scaleMode: pc.SCALEMODE_BLEND,
    screenSpace: true,
  });
  app.root.addChild(screen);
  console.log("Screen entity created and added to app root");

  // Tạo văn bản cơ bản
  const textBasic = new pc.Entity();
  textBasic.setLocalPosition(0, 200, 0);
  textBasic.addComponent("element", {
    pivot: new pc.Vec2(0.5, 0.5),
    anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
    fontAsset: fontAsset.id,
    fontSize: 42,
    color: new pc.Color(1, 1, 1), // Đảm bảo màu trắng để nổi bật
    text: "Basic Text",
    type: pc.ELEMENTTYPE_TEXT,
  });
  screen.addChild(textBasic);
  console.log("Text entity created and added to screen");

  // Thêm camera và ánh sáng cho scene
  const camera = new pc.Entity("Camera");
  camera.addComponent("camera", {
    clearColor: new pc.Color(0.5, 0.5, 0.8),
  });
  camera.setPosition(0, 0, 10); // Định vị camera phù hợp
  app.root.addChild(camera);
  console.log("Camera entity created and added to app root");

  const light = new pc.Entity("Light");
  light.addComponent("light", {
    type: "directional",
    color: new pc.Color(1, 1, 1),
  });
  light.setEulerAngles(45, 0, 0);
  app.root.addChild(light);
  console.log("Light entity created and added to app root");

  console.log("Setup complete. Check if text is visible on screen.");
};
