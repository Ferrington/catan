export function findSettlementVertex(
  settlementCoords: HexPoint,
  tileCoords: HexPoint
): VertexDirection {
  if (
    settlementCoords.q === tileCoords.q + 0.5 &&
    settlementCoords.r === tileCoords.r - 0.5 &&
    settlementCoords.s === tileCoords.s - 0.5
  ) {
    return "TOP_RIGHT";
  } else if (
    settlementCoords.q === tileCoords.q + 0.5 &&
    settlementCoords.r === tileCoords.r - 0.5 &&
    settlementCoords.s === tileCoords.s + 0.5
  ) {
    return "TOP";
  } else if (
    settlementCoords.q === tileCoords.q - 0.5 &&
    settlementCoords.r === tileCoords.r - 0.5 &&
    settlementCoords.s === tileCoords.s + 0.5
  ) {
    return "TOP_LEFT";
  } else if (
    settlementCoords.q === tileCoords.q - 0.5 &&
    settlementCoords.r === tileCoords.r + 0.5 &&
    settlementCoords.s === tileCoords.s + 0.5
  ) {
    return "BOTTOM_LEFT";
  } else if (
    settlementCoords.q === tileCoords.q - 0.5 &&
    settlementCoords.r === tileCoords.r + 0.5 &&
    settlementCoords.s === tileCoords.s - 0.5
  ) {
    return "BOTTOM";
  } else if (
    settlementCoords.q === tileCoords.q + 0.5 &&
    settlementCoords.r === tileCoords.r + 0.5 &&
    settlementCoords.s === tileCoords.s - 0.5
  ) {
    return "BOTTOM_RIGHT";
  } else {
    throw new Error("Invalid settlement coords");
  }
}
