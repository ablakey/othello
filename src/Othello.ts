import { Board, Square } from "./Board";

type White = "⚪️";
const White = "⚪️";

type Black = "⚫️";
const Black = "⚫️";

const WIDTH = 8;
const HEIGHT = 8;

const INITIAL_BOARD: Square[] = [
  [[3, 4], White],
  [[4, 3], White],
  [[3, 3], Black],
  [[4, 4], Black],
];

export class Othello {
  private board: Board;
  private turn: White | Black = White;

  constructor() {
    const parentEl = document.querySelector<HTMLDivElement>(".parent")!;
    this.board = new Board(parentEl, [WIDTH, HEIGHT]);
  }

  async start() {
    await this.board.set(INITIAL_BOARD);

    console.log(this.board.get([0, 0]));
    console.log(this.board.get([9, 0]));
    console.log(this.board.get([9, 9]));
    console.log(this.board.get([3, 3]));
  }

  get self() {
    return this.turn;
  }

  get opponent() {
    return this.turn === White ? Black : White;
  }

  getValidMoves() {
    // For every square that's empty
    // Walk each compass direction
    // If opponent, append it and keep walking.
    // If nothing, end and drop
    // If self and has count, append it.
    // If self and count is 0, drop it.
    // At the end we have Square[][]  where each major array is a list of squares
    // And the minor array is all the squares
  }
}
