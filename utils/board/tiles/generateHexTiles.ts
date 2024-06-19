import { BEGINNER_BOARD } from "~/config/beginnerBoard";
import { HARBOR_TEMPLATE } from "~/config/harbors";
import { coordsToString } from "~/utils/hexCoords/coordsToString";

export function generateHexTiles() {
  const rowTileCounts = [3, 4, 5, 4, 3];

  const tiles: Record<string, HexTile> = {};
  for (let y = 0; y < 5; y++) {
    const rowTileCount = rowTileCounts[y];

    const startQ = y < 2 ? -1 * y : -2;
    const startS = y < 3 ? 2 : 4 - y;

    for (let x = 0; x < rowTileCount; x++) {
      const coords = {
        q: startQ + x,
        r: y - 2,
        s: startS - x,
      };
      const coordString = coordsToString(coords);

      tiles[coordString] = {
        isHighlighted: false,
        coords,
        resource: BEGINNER_BOARD.tiles[coordString].resource,
        numberToken: BEGINNER_BOARD.tiles[coordString].numberToken,
        harbors: getHarbors(coords),
      };
    }
  }

  return tiles;
}

function getHarbors(coords: HexPoint) {
  const harbors: HexTile["harbors"] = {};
  const coordString = coordsToString(coords);

  if (coordString in HARBOR_TEMPLATE) {
    const harborTemplate = HARBOR_TEMPLATE[coordString];
    for (const vertex of harborTemplate.vertices) {
      harbors[vertex] = {
        resource: harborTemplate.resource,
        ratio: harborTemplate.ratio,
        vertex,
      };
    }
  }

  return harbors;
}
