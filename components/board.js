import { Ship } from "./ship.js";
class Board {
  constructor() {
    this.board = this.#createBoard();
    this.shipCount = 5;
    this.carrier = new Ship("Carrier");
    this.battleship = new Ship("Battleship");
    this.cruiser = new Ship("Cruiser");
    this.submarine = new Ship("Submarine");
    this.destroyer = new Ship("Destroyer");
    this.over = false;
  }

  #createBoard() {
    let array = [];
    for (let i = 0; i < 10; i++) {
      array.push([]);
      for (let j = 0; j < 10; j++) {
        array[i].push(null);
      }
    }
    // console.log(array);
    return array;
  }

  #isSpaceOpen(ship, local, orientation) {
    let x = local[1];
    let y = local[0];
    for (let i = 0; i < ship.length; i++) {
      if (orientation === true) {
        if (this.board[y + i][x] !== null) {
          return false;
        }
      } else if (orientation === false) {
        if (this.board[y][x + i] !== null) {
          return false;
        }
      }
    }
    return true;
  }

  #isOnBoard(ship, local, orientation) {
    let x = local[1];
    let y = local[0];
    if (orientation === false) {
      if (x + ship.length > 9) {
        return false;
      }
    } else if (orientation === true) {
      if (y + ship.length > 9) {
        return false;
      }
    }
    return true;
  }

  #isLegalPlace(ship, local, orientation) {
    if (local[0] >= 0 && local[0] < 10 && local[1] >= 0 && local[1] < 10) {
      return (
        this.#isOnBoard(ship, local, orientation) &&
        this.#isSpaceOpen(ship, local, orientation)
      );
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
        if (orientation === true) {
          let tempY = y + i;
          localY = tempY;
        } else {
          let tempX = x + i;
          localX = tempX;
        }
        this.board[localY][localX] = ship;
      }
      // console.log(this.board);
      return true;
    } else {
      return false;
    }
  }

  randomPlace() {
    let ships = [
      this.carrier,
      this.battleship,
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
      if (this.#isLegalPlace(ships[0], location, isVertical) === true) {
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
  }

  hit(name) {
    let ship = this[name.toLowerCase()];
    console.log(ship);
    ship.damage();
    console.log(ship);
    if (ship.sunk) {
      this.shipCount--;

      this.#allSunk();
    }
  }

  #allSunk() {
    if (this.shipCount === 0) {
      this.over = true;
    }
  }
  resetBoard() {
    this.board = this.#createBoard();
    this.shipCount = 5;
    this.carrier.hit = 5;
    this.battleship.hit = 4;
    this.cruiser.hit = 3;
    this.submarine.hit = 3;
    this.destroyer.hit = 2;
    this.carrier.sunk = false;
    this.battleship.sunk = false;
    this.cruiser.sunk = false;
    this.submarine.sunk = false;
    this.destroyer.sunk = false;
    this.over = false;
  }
}

export { Board };
