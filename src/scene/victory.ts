// victory.ts
import * as pc from "playcanvas";

export function showVictory(app: pc.Application) {
  // Tạo một scene mới cho màn hình "Victory"
  const victoryScene = new pc.Entity("VictoryScene");

  // Tạo và thêm văn bản "Victory!"
  const victoryText = document.createElement("div");
  victoryText.innerHTML = "Victory!";
  victoryText.style.position = "absolute";
  victoryText.style.top = "40%";
  victoryText.style.left = "50%";
  victoryText.style.transform = "translate(-50%, -50%)";
  victoryText.style.fontSize = "40px";
  victoryText.style.color = "gold";
  document.body.appendChild(victoryText);

  // Tạo và thêm văn bản "Congratulations!"
  const congratsText = document.createElement("div");
  congratsText.innerHTML = "Congratulations!";
  congratsText.style.position = "absolute";
  congratsText.style.top = "50%";
  congratsText.style.left = "50%";
  congratsText.style.transform = "translate(-50%, -50%)";
  congratsText.style.fontSize = "30px";
  congratsText.style.color = "white";
  document.body.appendChild(congratsText);

  // Tạo và thêm nút "Play Again"
  const playAgainButton = document.createElement("button");
  playAgainButton.innerHTML = "Play Again";
  playAgainButton.style.position = "absolute";
  playAgainButton.style.top = "60%";
  playAgainButton.style.left = "50%";
  playAgainButton.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(playAgainButton);

  // Thêm sự kiện cho nút Play Again
  playAgainButton.addEventListener("click", () => {
    location.reload(); // Tải lại trang để khởi động lại trò chơi
  });

  app.off("update");

  // Đưa scene "Victory" vào app
  app.root.addChild(victoryScene);
}
