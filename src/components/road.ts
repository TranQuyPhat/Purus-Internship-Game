import * as pc from "playcanvas";

// Hàm tạo segment (đường)
export function createRoad(app, position) {
  const road = new pc.Entity("Road");
  app.root.addChild(road);

  road.addComponent("model", { type: "box" });
  road.setLocalScale(30, 0.01, 4); // Kích thước của đường (segment)
  road.setPosition(position.x, position.y, position.z);

  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color(0.2, 0.2, 0.2); // Màu xám cho đường
  material.update();

  road.model.material = material;

  return road;
}
