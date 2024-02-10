import { Othello } from "./Othello";

async function main() {
  const othello = new Othello();
  await othello.start();
}

window.onload = main;
