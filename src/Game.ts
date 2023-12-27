import { Board } from "./Board";
import { Interface } from "./Interface";
import { Coord, Tile } from "./types";

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
    this.interface = new Interface((c) => this.handleClick(c));
    this.board = new Board((t) => this.interface.update(t));
  }

  reset() {
    this.board.set(INITIAL_STATE);
  }

  private handleClick(coord: Coord) {
    console.log(coord);
  }
}
