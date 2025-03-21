import { Ship } from "./ship";
import { Board } from "./board";
const battleship = new Ship("Battleship");
const userBoard = new Board();

test("Create Ship", () => {
  expect(battleship).toEqual(
    expect.objectContaining({
      name: "Battleship",
      length: 4,
      hit: 4,
      sunk: false,
    })
  );
});

test("take damage", () => {
  expect(battleship.damage()).toBe(3);
});

test("placing a ship", () => {
  expect(userBoard.place("battleship", [2, 2], "vertical")).toEqual([
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
  ]);
});
