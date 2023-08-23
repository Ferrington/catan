import HexCoordinate from "../../game/HexCoordinate.ts";
import {BoardState, Tile} from "../../types/types.ts";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  ROW_OFFSET,
  TILE_GAP,
  TILE_HEIGHT,
  TILE_WIDTH,
  VERTEX_HEIGHT,
  VERTEX_WIDTH
} from "../../game/config/config.ts";


export const generateBeginnerState = () => {
  const tileRows = [
    {size: 3, start: new HexCoordinate(2, 0, -2)},
    {size: 4, start: new HexCoordinate(2, -1, -1)},
    {size: 5, start: new HexCoordinate(2, -2, 0)},
    {size: 4, start: new HexCoordinate(1, -2, 1)},
    {size: 3, start: new HexCoordinate(0, -2, 2)},
  ];

  const state: BoardState = {
    tiles: {},
    vertices: {},
    edges: {},
  };

  const generateTile = (coords: HexCoordinate) => {
    state.tiles[coords.toString()] = {
      coords,
      top: BOARD_HEIGHT / 2 - (((-coords.z) * (TILE_HEIGHT + TILE_GAP)) + TILE_HEIGHT / 2) - coords.z * ROW_OFFSET,
      left: BOARD_WIDTH / 2 - (((coords.x - coords.y) / 2 * (TILE_WIDTH + TILE_GAP)) + TILE_WIDTH / 2),
    }
  };

  const generateVertices = (coords: HexCoordinate) => {
    const data = [
      {
        direction: "top",
        coords: new HexCoordinate(coords.x + 0.5, coords.y + 0.5, coords.z - 0.5),
        top: (tile: Tile) => {
          return tile.top - VERTEX_HEIGHT + TILE_GAP / 2;
        },
        left: (tile: Tile) => {
          return tile.left + TILE_WIDTH / 2 - VERTEX_WIDTH / 2 + 1; // why do we need + 1 ???
        },
      },
      {
        direction: "top-right",
        coords: new HexCoordinate(coords.x - 0.5, coords.y + 0.5, coords.z - 0.5),
        top: (tile: Tile) => {
          return tile.top - VERTEX_HEIGHT / 1.3 + TILE_HEIGHT / 4 - (TILE_GAP - VERTEX_HEIGHT) / 2;
        },
        left: (tile: Tile) => {
          return tile.left + TILE_WIDTH + 1 + (TILE_GAP - VERTEX_WIDTH) / 2;
        },
      },
      {
        direction: "bottom-right",
        coords: new HexCoordinate(coords.x - 0.5, coords.y + 0.5, coords.z + 0.5),
        top: (tile: Tile) => {
          return tile.top + TILE_HEIGHT / 4 * 3 - 2;
        },
        left: (tile: Tile) => {
          return tile.left + TILE_WIDTH + 1 + (TILE_GAP - VERTEX_WIDTH) / 2;
        },
      },
      {
        direction: "bottom",
        coords: new HexCoordinate(coords.x - 0.5, coords.y - 0.5, coords.z + 0.5),
        top: (tile: Tile) => {
          return tile.top + TILE_HEIGHT - 2;
        },
        left: (tile: Tile) => {
          return tile.left + TILE_WIDTH / 2 - VERTEX_WIDTH / 2 + 1; // why do we need + 1 ???
        },
      },
      {
        direction: "bottom-left",
        coords: new HexCoordinate(coords.x + 0.5, coords.y - 0.5, coords.z + 0.5),
        top: (tile: Tile) => {
          return tile.top + TILE_HEIGHT / 4 * 3 - 2;
        },
        left: (tile: Tile) => {
          return tile.left - VERTEX_WIDTH + 1 - (TILE_GAP - VERTEX_WIDTH) / 2;
        },
      },
      {
        direction: "top-left",
        coords: new HexCoordinate(coords.x + 0.5, coords.y - 0.5, coords.z - 0.5),
        top: (tile: Tile) => {
          return tile.top - VERTEX_HEIGHT / 1.3 + TILE_HEIGHT / 4 + 2;
        },
        left: (tile: Tile) => {
          return tile.left - VERTEX_WIDTH + 1 - (TILE_GAP - VERTEX_WIDTH) / 2;
        },
      },
    ];

    data.forEach((d) => {
      const vertexCoords = d.coords;
      const top = d.top;
      const left = d.left;

      if (vertexCoords.toString() in state.vertices && state.vertices[vertexCoords.toString()].top !== 0) {
        return;
      }


      const tile = state.tiles[coords.toString()];

      state.vertices[vertexCoords.toString()] = {
        coords: vertexCoords,
        top: top(tile),
        left: left(tile)
      }
    });
  };

  const generateEdges = (coords: HexCoordinate) => {
    const data = [
      {
        direction: "top-right",
        coords: new HexCoordinate(coords.x, coords.y + 0.5, coords.z - 0.5),
        top: (tile: Tile) => {
          return tile.top + 5;
        },
        left: (tile: Tile) => {
          return tile.left + TILE_WIDTH / 2 + 8;
        },
        rotation: -60,
      },
      {
        direction: "right",
        coords: new HexCoordinate(coords.x - 0.5, coords.y + 0.5, coords.z),
        top: (tile: Tile) => {
          return tile.top + 41;
        },
        left: (tile: Tile) => {
          return tile.left + TILE_WIDTH - 1;
        },
        rotation: 0,
      },
      {
        direction: "bottom-right",
        coords: new HexCoordinate(coords.x - 0.5, coords.y, coords.z + 0.5),
        top: (tile: Tile) => {
          return tile.top + TILE_HEIGHT - 20;
        },
        left: (tile: Tile) => {
          return tile.left + TILE_WIDTH - 13;
        },
        rotation: 60,
      },
      {
        direction: "bottom-left",
        coords: new HexCoordinate(coords.x, coords.y - 0.5, coords.z + 0.5),
        top: (tile: Tile) => {
          return tile.top + TILE_HEIGHT - 20;
        },
        left: (tile: Tile) => {
          return tile.left + 6;
        },
        rotation: -60,
      },
      {
        direction: "left",
        coords: new HexCoordinate(coords.x + 0.5, coords.y - 0.5, coords.z),
        top: (tile: Tile) => {
          return tile.top + 41;
        },
        left: (tile: Tile) => {
          return tile.left - 6;
        },
        rotation: 0,
      },
      {
        direction: "top-left",
        coords: new HexCoordinate(coords.x + 0.5, coords.y, coords.z - 0.5),
        top: (tile: Tile) => {
          return tile.top + 5;
        },
        left: (tile: Tile) => {
          return tile.left + 35;
        },
        rotation: 60,
      },
    ];

    data.forEach((d) => {
      const edgeCoords = d.coords;
      const top = d.top;
      const left = d.left;

      if (edgeCoords.toString() in state.edges && state.edges[edgeCoords.toString()].top !== 0) {
        return;
      }


      const tile = state.tiles[coords.toString()];

      state.edges[edgeCoords.toString()] = {
        coords: edgeCoords,
        top: top(tile),
        left: left(tile),
        rotation: d.rotation,
      }


    });
  };

  tileRows.forEach((row) => {
    let coords = row.start;
    for (let i = 0; i < row.size; i++) {
      generateTile(coords);
      generateVertices(coords);
      generateEdges(coords);
      coords = coords.rightNeighbor();
    }
  });

  return state;
};

function print(stuff: any) {
  console.log(JSON.parse(JSON.stringify(stuff)));
}