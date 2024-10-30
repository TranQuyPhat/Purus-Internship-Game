import * as pc from "playcanvas";
export function createCamera(app) {
  const camera = new pc.Entity("MainCamera");
  app.root.addChild(camera);

  camera.addComponent("camera", {
    clearColor: new pc.Color(66 / 255, 135 / 255, 245 / 255),
  });
  camera.setPosition(0, 10, 45);
  camera.setEulerAngles(-0, 0, 0);
  return camera;
}

export function updateCamera(camera, targetCharacterEntity, range) {
  const cameraOffset = new pc.Vec3(10, 30, 10);
  const minX = -range;
  const maxX = range;

  // Lấy vị trí mục tiêu và thêm offset
  const targetPosition = targetCharacterEntity
    .getPosition()
    .clone()
    .add(cameraOffset);

  // Giới hạn camera trong khoảng x = -30 đến x = 30
  let cameraX = targetPosition.x;
  if (cameraX < minX) {
    cameraX = minX;
  } else if (cameraX > maxX) {
    cameraX = maxX;
  }

  // Đặt vị trí camera với giá trị x đã được giới hạn
  camera.setPosition(cameraX, targetPosition.y, targetPosition.z);

  // Đảm bảo camera nhìn về nhân vật
  camera.lookAt(targetCharacterEntity.getPosition());
}
