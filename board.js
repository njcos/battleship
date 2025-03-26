import { Ship } from "./ship";
class Board {
  constructor() {
    this.board = this.#createBoard();
    this.shipCount = 5;
    this.carrier = new Ship("Carrier");
    this.battleShip = new Ship("Battleship");
    this.cruiser = new Ship("Cruiser");
    this.submarine = new Ship("Submarine");
    this.destroyer = new Ship("Destroyer");
  }

  #createBoard() {
    let array = [];
    for (let i = 0; i < 10; i++) {
      array.push([]);
      for (let j = 0; j < 10; j++) {
        array[i].push(j);
      }
    }
    return array;
  }

  place(ship, local, orientation) {
    let y = local[0];
    let x = local[1];
    let localY = y;
    let localX = x;
    if (ship.length + y <= 9 && y >= 0 && ship.length + x <= 9 && x >= 0) {
      for (let i = 0; i < ship.length; i++) {
        if (orientation === "vertical") {
          let tempY = y + i;
          localY = tempY;
        } else {
          let tempX = x + i;
          localX = tempX;
        }
        this.board[localY][localX] = ship;
      }
    } else {
      return "Over";
    }
  }

  hit(array) {
    let location = this.board[array[0]][array[1]];
    if (location != "X") {
      if (location instanceof Ship) {
        location.damage();
        if (location.sunk) {
          this.shipCount--;
          console.log(location.name + " sunk");
        }
        console.log(location);
      }
      this.board[array[0]][array[1]] = "X";

      return location;
    }
  }
}

export { Board };
