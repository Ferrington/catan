import { hexVertexCoords } from "~/utils/board/tiles/hexVertexCoords";
import { coordsToString } from "~/utils/hexCoords/coordsToString";
import { BEGINNER_BOARD } from "~~/config/beginnerBoard";
import { DEBUG_MODE, HEX_VERTICES } from "~~/config/constants";

export function generateSettlements(tiles: CatanBoard["tiles"]) {
  const settlements: CatanBoard["settlements"] = {};

  Object.values(tiles).forEach((tile) => {
    for (let i = 0; i < 6; i++) {
      const vertex = HEX_VERTICES[i];
      const coords = hexVertexCoords(tile.coords, vertex);

      const harborInfo = tile.harbors[vertex];
      if (settlements[coordsToString(coords)] && !harborInfo) continue;

      let isCity: boolean;
      if (DEBUG_MODE) {
        isCity = i % 2 == 0;
      } else {
        isCity = false;
      }

      const settlement: Settlement = {
        isCity,
        coords,
        player:
          BEGINNER_BOARD.settlements[coordsToString(coords)]?.player ?? null,
        harbor: getHarbor(tile, vertex),
      };
      settlements[coordsToString(coords)] = settlement;
    }
  });

  return settlements;
}

function getHarbor(tile: HexTile, vertex: VertexDirection) {
  let harbor: Harbor | null = null;
  const harborInfo = tile.harbors[vertex];
  if (harborInfo) {
    harbor = {
      resource: harborInfo.resource,
      ratio: harborInfo.ratio,
      vertex,
    };
  }

  return harbor;
}
