import { Board, Coord } from "./Board";

function main() {
  function onClick(coord: Coord, value: string) {
    console.log(coord, value);
  }
  const parentEl = document.querySelector<HTMLDivElement>(".parent")!;
  const board = new Board(parentEl, [8, 8], onClick);

  board.set([0, 0], "🥸");
  // board.set([4, 5], "😡");
  setInterval(() => {
    board.set([0, 0], "🥺");
  }, 200);
}

window.onload = main;
