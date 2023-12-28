export type Token = "Black" | "White" | "Empty" | "Player" | "Computer" | "Check";

export type Coord = [number, number];

export type Tile = { coord: Coord; token: Token };
