import { Coord, Tile, Token } from "./types";
import { asIndex, range } from "./utils";

type UpdateEvent = (tiles: Tile[]) => void;

export class Board {
  private state: Token[] = range(64).map(() => "Empty");
  private onUpdate: UpdateEvent;

  constructor(onUpdate: UpdateEvent) {
    this.onUpdate = onUpdate;
  }

  get(coord: Coord): Tile {
    const token = this.state[asIndex(coord)];
    return { coord, token };
  }

  set(tiles: Tile[]) {
    tiles.forEach((tile) => {
      this.state[asIndex(tile.coord)] = tile.token;
    });

    this.onUpdate(tiles);
  }
}
