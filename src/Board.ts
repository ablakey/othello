import { asIndex, fromIndex, range } from "./utils";

export type Coord = [number, number];

type BoardClickCallback = (coord: Coord, value: string) => void;

export class Board {
  private elements: HTMLDivElement[] = [];
  private clickEvent?: (coord: Coord, value: string) => void;
  width: number;
  height: number;

  constructor(parent: HTMLDivElement, dimensions: Coord, onClick?: BoardClickCallback) {
    this.clickEvent = onClick;
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
        background-color: #1e5c0f;
        border: 0.3cqw solid #00330e;
        display: flex;
        justify-content: center;
        align-items: center;
      `;

      cell.addEventListener("click", () => {
        this.clickEvent?.(fromIndex(i), inner.innerText);
      });

      cell.appendChild(inner);
      board.appendChild(cell);
      this.elements.push(cell);
    });
  }

  /**
   * Get a coordinate's current value. If an animation is ongoing, this will return the currently viewable value. In
   * this sense, the value of any cell is determined at the end of the animation, not when it is `set`.
   */
  get(coord: Coord) {
    return this.elements[asIndex(coord)].innerText;
  }

  /**
   * Set a cell value. This will trigger an animation.
   */
  async set(coord: Coord, value: string) {
    const el = this.elements[asIndex(coord)];
    const inner = el.children[0] as HTMLDivElement;

    const animFull: Keyframe = { fontSize: "10cqw" };
    const animNone: Keyframe = { fontSize: "0cqw" };
    const animOptions: KeyframeAnimationOptions = { duration: 2000, fill: "both" };

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
