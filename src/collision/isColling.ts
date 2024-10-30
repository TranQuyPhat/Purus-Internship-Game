export function checkCollision(coin, characterEntity) {
  // Lấy vị trí và bán kính của coin
  const coinPosition = coin.getPosition();
  const coinRadius = 0.8; // bán kính của coin

  // Lấy vị trí và kích thước của characterEntity
  const characterPosition = characterEntity.getPosition();
  const characterScale = characterEntity.getLocalScale();

  // Tính toán kích thước của characterEntity
  const characterHalfWidth = (characterScale.x * 1) / 2; // chiều rộng
  const characterHalfHeight = (characterScale.y * 1) / 2; // chiều cao
  const characterHalfDepth = (characterScale.z * 1) / 2; // chiều sâu

  // Tính khoảng cách giữa coin và characterEntity
  const dx = coinPosition.x - characterPosition.x;
  const dy = coinPosition.y - characterPosition.y;
  const dz = coinPosition.z - characterPosition.z;

  // Kiểm tra va chạm giữa hình cầu (coin) và hình hộp (characterEntity)
  const closestX = Math.max(
    characterPosition.x - characterHalfWidth,
    Math.min(coinPosition.x, characterPosition.x + characterHalfWidth)
  );
  const closestY = Math.max(
    characterPosition.y - characterHalfHeight,
    Math.min(coinPosition.y, characterPosition.y + characterHalfHeight)
  );
  const closestZ = Math.max(
    characterPosition.z - characterHalfDepth,
    Math.min(coinPosition.z, characterPosition.z + characterHalfDepth)
  );

  // Tính khoảng cách giữa điểm gần nhất và coin
  const distanceX = coinPosition.x - closestX;
  const distanceY = coinPosition.y - closestY;
  const distanceZ = coinPosition.z - closestZ;

  // Tính khoảng cách thực tế
  const distanceSquared =
    distanceX * distanceX + distanceY * distanceY + distanceZ * distanceZ;

  // Kiểm tra xem khoảng cách có nhỏ hơn bán kính không
  return distanceSquared < coinRadius * coinRadius;
}
