import { Coord } from "./types";

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
