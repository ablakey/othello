import { Board, Coord } from "./Board";

async function main() {
  const parentEl = document.querySelector<HTMLDivElement>(".parent")!;
  const board = new Board(parentEl, [8, 8], onClick);

  await board.set([1, 1], "⚪");
  await board.set([2, 1], "⚪");
  await board.set([3, 1], "⚪");

  function onClick(coord: Coord, value: string) {
    if (value !== "⚪") {
      board.set(coord, "⚪");
    } else if (value === "⚪") {
      board.set(coord, "⚫");
    }
  }
}

window.onload = main;
