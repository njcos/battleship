import { Board } from "./board";

class Player {
  constructor(name, cpu) {
    this.name = name;
    this.cpu = cpu;
    this.board = new Board();
  }
}

export { Player };
