export function sameCoords(a?: HexPoint, b?: HexPoint): boolean {
  if (!a || !b) return false;
  return a.q === b.q && a.r === b.r && a.s === b.s;
}
