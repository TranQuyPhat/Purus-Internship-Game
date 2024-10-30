import * as pc from "playcanvas";

// Mở rộng loại Entity để thêm thuộc tính isGround
declare module "playcanvas" {
  interface Entity {
    isGround?: boolean;
    isDie?: boolean;
  }
}
