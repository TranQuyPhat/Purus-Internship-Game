export function isColliding(box1, box2) {
  let pos1 = box1.getPosition();
  let scale1 = box1.getLocalScale();
  // console.log("Position 1:", pos1.x);

  let pos2 = box2.getPosition();
  let scale2 = box2.getLocalScale();
  // console.log("Position 2:", pos2.x);

  let xCollide = Math.abs(pos1.x - pos2.x) <= scale1.x / 2 + scale2.x / 7.5;
  // console.log(
  //   `Math.abs(pos1.x - pos2.x) ${Math.abs(pos1.x - pos2.x)}   ${
  //     scale1.x / 2 + scale2.x / 10
  //   } `
  // );

  let yCollide = Math.abs(pos1.y - pos2.y) <= scale1.y / 2 + scale2.y / 2;

  let zCollide = Math.abs(pos1.z - pos2.z) <= scale1.z / 2 + scale2.z / 2;
  return xCollide && yCollide && zCollide;
}
