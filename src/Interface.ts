import { Coord, Tile, Token } from "./types";
import { asIndex, fromIndex, range } from "./utils";

const ICONS: Record<Token, string> = {
  Black: "⚫",
  White: "⚪",
  Empty: "",
};

export class Interface {
  private elements: HTMLDivElement[] = [];

  update(tiles: Tile[]) {
    tiles.forEach((tile) => {
      this.elements[asIndex(tile.coord)].innerText = ICONS[tile.token];
    });
  }

  constructor(onClick: (coord: Coord) => void) {
    const boardEl = document.querySelector<HTMLDivElement>(".board")!;

    range(64).forEach((i) => {
      const cell = boardEl.appendChild(document.createElement("div"));
      cell.className = "cell";
      cell.addEventListener("click", () => onClick(fromIndex(i)));

      // Token needs to be a separate element to center it within the space.
      const tokenEl = cell.appendChild(document.createElement("div"));

      this.elements.push(tokenEl);
    });
  }
}
