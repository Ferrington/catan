import {
  ROAD_INTERSECT_OFFSET,
  ROAD_LENGTH_MULT,
  ROAD_WIDTH_MULT,
} from "~~/config/constants";
import { hexCoordsToCoords } from "~~/lib/hexCoords/hexCoordsToCoords";

export function isMouseInRectangle(
  ctx: CanvasRenderingContext2D,
  road: Road,
  mouseCoords: Point
) {
  const ROAD_WIDTH = ctx.canvas.width * ROAD_WIDTH_MULT;
  const ROAD_LENGTH = ctx.canvas.width * ROAD_LENGTH_MULT;

  const center = hexCoordsToCoords(ctx, road.coords);

  // Translate mouse coordinates to rectangle's local coordinate system
  const translatedX = mouseCoords.x - center.x;
  const translatedY = mouseCoords.y - center.y;

  const cosAngle = Math.cos(road.rotation);
  const sinAngle = Math.sin(road.rotation);
  const localX = cosAngle * translatedX - sinAngle * translatedY;
  const localY = sinAngle * translatedX + cosAngle * translatedY;
  const testX = localX / (ROAD_LENGTH + ROAD_INTERSECT_OFFSET) + 0.5;
  const testY = localY / (ROAD_WIDTH + ROAD_INTERSECT_OFFSET) + 0.5;

  return testX >= 0 && testX <= 1 && testY >= 0 && testY <= 1;
}
