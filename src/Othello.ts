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

const DIRECTIONS: Coord[] = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
];

export class Othello {
  private board: Board<Black | White | Empty>;
  private turn: White | Black = White;

  constructor() {
    const parentEl = document.querySelector<HTMLDivElement>(".parent")!;
    this.board = new Board(parentEl, [WIDTH, HEIGHT], { onClick: this.onClick.bind(this) });
  }

  async start() {
    await this.board.setMany(INITIAL_BOARD);
  }

  async onClick(p: Cell<Piece>) {
    const move = this.getValidMove(p[0], this.turn);

    if (move.length) {
      await this.board.set(p[0], this.turn);
      await this.board.setMany(move);
      this.turn = this.turn === White ? Black : White;
    }
  }

  getValidMove(coord: Coord, player: White | Black) {
    return DIRECTIONS.map((d) => this.walk(coord, d, player)).flat();
  }

  walk(coord: Coord, delta: Coord, player: White | Black) {
    const cells: Cell<Piece>[] = [];
    let distance = 1;
    let last: White | Black | undefined;

    if (this.board.get(coord) !== Empty) {
      return [];
    }

    while (true) {
      const x = coord[0] + delta[0] * distance;
      const y = coord[1] + delta[1] * distance;
      const target: Coord = [x, y];
      const value = this.board.get(target);
      distance += 1;

      // Left the board, or is an empty space. Stop walking.
      if (value === null || value === Empty) {
        break;
      }

      last = value;

      // Found our own piece again. Stop walking.
      if (value === player) {
        break;
      }

      cells.push([target, player]);
    }

    return cells.length && last === player ? cells : [];
  }
}
