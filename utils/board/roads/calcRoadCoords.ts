export function calcRoadCoords(tileCoords: HexPoint, rotation: number) {
  const coords: HexPoint = { ...tileCoords };

  if (rotation <= 1) {
    coords.q = tileCoords.q + 0.5;
  } else if (rotation >= 3 && rotation <= 4) {
    coords.q = tileCoords.q - 0.5;
  }

  if (rotation >= 1 && rotation <= 2) {
    coords.r = tileCoords.r - 0.5;
  } else if (rotation >= 4 && rotation <= 5) {
    coords.r = tileCoords.r + 0.5;
  }

  if (rotation >= 2 && rotation <= 3) {
    coords.s = tileCoords.s + 0.5;
  } else if (rotation >= 5 || rotation <= 0) {
    coords.s = tileCoords.s - 0.5;
  }

  return coords;
}
