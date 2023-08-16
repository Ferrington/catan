import {proxy} from "valtio";
import HexCoordinate from "../game/HexCoordinate.ts";

type BoardState = {
  tiles: {
    [index: string]: {
      coords: HexCoordinate;
    }
  },
  vertices: {
    [index: string]: {
      coords: HexCoordinate;
    }
  },
};

export const store = proxy<BoardState>({
  tiles: {},
  vertices: {},
})