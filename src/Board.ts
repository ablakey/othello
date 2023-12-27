import { Coord, Tile, Token } from "./types";
import { asIndex } from "./utils";

export class Board {
  private state: Token[] = []; // Sparse. May begin with empty spaces.
  private onUpdate: (tile: Tile) => void;

  constructor(onUpdate: (tile: Tile) => void) {
    this.onUpdate = onUpdate;
  }

  get(coord: Coord): Tile {
    const token = this.state[asIndex(coord)] ?? "Empty";
    return { coord, token };
  }

  set(tile: Tile) {
    this.state[asIndex(tile.coord)] = tile.token;
    this.onUpdate(tile);
  }
}
