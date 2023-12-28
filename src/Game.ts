import { Board } from "./Board";
import { Interface } from "./Interface";
import { CpuTurn } from "./scenes/CpuTurn";
import { GameEnd } from "./scenes/GameEnd";
import { ModeSelect } from "./scenes/ModeSelect";
import { PlayerTurn } from "./scenes/PlayerTurn";
import { Scene } from "./scenes/Scene";
import { Coord } from "./types";

export type GameData = { state: State; turn: "White" | "Black" };

type State = "ModeSelect" | "PlayerTurn" | "CpuTurn" | "GameEnd";

export class Game {
  interface: Interface;
  board: Board;
  gameData: GameData;

  scenes: Record<State, Scene>;

  constructor() {
    this.gameData = { state: "ModeSelect", turn: "White" };
    this.interface = new Interface((c) => this.handleClick(c));
    this.board = new Board((t) => this.interface.update(t));

    this.scenes = {
      ModeSelect: new ModeSelect(this.board, this.gameData),
      CpuTurn: new CpuTurn(this.board, this.gameData),
      PlayerTurn: new PlayerTurn(this.board, this.gameData),
      GameEnd: new GameEnd(this.board, this.gameData),
    };
  }

  reset() {
    this.setState("ModeSelect");
  }

  setState(state: State) {
    this.gameData.state = state;
    this.scenes[state].enter();
  }

  handleClick(coord: Coord) {
    const cell = this.board.get(coord);

    // Non-empty spaces cannot be modified.
    if (cell.token !== "Empty") {
      return;
    }
  }
}
