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
    let y = i;
    for (let j = 0; j < playerBoard[i].length; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("data-row", i);
      cell.setAttribute("data-col", j);
      if (playerBoard[i][j] instanceof Ship) {
        cell.setAttribute("data-name", playerBoard[i][j].name);
        cell.setAttribute("data-length", playerBoard[i][j].length);
      }

      if (player.name === "Computer") {
        cell.classList.add("computer");
      } else {
        //dragover
        cell.addEventListener("dragover", (e) => {
          e.preventDefault();
          cell.classList.add("drag-hover");
        });
        //dragleave
        cell.addEventListener("dragleave", (e) => {
          cell.classList.remove("drag-hover");
        });
        //drop
        cell.addEventListener("drop", (e) => {
          e.preventDefault();
          cell.classList.remove("drag-hover");
          const data = e.dataTransfer.getData("text/plain");
          const shipObject = JSON.parse(
            e.dataTransfer.getData("application/json")
          );
          let ship = document.querySelector(
            `.user-ship[data-name = ${shipObject.name}]`
          );
          const shipForPlacement = {};
          for (const key in shipObject) {
            if (shipObject.hasOwnProperty(key)) {
              shipForPlacement[key] = shipObject[key];
            }
          }
          const rotateButton = document.querySelector(".rotate-button");

          for (let i = 0; i < data; i++) {
            if (shipObject.vertical === true) {
              if (parseInt(e.target.dataset.row) + shipObject.length <= 10) {
                let cellNumber = parseInt(cell.getAttribute("data-row"));
                let cellCol = parseInt(cell.getAttribute("data-col"));
                let cellRow = cellNumber + i;
                let placeCell = document.querySelector(
                  `[data-row="${cellRow}"][data-col="${cellCol}"]`
                );
                placeCell.classList.add("placed-ship");
                placeCell.setAttribute("data-length", shipObject.length);
                placeCell.setAttribute("data-name", shipObject.name);
                ship.draggable = false;
                ship.style.visibility = "hidden";
                if (allShipsPlaced()) {
                  rotateButton.style.display = "none";
                }
              }
            } else {
              if (parseInt(e.target.dataset.col) + shipObject.length <= 10) {
                let cellRow = parseInt(cell.getAttribute("data-row"));
                let cellNumber = parseInt(cell.getAttribute("data-col"));
                let cellCol = cellNumber + i;
                let placeCell = document.querySelector(
                  `[data-row="${cellRow}"][data-col="${cellCol}"]`
                );
                placeCell.classList.add("placed-ship");
                placeCell.setAttribute("data-length", data);
                placeCell.setAttribute("data-name", shipObject.name);
                ship.draggable = false;
                ship.style.visibility = "hidden";
                if (allShipsPlaced()) {
                  rotateButton.style.display = "none";
                }
              }
            }
            console.log(shipForPlacement);
          }
        });
      }
      if (player.name !== "Computer") {
        userArea.appendChild(cell);
      } else {
        compArea.appendChild(cell);
      }
    }
  }
}

(function () {
  const shipsArea = document.querySelector(".user-ships");
  const ships = [
    playerOne.board.carrier,
    playerOne.board.battleship,
    playerOne.board.cruiser,
    playerOne.board.submarine,
    playerOne.board.destroyer,
  ];
  ships.forEach((ship) => {
    const shipCell = document.createElement("div");
    shipCell.className = "user-ship";
    shipCell.style.visibility = "visible";
    shipCell.setAttribute("data-length", ship.length);
    shipCell.setAttribute("data-name", ship.name);
    shipCell.setAttribute("data-vertical", true);
    shipCell.draggable = true;
    shipCell.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData(
        "text/plain",
        shipCell.getAttribute("data-length"),
        e.dataTransfer.setData("application/json", JSON.stringify(ship))
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
const rotateButton = document.querySelector(".rotate-button");
const ships = [
  playerOne.board.carrier,
  playerOne.board.battleShip,
  playerOne.board.cruiser,
  playerOne.board.submarine,
  playerOne.board.destroyer,
];
rotateButton.addEventListener("click", () => {
  const shipWrapper = document.querySelector(".user-ships");
  const userShip = document.querySelectorAll(".user-ship");
  userShip.forEach((ship) => {
    ship.classList.toggle("rotated");
    for (let i = 0; i < ships.length; i++) {
      if (ships[i].vertical === true) {
        ships[i].vertical = false;
      } else {
        ships[i].vertical = true;
      }
    }
  });
  shipWrapper.classList.toggle("container-rotated");
});

function allShipsPlaced() {
  const ships = document.querySelectorAll(".user-ship");
  for (let i = 0; i < ships.length; i++) {
    if (ships[i].style.visibility !== "hidden") {
      return false;
    }
  }
  return true;
}

// cells for selection
function selectable() {
  const cells = document.querySelectorAll(".computer");
  const playerBoard = playerTwo.board.board;
  cells.forEach((cell) => {
    cell.addEventListener(
      "click",
      (e) => {
        console.log(e.target.dataset.name);
        if ("name" in e.target.dataset) {
          let y = parseInt(e.target.dataset.col);
          let x = parseInt(e.target.dataset.row);
          playerTwo.board.hit(e.target.dataset.name);
          cell.classList.add("hit");
          if (playerTwo.board.over === true) {
            const overlay = document.querySelector(".gameover-overlay");
            const message = document.querySelector(".message");
            message.textContent = `${playerTwo.name} loses`;
            overlay.style.visibility = "visible";
          }
        } else {
          cell.classList.add("miss");
        }
      },
      { once: true }
    );
  });
}

renderBoard(playerOne);
renderBoard(playerTwo);
selectable();
