import { generateRoads } from "~~/lib/board/roads/generateRoads";
import { generateSettlements } from "~~/lib/board/settlements/generateSettlements";
import { generateHexTiles } from "~~/lib/board/tiles/generateHexTiles";

export function generateBoard() {
  const tiles = generateHexTiles();
  const roads = generateRoads(tiles);
  const settlements = generateSettlements(tiles);
  const robberLocation = Object.values(tiles).find(
    (tile) => tile.resource === "desert"
  )?.coords;

  if (!robberLocation) {
    throw new Error("No desert tile found");
  }

  return { tiles, roads, settlements, robberLocation };
}
