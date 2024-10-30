import * as pc from "playcanvas";
 
export function createBoxMaterial(app) {
  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color(0.5, 0.5, 0.5); // Màu sắc của box
  material.useLighting = true; // Bật sử dụng ánh sáng
  material.update(); // Cập nhật vật liệu

  return material;
}
