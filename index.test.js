import { Ship } from "./components/ship";
import { Board } from "./components/board";
import { Player } from "./components/player";

const battleship = new Ship("Battleship");
const userBoard = new Board();
const cpu = new Player("Computer", true);

// test("Create Ship", () => {
//   expect(battleship).toEqual(
//     expect.objectContaining({
//       name: "Battleship",
//       length: 4,
//       hit: 4,
//       sunk: false,
//     })
//   );
// });

// test("take damage", () => {
//   expect(battleship.damage()).toBe(3);
// });

test("placing a ship", () => {
  expect(
    userBoard.place(userBoard.battleShip, [2, 8], "horizontal")
  ).toBeInstanceOf(Array);
});

// test("open space", () => {
//   expect(userBoard.place(userBoard.carrier, [2, 0], "vertical")).toBeInstanceOf(
//     Array
//   );
// });

// test("find ship", () => {
//   expect(userBoard.hit([2, 2])).toBeInstanceOf(Ship);
// });
// test("cpu placement", () => {
//   expect(userBoard.randomPlace()).toBeInstanceOf(Array);
// });
