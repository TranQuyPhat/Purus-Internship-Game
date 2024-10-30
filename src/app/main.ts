import * as pc from "playcanvas";
import { createBox } from "../components/box.ts";
import { createCamera } from "../components/camera.ts";
import { createLight } from "../components/light.ts";
import { InputHandler } from "../input/inputHandler.ts";
import { SegmentManager } from "../components/segmentManager.ts";
import { UIManager } from "../scene/UIManager";
window.onload = async () => {
  const canvas = document.createElement("canvas");

  document.body.appendChild(canvas);

  const app = new pc.Application(canvas);
  app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);
  app.start();
  // const audioManager = new AudioManager(app);
  const input = new InputHandler();
  const cameraEntity = createCamera(app);
  const light = createLight(app);
  const rows = 9;
  const cols = 30;
  const cellSize = 2;
  const vec = new pc.Vec3(0, 0, -rows - 1);

  const box = createBox(app, input, vec, cameraEntity, cellSize, cols);
  const fontAsset = new pc.Asset("font", "font", {
    url: "./Utils/Courier Prime Bold Italic/200536323/Courier Prime Bold Italic.json",
  });
  app.assets.add(fontAsset);
  app.assets.load(fontAsset);

  // Tạo màn hình nền cho UI
  let coins = 0;
  let score = 0;
  // Tạo văn bản cơ bản

  const uiManager = new UIManager(app, score, coins);
  const segmentManager = new SegmentManager(
    app,
    box,
    rows,
    cols,
    cellSize,
    uiManager
  );
  segmentManager.createSegment(0);

  // Create a 2D screen

  app.on("update", (dt) => {
    segmentManager.update(dt);
  });
  app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);
  window.addEventListener("resize", () => app.resizeCanvas());
};
