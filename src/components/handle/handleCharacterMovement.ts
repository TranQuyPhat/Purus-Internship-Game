export function handlecharacterEntityMovement(
  characterEntity,
  input,
  keyState,
  cellSize,
  range
) {
  const minX = -range;
  const maxX = range;
  // Đặt hướng mặc định là "up" nếu chưa có
  if (!characterEntity.direction) {
    characterEntity.direction = "up";
  }
  let nextDirection = "";

  // ArrowUp
  if (input.isKeyPressed("ArrowUp") && !keyState.upPressed) {
    const currentPosition = characterEntity.getPosition();
    characterEntity.setPosition(
      currentPosition.x,
      currentPosition.y,
      currentPosition.z - cellSize
    );
    nextDirection = "up";
    keyState.upPressed = true;
  }

  if (!input.isKeyPressed("ArrowUp") && keyState.upPressed) {
    keyState.upPressed = false;
  }

  // ArrowRight
  if (
    input.isKeyPressed("ArrowRight") &&
    !keyState.rightPressed &&
    characterEntity.getPosition().x < maxX
  ) {
    const currentPosition = characterEntity.getPosition();
    characterEntity.setPosition(
      currentPosition.x + cellSize,
      currentPosition.y,
      currentPosition.z
    );
    console.log(characterEntity.getPosition().x);

    nextDirection = "right";
    keyState.rightPressed = true;
  }

  if (!input.isKeyPressed("ArrowRight") && keyState.rightPressed) {
    keyState.rightPressed = false;
  }

  // ArrowLeft
  if (
    input.isKeyPressed("ArrowLeft") &&
    !keyState.leftPressed &&
    characterEntity.getPosition().x > minX
  ) {
    const currentPosition = characterEntity.getPosition();
    characterEntity.setPosition(
      currentPosition.x - cellSize,
      currentPosition.y,
      currentPosition.z
    );
    nextDirection = "left";
    keyState.leftPressed = true;
  }

  if (!input.isKeyPressed("ArrowLeft") && keyState.leftPressed) {
    keyState.leftPressed = false;
  }

  // Kiểm tra hướng hiện tại và hướng tiếp theo
  if (nextDirection && nextDirection !== characterEntity.direction) {
    // Cập nhật góc xoay dựa trên hướng tiếp theo
    switch (nextDirection) {
      case "up":
        characterEntity.setEulerAngles(0, 180, 0);
        break;
      case "right":
        characterEntity.setEulerAngles(0, 90, 0);
        break;
      case "left":
        characterEntity.setEulerAngles(0, -90, 0);
        break;
    }

    // Cập nhật hướng hiện tại thành hướng tiếp theo
    characterEntity.direction = nextDirection;
  }
}
