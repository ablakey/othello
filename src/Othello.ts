import { Board, Coord, Cell } from "./Board";

type White = "⚪️";
const White = "⚪️";

type Black = "⚫️";
const Black = "⚫️";

type Empty = "";
const Empty = "";

type Piece = White | Black | Empty;

const WIDTH = 8;
const HEIGHT = 8;

const INITIAL_BOARD: Cell<Piece>[] = [
  [[3, 4], White],
  [[4, 3], White],
  [[3, 3], Black],
  [[4, 4], Black],
];

const Directions = {
  TopLeft: [-1, -1],
  Top: [0, -1],
  TopRight: [1, -1],
  Right: [1, 0],
  BotRight: [1, 1],
  Bot: [0, 1],
  BotLeft: [-1, 1],
  Left: [-1, 0],
} satisfies Record<string, Coord>;

export class Othello {
  private board: Board<Black | White | Empty>;
  private turn: White | Black = White;

  constructor() {
    const parentEl = document.querySelector<HTMLDivElement>(".parent")!;
    this.board = new Board(parentEl, [WIDTH, HEIGHT]);
  }

  async start() {
    await this.board.setMany(INITIAL_BOARD);

    Object.values(Directions).forEach((d) => {
      this.board.set([3 + d[0], 3 + d[1]], White);
    });

    // Testing.
    const result = this.walk([3, 3], Directions.Right, Black);
    console.log(result);
  }

  // get self() {
  //   return this.turn;
  // }

  // get opponent() {
  //   return this.turn === White ? Black : White;
  // }

  getValidMoves() {
    const player = this.turn;
    const opponent = this.turn === White ? Black : White;
    // For every square that's empty
    // Walk each compass direction
    // If opponent, append it and keep walking.
    // If nothing, end and drop
    // If self and has count, append it.
    // If self and count is 0, drop it.
    // At the end we have Cell[][]  where each major array is a list of squares
    // And the minor array is all the squares
  }

  walk(start: Coord, delta: Coord, player: White | Black) {
    const distance = 1;
    const cells: Cell<Piece>[] = [];
    let last: White | Black | undefined;

    while (true) {
      const x = start[0] + delta[0] * distance;
      const y = start[1] + delta[1] * distance;
      const coord: Coord = [x, y];
      const value = this.board.get(coord);
      console.log(value);

      // Left the board, or is an empty space. Stop walking.
      if (value === null || value === Empty) {
        break;
      }

      last = value;

      // Found our own piece again. Stop walking.
      if (value === player) {
        break;
      }

      cells.push([coord, value]);
    }

    if (cells.length && last !== player) {
      return cells;
    } else {
      return null;
    }
    // Accept a direction (as a pair of values) and walk it, returning
  }
}
