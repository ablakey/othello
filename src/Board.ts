import { asIndex, fromIndex, range } from "./utils";

export type Coord = [number, number];
export type Cell<T extends string> = [Coord, T];
type BoardClickCallback<T extends string> = (cell: Cell<T>) => void;

const DEFAULT_BG_COLOUR = "#1e5c0f";
const DEFAULT_BORDER_COLOUR = "#00330e";

export class Board<T extends string> {
  private elements: HTMLDivElement[] = [];
  private clickEvent?: BoardClickCallback<T>;
  width: number;
  height: number;

  constructor(
    parent: HTMLDivElement,
    dimensions: Coord,
    options?: { onClick?: BoardClickCallback<T>; bgColour?: string; borderColour?: string },
  ) {
    this.clickEvent = options?.onClick;
    this.width = dimensions[0];
    this.height = dimensions[1];

    const frame = document.createElement("div");
    frame.style.cssText = `
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      max-width: 100%;
      max-height: 100%;
      aspect-ratio: ${this.width} / ${this.height};
      container-type: inline-size;
    `;

    parent.appendChild(frame);

    const board = document.createElement("div");
    board.style.cssText = `
      display: grid;
      height: 100%;
      grid-template-columns: repeat(${this.width}, 1fr);
    `;

    frame.appendChild(board);

    range(this.width * this.height).forEach((i) => {
      const inner = document.createElement("div");
      inner.style.cssText = `
        margin: -10cqw;
      `;

      const cell = document.createElement("div");
      cell.style.cssText = `
        background-color: ${options?.bgColour ?? DEFAULT_BG_COLOUR};
        border: 0.3cqw solid ${options?.borderColour ?? DEFAULT_BORDER_COLOUR};
        display: flex;
        justify-content: center;
        align-items: center;
      `;

      cell.addEventListener("click", () => {
        this.clickEvent?.([fromIndex(i), inner.innerText as T]);
      });

      cell.appendChild(inner);
      board.appendChild(cell);
      this.elements.push(cell);
    });
  }

  /**
   * Return the state of a coordinate. If it is outside the board, return null.
   * An empty square will be a blank string.
   */
  get(coord: Coord): T | null {
    if (coord[0] >= this.width || coord[0] < 0 || coord[1] >= this.height || coord[1] < 0) {
      return null;
    }
    return this.elements[asIndex(coord)].innerText as T;
  }

  async setMany(moves: Cell<T>[]) {
    for (const m of moves) {
      await this.set(...m);
    }
  }

  async set(coord: Coord, value: T) {
    const el = this.elements[asIndex(coord)];
    const inner = el.children[0] as HTMLDivElement;

    const animFull: Keyframe = { fontSize: "10cqw" };
    const animNone: Keyframe = { fontSize: "0cqw" };
    const animOptions: KeyframeAnimationOptions = { duration: 125, fill: "both" };

    // Need to await for mutex.

    // Wait for previous animations to complete?
    await Promise.all(el.getAnimations().map((a) => a.finished));

    // Remove?
    if (inner.innerText) {
      await el.animate([animFull, animNone], animOptions).finished;
      inner.innerText = "";
    }

    // Add?
    if (!inner.innerText && value) {
      inner.innerText = value;
      await el.animate([animNone, animFull], animOptions).finished;
    }
  }
}
