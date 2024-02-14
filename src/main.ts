import { Othello } from "./Othello";
import { range } from "./utils";

async function main() {
  const table = document.querySelector<HTMLDivElement>(".table")!;

  const games = range(1).map(() => new Othello(table));

  while (true) {
    console.log("restart");
    await games[0].restart();
    // await Promise.all(games.map((g) => g.restart()));
  }
}

window.onload = main;
