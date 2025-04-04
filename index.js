import { Player } from "./components/player.js";
import { Ship } from "./components/ship.js";

const playerOne = new Player("User", false);
const playerTwo = new Player("Computer", true);

const userArea = document.querySelector(".user-board");
const compArea = document.querySelector(".comp-board");

playerTwo.board.randomPlace();

function renderBoard(player) {
  const playerBoard = player.board.board;
  for (let i = 0; i < playerBoard.length; i++) {
    // const row = document.createElement("div");
    // row.className = "row";
    let y = i;
    for (let j = 0; j < playerBoard[i].length; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("data-row", [i]);
      cell.setAttribute("data-col", [j]);

      if (player.name === "Computer") {
        cell.classList.add("computer");
        cell.addEventListener(
          "click",
          (e) => {
            if (playerBoard[i][j] instanceof Ship) {
              player.board.hit([i, j]);
              cell.classList.add("hit");
              if (player.board.over === true) {
                const overlay = document.querySelector(".gameover-overlay");
                const message = document.querySelector(".message");
                message.textContent = `${player.name} loses`;
                overlay.style.visibility = "visible";
              }
            } else {
              cell.classList.add("miss");
            }
          },
          { once: true }
        );
      } else {
        cell.addEventListener("dragover", (e) => {
          e.preventDefault();
          const shipLength = parseInt(e.dataTransfer.getData("text/plain"));
          cell.classList.add("drag-hover");
        });
        cell.addEventListener("dragleave", (e) => {
          cell.classList.remove("drag-hover");
        });
        cell.addEventListener("drop", (e) => {
          e.preventDefault();
          const data = e.dataTransfer.getData("text/plain");
          const draggedElement = document.getElementById(data);
          for (let i = 0; i < data; i++) {
            let cellNumber = parseInt(cell.getAttribute("data-row"));
            let cellCol = parseInt(cell.getAttribute("data-col"));
            let cellRow = cellNumber + i;
            let placeCell = document.querySelector(
              `[data-row="${cellRow}"][data-col="${cellCol}"]`
            );
            placeCell.classList.add("placed-ship");
            console.log(cellRow);
            console.log(cell);
          }
        });
      }
      // row.appendChild(cell);
      if (player.name !== "Computer") {
        userArea.appendChild(cell);
      } else {
        compArea.appendChild(cell);
      }
    }
  }

  //   if (player.name !== "Computer") {
  //     userArea.appendChild(row);
  //   } else {
  //     compArea.appendChild(row);
  //   }
  // }
}

(function () {
  const shipsArea = document.querySelector(".user-ships");
  const ships = [
    playerOne.board.carrier,
    playerOne.board.battleShip,
    playerOne.board.cruiser,
    playerOne.board.submarine,
    playerOne.board.destroyer,
  ];
  ships.forEach((ship) => {
    const shipCell = document.createElement("div");
    shipCell.className = "user-ship";
    shipCell.setAttribute("data-length", ship.length);
    shipCell.setAttribute("data-name", ship.name);
    shipCell.draggable = true;
    shipCell.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData(
        "text/plain",
        shipCell.getAttribute("data-length")
      );
    });
    for (let i = 0; i < ship.length; i++) {
      const cell = document.createElement("div");
      cell.className = "user-cell";
      shipCell.appendChild(cell);
    }
    shipsArea.appendChild(shipCell);
  });
})();

renderBoard(playerOne);
renderBoard(playerTwo);
