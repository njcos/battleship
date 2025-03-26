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

  #isSpaceOpen(ship, local, orientation) {
    for (let i = 0; i < ship.length; i++) {
      if (orientation === "vertical") {
        if (this.board[local[0] + i][local[1]] instanceof Ship) {
          console.log("seats taken");
          return false;
        }
      } else if (this.board[local[0]][local[1]] + i instanceof Ship) {
        console.log("seats taken");
        return false;
      }
    }
    console.log("all clear");
    return true;
  }

  #isOnBoard(ship, local, orientation) {
    let place = local[0];
    if (orientation === "horizontal") {
      place = local[1];
    }
    if (ship.length + place > 9) {
      console.log("ship off board");
      return false;
    } else {
      console.log("checking for open space");
      return this.#isSpaceOpen(ship, local, orientation);
    }
  }

  #isLegalPlace(ship, local, orientation) {
    if (local[0] >= 0 && local[0] <= 9 && local[1] >= 0 && local[1] <= 9) {
      return this.#isOnBoard(ship, local, orientation);
    } else {
      console.log("picked number not on board");
      return false;
    }
  }

  place(ship, local, orientation) {
    let y = local[0];
    let x = local[1];
    let localY = y;
    let localX = x;
    if (this.#isLegalPlace(ship, local, orientation)) {
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
      console.log(this.board);
      return this.board;
    } else {
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
          this.#allSunk();
        }
        console.log(location);
      }
      this.board[array[0]][array[1]] = "X";

      return location;
    }
  }

  #allSunk() {
    if (this.shipCount === 0) {
      console.log("All Ships Sunk. Game Over!");
      return true;
    }
  }
}

export { Board };
