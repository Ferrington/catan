export function findRoadEdge(tileCoords: HexPoint, roadCoords: HexPoint) {
  if (tileCoords.q === roadCoords.q) {
    if (tileCoords.r < roadCoords.r) return 2;
    else return 5;
  } else if (tileCoords.r === roadCoords.r) {
    if (tileCoords.q < roadCoords.q) return 3;
    else return 0;
  } else if (tileCoords.s === roadCoords.s) {
    if (tileCoords.r < roadCoords.r) return 1;
    else return 4;
  }

  return 0;
}
