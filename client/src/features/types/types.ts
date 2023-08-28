import HexCoordinate from "../game/HexCoordinate.ts";

export type State = {
  board: Board;
  players: Players;
};

export type Board = {
  tiles: {
    [index: string]: Tile;
  },
  vertices: {
    [index: string]: Vertex;
  },
  edges: {
    [index: string]: Edge;
  },
}

export type Tile = {
  coords: HexCoordinate;
  left: number;
  top: number;
  resource: "brick" | "rock" | "sheep" | "wheat" | "wood" | null;
  numberToken: number;
};

export type Vertex = {
  coords: HexCoordinate;
  left: number;
  top: number;
  building: null | Building;
}

export type Building = {
  type: "settlement" | "city";
  color: string;
}

export type Edge = {
  coords: HexCoordinate;
  left: number;
  top: number;
  rotation: number;
  color: string | null;
}