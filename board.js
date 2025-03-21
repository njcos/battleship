class Board {
  constructor() {
    this.board = this.#createBoard();
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
    let array = [];
    for (let i = 0; i < 4; i++) {
      array.push([local[0], local[1] + i]);
    }
    console.log(array);
    return array;
  }
}

export { Board };
