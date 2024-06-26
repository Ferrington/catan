import { BEGINNER_BOARD } from "~~/config/beginnerBoard";
import { calcRoadCoords } from "~~/lib/board/roads/calcRoadCoords";
import { coordsToString } from "~~/lib/hexCoords/coordsToString";

export function generateRoads(tiles: CatanBoard["tiles"]) {
  const roads: CatanBoard["roads"] = {};

  Object.values(tiles).forEach((tile) => {
    for (let i = 0; i < 6; i++) {
      const coords = calcRoadCoords(tile.coords, i);
      if (roads[coordsToString(coords)]) continue;

      const rotation = Math.PI / 2 + (2 * i * Math.PI) / 6;
      const road = {
        rotation,
        coords,
        player: BEGINNER_BOARD.roads[coordsToString(coords)]?.player ?? null,
      };
      roads[coordsToString(coords)] = road;
    }
  });

  return roads;
}
