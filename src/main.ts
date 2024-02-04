import { Board } from "./Board";

function main() {
  const parentEl = document.querySelector<HTMLDivElement>(".parent")!;
  const board = new Board(parentEl, [8, 8]);

  board.set([0, 0], "🥸");
  // board.set([4, 5], "😡");
  setInterval(() => {
    board.set([0, 0], "🥺");
  }, 200);
}

window.onload = main;
