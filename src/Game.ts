import { Board } from "./Board";
import { Interface } from "./Interface";

export class Game {
  interface: Interface;
  board: Board;

  constructor() {
    this.interface = new Interface();
    this.board = new Board();
  }
}
