import { Board } from "./board.js";

class Player {
  constructor(name, cpu) {
    this.name = name;
    this.cpu = cpu;
    this.board = new Board();
  }
}

export { Player };
