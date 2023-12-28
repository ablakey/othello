import { Tile } from "../types";
import { Scene } from "./Scene";

const MODE_SELECT: Tile[] = [
  { coord: [2, 3], token: "White" },
  { coord: [2, 4], token: "Player" },
  { coord: [5, 3], token: "Black" },
  { coord: [5, 4], token: "Player" },
  { coord: [3, 5], token: "Check" },
];

const INITIAL_STATE: Tile[] = [
  { coord: [3, 3], token: "Black" },
  { coord: [4, 4], token: "Black" },
  { coord: [3, 4], token: "White" },
  { coord: [4, 3], token: "White" },
];

export class ModeSelect extends Scene {
  enter() {
    this.board.set(MODE_SELECT);
  }

  exit() {
    this.board.clear();
    this.board.set(INITIAL_STATE);
  }

  tick() {}
}
