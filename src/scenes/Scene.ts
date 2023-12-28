import { Board } from "../Board";
import { GameData } from "../Game";

export class Scene {
  protected board: Board;
  protected gameData: GameData;

  constructor(board: Board, gameData: GameData) {
    this.board = board;
    this.gameData = gameData;
  }

  enter() {}

  tick() {}

  exit() {}
}
