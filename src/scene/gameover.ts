// gameOverScene.ts
import * as pc from "playcanvas";

export function showGameOver(app: pc.Application) {
  // Tạo một scene mới cho màn hình "Game Over"
  const gameOverScene = new pc.Entity("GameOverScene");

  // Tạo và thêm văn bản "Game Over"
  const gameOverText = document.createElement("div");
  gameOverText.innerHTML = "Game Over";
  gameOverText.style.position = "absolute";
  gameOverText.style.top = "50%";
  gameOverText.style.left = "50%";
  gameOverText.style.transform = "translate(-50%, -50%)";
  gameOverText.style.fontSize = "30px";
  gameOverText.style.color = "red";
  document.body.appendChild(gameOverText);

  // Tạo và thêm nút "Restart"
  const restartButton = document.createElement("button");
  restartButton.innerHTML = "Restart";
  restartButton.style.position = "absolute";
  restartButton.style.top = "60%";
  restartButton.style.left = "50%";
  restartButton.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(restartButton);

  restartButton.addEventListener("click", () => {
    location.reload(); // Tải lại trang để khởi động lại trò chơi
  });

  app.off("update");

  app.root.addChild(gameOverScene);
}
