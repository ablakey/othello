import { Board } from "./Board";
import { Interface } from "./Interface";
import { Tile } from "./types";

const INITIAL_STATE: Tile[] = [
  { coord: [3, 3], token: "Black" },
  { coord: [4, 4], token: "Black" },
  { coord: [3, 4], token: "White" },
  { coord: [4, 3], token: "White" },
];

export class Game {
  interface: Interface;
  board: Board;

  constructor() {
    this.interface = new Interface();
    this.board = new Board((t) => this.interface.set(t));
  }

  reset() {
    INITIAL_STATE.forEach((t) => this.board.set(t));
  }
}
