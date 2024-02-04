import { range } from "./utils";

export type Coord = [number, number];

export class Board {
  private elements: HTMLDivElement[] = [];
  width: number;
  height: number;

  constructor(parent: HTMLDivElement, dimensions: Coord) {
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

    range(this.width * this.height).forEach(() => {
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

      cell.appendChild(inner);
      board.appendChild(cell);
      this.elements.push(cell);
    });
  }

  get(coord: Coord) {
    return this.elements[coord[1] * this.width + coord[0]].innerText;
  }

  set(coord: Coord, value: string) {
    const el = this.elements[coord[1] * this.width + coord[0]];
    const inner = el.children[0] as HTMLDivElement;

    // Do not allow changing if it's currently animating.
    if (el.getAnimations().filter((a) => a.playState !== "finished").length) {
      return;
    }

    const animFull: Keyframe = { fontSize: "10cqw" };
    const animNone: Keyframe = { fontSize: "0cqw" };
    const animOptions: KeyframeAnimationOptions = { duration: 250, fill: "both" };

    // Add token?
    if (!inner.innerText && value) {
      el.animate([animNone, animFull], animOptions);
      inner.innerText = value;
    } else if (inner.innerText) {
      const animation = el.animate([animFull, animNone], animOptions);

      // When removing the token finishes, clear the text and possibly add another token.
      animation.addEventListener(
        "finish",
        () => {
          inner.innerText = "";
          if (value) {
            el.animate([animNone, animFull], animOptions);
          }
        },
        { once: true },
      );
    }
  }
}
