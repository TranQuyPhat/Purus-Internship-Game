import * as pc from "playcanvas";
import { handlecharacterEntityMovement } from "./handle/handleCharacterMovement";
import { updateCamera } from "./camera";
enum CharacterDirection {
  UP = "up",
  LEFT = "left",
  RIGHT = "right",
}
export function createBox(app, input, position, camera, cellSize, cols) {
  const characterEntity = new pc.Entity("Character");
  app.root.addChild(characterEntity);

  characterEntity.rotate(0, -90, 0);

  // make the character rotate
  // app.on("update", (dt) => characterEntity.rotate(0, 100 * dt, 0));
  const keyState = {
    upPressed: false,
    rightPressed: false,
    leftPressed: false,
  };
  app.assets.loadFromUrl(
    "./assets/KFCchicken/KFC chicken.glb",
    "model",
    (err, asset: pc.Asset | undefined) => {
      if (err) {
        console.error(err);
        return;
      }

      characterEntity.addComponent("model", {
        type: "asset",
        asset: asset,
      });

      characterEntity.addComponent("model", { type: "box" });
      characterEntity.setPosition(position.x, position.y, position.z);
      characterEntity.setEulerAngles(0, 180, 0);
      characterEntity.name = "player";
      characterEntity.addComponent("collision", { type: "box" });
      characterEntity.addComponent("rigidbody", {
        type: "kinematic", // hoặc "kinematic" nếu bạn không muốn ảnh hưởng của trọng lực
      });
      // the character is too big, scale it down
      const scale = 1.5;
      characterEntity.setLocalScale(scale, scale, scale);

      // ==============================LOAD CHARACTER TEXTURE=============================
      // load the texture
    }
  );

  app.on("update", () => {
    handlecharacterEntityMovement(
      characterEntity,
      input,
      keyState,
      cellSize,
      8
    );
    updateCamera(camera, characterEntity, cols + cellSize * 5);
  });

  return characterEntity;
}
