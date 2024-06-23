import { HEX_VERTICES } from "~~/config/constants";
import { hexVertexCoords } from "~~/lib/board/tiles/hexVertexCoords";
import { coordsToString } from "~~/lib/hexCoords/coordsToString";

export function getTileSettlements(
  tile: HexTile,
  settlements: CatanBoard["settlements"]
) {
  return HEX_VERTICES.map((vertex) => {
    const coords = hexVertexCoords(tile.coords, vertex);

    const settlement = settlements[coordsToString(coords)];
    if (!settlement) throw new Error("Settlement not found");
    return settlement;
  });
}
