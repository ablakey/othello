import { Coord } from "./types";

export function asIndex(coord: Coord): number {
  return coord[1] * 8 + coord[0];
}
