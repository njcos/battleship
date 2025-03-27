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
          return false;
        }
      } else if (this.board[local[0]][local[1]] + i instanceof Ship) {
        return false;
      }
    }
    return true;
  }

  #isOnBoard(ship, local, orientation) {
    let place = local[0];
    if (orientation === "horizontal") {
      place = local[1];
    }
    if (ship.length + place > 9) {
      return false;
    } else {
      return this.#isSpaceOpen(ship, local, orientation);
    }
  }

  #isLegalPlace(ship, local, orientation) {
    if (local[0] >= 0 && local[0] <= 9 && local[1] >= 0 && local[1] <= 9) {
      return this.#isOnBoard(ship, local, orientation);
    } else {
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
      return true;
    } else {
      return false;
    }
  }

  randomPlace() {
    let ships = [
      this.carrier,
      this.battleShip,
      this.cruiser,
      this.submarine,
      this.destroyer,
    ];
    while (ships.length > 0) {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      let localY = y;
      let localX = x;
      let location = [y, x];
      const orient = () => {
        if (Math.random() >= 0.5) {
          return true;
        } else {
          return false;
        }
      };
      let isVertical = orient();
      console.log(isVertical);
      if (this.#isLegalPlace(ships[0], location, isVertical)) {
        for (let i = 0; i < ships[0].length; i++) {
          if (isVertical === true) {
            let tempY = y + i;
            localY = tempY;
          } else if (isVertical === false) {
            let tempX = x + i;
            localX = tempX;
          }
          this.board[localY][localX] = ships[0];
        }
        ships.shift();
      }
    }
    console.log(this.board);
  }

  hit(array) {
    let location = this.board[array[0]][array[1]];
    if (location != "X") {
      if (location instanceof Ship) {
        location.damage();
        if (location.sunk) {
          this.shipCount--;
          this.#allSunk();
        }
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
