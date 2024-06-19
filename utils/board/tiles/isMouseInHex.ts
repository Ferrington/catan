import { TILE_INTERSECT_OFFSET } from "~/config/constants";

export function isMouseInHex(
  radius: number,
  centerPoint: Point,
  mouseCoords: Point
) {
  const SIDES = 6;

  const m = radius * Math.cos(Math.PI / SIDES);
  const d = Math.hypot(
    mouseCoords.x - centerPoint.x,
    mouseCoords.y - centerPoint.y
  );
  const a =
    Math.atan2(mouseCoords.y - centerPoint.y, mouseCoords.x - centerPoint.x) -
    Math.PI / 6;
  return (
    d - TILE_INTERSECT_OFFSET <=
    (radius + m) / 2 + (Math.cos(a * SIDES) * (radius - m)) / 2
  );
}
