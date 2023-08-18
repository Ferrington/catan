import HexCoordinate from "../game/HexCoordinate.ts";

export type BoardState = {
  tiles: {
    [index: string]: Tile;
  },
  vertices: {
    [index: string]: Vertex;
  },
  edges: {
    [index: string]: Edge;
  },
};

export type Tile = {
  coords: HexCoordinate;
  left: number;
  top: number;
};

export type Vertex = {
  coords: HexCoordinate;
  left: number;
  top: number;
}

export type Edge = {
  coords: HexCoordinate;
  left: number;
  top: number;
  rotation: number;
}