export function hexVertexCoords(tileCoords: HexPoint, vertex: VertexDirection) {
  const coords: HexPoint = { ...tileCoords };

  if (vertex === "TOP_RIGHT") {
    coords.q = tileCoords.q + 0.5;
    coords.r = tileCoords.r - 0.5;
    coords.s = tileCoords.s - 0.5;
  } else if (vertex === "TOP") {
    coords.q = tileCoords.q + 0.5;
    coords.r = tileCoords.r - 0.5;
    coords.s = tileCoords.s + 0.5;
  } else if (vertex === "TOP_LEFT") {
    coords.q = tileCoords.q - 0.5;
    coords.r = tileCoords.r - 0.5;
    coords.s = tileCoords.s + 0.5;
  } else if (vertex === "BOTTOM_LEFT") {
    coords.q = tileCoords.q - 0.5;
    coords.r = tileCoords.r + 0.5;
    coords.s = tileCoords.s + 0.5;
  } else if (vertex === "BOTTOM") {
    coords.q = tileCoords.q - 0.5;
    coords.r = tileCoords.r + 0.5;
    coords.s = tileCoords.s - 0.5;
  } else if (vertex === "BOTTOM_RIGHT") {
    coords.q = tileCoords.q + 0.5;
    coords.r = tileCoords.r + 0.5;
    coords.s = tileCoords.s - 0.5;
  } else {
    throw new Error("Invalid vertex direction");
  }

  return coords;
}
