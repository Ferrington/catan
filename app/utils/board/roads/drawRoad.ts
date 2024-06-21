import { hexCoordsToCoords } from "~/utils/hexCoords/hexCoordsToCoords";
import { sameCoords } from "~/utils/hexCoords/sameCoords";
import {
  PLAYER_COLORS,
  ROAD_LENGTH_MULT,
  ROAD_WIDTH_MULT,
} from "~~/config/constants";

export function drawRoad(
  ctx: CanvasRenderingContext2D | null,
  { rotation, coords, player }: Road,
  highlightedObject: HighlightedObject | null
) {
  if (!ctx) return;

  const ROAD_WIDTH = ctx.canvas.width * ROAD_WIDTH_MULT;
  const ROAD_LENGTH = ctx.canvas.width * ROAD_LENGTH_MULT;

  const center = hexCoordsToCoords(ctx, coords);

  ctx.save();
  ctx.beginPath();
  ctx.translate(center.x, center.y);
  ctx.rotate(-rotation);
  ctx.fillStyle = sameCoords(coords, highlightedObject?.coords)
    ? "#90EE90"
    : PLAYER_COLORS[player ?? "red"];
  ctx.fillRect(-ROAD_LENGTH / 2, -ROAD_WIDTH / 2, ROAD_LENGTH, ROAD_WIDTH);
  ctx.strokeRect(-ROAD_LENGTH / 2, -ROAD_WIDTH / 2, ROAD_LENGTH, ROAD_WIDTH);
  ctx.closePath();
  ctx.restore();
}
