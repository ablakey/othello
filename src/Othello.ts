import { Board, Cell as BoardCell, Coord } from "./Board";
import { shuffle, sleep } from "./utils";

type White = "⚪️";
const White = "⚪️";

type Black = "⚫️";
const Black = "⚫️";

type Empty = "";
const Empty = "";

type Piece = White | Black | Empty;

type Cell = BoardCell<Piece>;

const TURN_DELAY = 500;

// When CPU is picking a move, it picks randomly from top n moves:
const TOP_MOVE_COUNT = 3;

const WIDTH = 8;
const HEIGHT = 8;

const INITIAL_BOARD: Cell[] = [
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
  private gameOver = false;

  constructor(parentEl: HTMLDivElement) {
    this.board = new Board(parentEl, [WIDTH, HEIGHT], { swapSpeed: 125 });
  }

  async restart() {
    this.gameOver = false;
    await this.board.setAll(Empty);
    await this.board.setMany(INITIAL_BOARD);

    while (!this.gameOver) {
      console.log("play ");
      await sleep(TURN_DELAY);
      await this.playTurn();
      console.log("playturn", this.gameOver);
      this.turn = this.turn === White ? Black : White;
    }
  }

  async playTurn() {
    const moves = this.getAllMoves().slice(0, TOP_MOVE_COUNT);

    if (!moves.length) {
      console.log(moves);
      this.gameOver = true;
      return;
    }

    const move = shuffle(moves)[0];
    await this.board.set(move.move, this.turn);
    await this.board.setMany(move.flips);
  }

  getAllMoves() {
    const moves: { score: number; flips: Cell[]; move: Coord }[] = [];

    this.board.forEach((move) => {
      const flips = this.getFlips(move, this.turn);
      const score = flips.reduce((acc, a) => acc + a.length, 0);
      if (score) {
        moves.push({ score, flips, move });
      }
    });

    return moves.sort((a, b) => b.score - a.score);
  }

  getFlips(coord: Coord, player: White | Black) {
    return DIRECTIONS.map((d) => this.walk(coord, d, player)).flat();
  }

  walk(coord: Coord, delta: Coord, player: White | Black) {
    const cells: Cell[] = [];
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
