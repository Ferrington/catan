export function stringToCoords(str: string): HexPoint {
  const [q, r, s] = str.split(",").map(Number);
  return { q, r, s };
}
