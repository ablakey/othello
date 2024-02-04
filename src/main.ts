import { Board } from "./Board";

function main() {
  const parentEl = document.querySelector<HTMLDivElement>(".parent")!;
  const board = new Board(parentEl, [8, 8]);
}

window.onload = main;
