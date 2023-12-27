import { Tile, Token } from "./types";
import { asIndex } from "./utils";

const ICONS: Record<Token, string> = {
  Black: "⚫",
  White: "⚪",
  Empty: "",
};

export class Interface {
  private elements: HTMLDivElement[] = [];

  set(tile: Tile) {
    this.elements[asIndex(tile.coord)].innerText = ICONS[tile.token];
  }

  constructor() {
    // Build the 64 cells, holding reference to each.
    const boardEl = document.querySelector<HTMLDivElement>(".board")!;
    for (let x = 0; x < 64; x++) {
      const cell = boardEl.appendChild(document.createElement("div"));
      cell.className = "cell";

      // Token needs to be a separate element to center it within the space.
      const tokenEl = cell.appendChild(document.createElement("div"));

      this.elements.push(tokenEl);
    }
  }
}
