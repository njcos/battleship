class Ship {
  constructor(name) {
    this.name = name;
    this.length = this.#findLength(name);
    this.hit = this.length;
    this.sunk = false;
    this.vertical = true;
  }

  #findLength(name) {
    let shipName = name.toLowerCase();
    if (shipName === "carrier") {
      return 5;
    } else if (shipName === "battleship") {
      return 4;
    } else if (shipName === "submarine" || shipName === "cruiser") {
      return 3;
    } else if (shipName === "destroyer") {
      return 2;
    }
  }

  damage() {
    let points = this.hit;
    points--;
    if (points === 0) {
      this.#shipSunk();
    }
    this.hit = points;
    return points;
  }
  #shipSunk() {
    this.sunk = true;
  }
}

export { Ship };
