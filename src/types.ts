export type Token = "Black" | "White" | "Empty";

export type Coord = [number, number];

export type Tile = { coord: Coord; token: Token };
