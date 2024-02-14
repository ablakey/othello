import { Coord } from "./Board";

export function asIndex(coord: Coord): number {
  return coord[1] * 8 + coord[0];
}

export function fromIndex(index: number): Coord {
  const y = Math.floor(index / 8);
  const x = index - y * 8;
  return [x, y];
}

export function range(count: number): number[] {
  return [...Array(count).keys()];
}
export function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export function shuffle<T>(arr: T[]) {
  let currentIndex = arr.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }

  return arr;
}
