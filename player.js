import { Board } from "./board";

class Player {
  constructor(name, cpu) {
    this.name = name;
    this.cpu = cpu;
    this.board = new Board();
  }

  place(ship, input, orientation) {
    if ((this.cpu = false)) {
      this.board.place(ship, input, orientation);
    } else {
      let ships = [
        this.board.carrier,
        this.board.battleShip,
        this.board.cruiser,
        this.board.submarine,
        this.board.destroyer,
      ];
      ship.forEach((ship) => {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        let local = [y, x];
        this.board.place(ship, local, orientation);
      });
    }
  }
}
