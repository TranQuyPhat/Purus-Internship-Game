import * as pc from "playcanvas";
export function createGreenMaterial() {
  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color(0.5, 0.8, 0.2); // Green color
  material.update();
  return material;
}
