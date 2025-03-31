import { Player } from "./components/player.js";
import { Ship } from "./components/ship.js";

const playerOne = new Player("User", false);

const userArea = document.querySelector(".user-board");

function renderBoard() {
  const playerBoard = playerOne.board.board;
  for (let i = 0; i < playerBoard.length; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < playerBoard[i].length; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      if (playerBoard[i][j] instanceof Ship) {
        cell.classList.add("ship");
        cell.textContent = `${playerBoard[i][j].name}`;
      }
      row.appendChild(cell);
    }
    userArea.appendChild(row);
  }
}
playerOne.board.randomPlace();

renderBoard();
