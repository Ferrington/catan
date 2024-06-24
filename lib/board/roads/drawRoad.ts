import {
  PLAYER_COLORS,
  ROAD_LENGTH_MULT,
  ROAD_WIDTH_MULT,
} from "~~/config/constants";
import { hexCoordsToCoords } from "~~/lib/hexCoords/hexCoordsToCoords";
import { sameCoords } from "~~/lib/hexCoords/sameCoords";

export function drawRoad(
  ctx: CanvasRenderingContext2D | null,
  { rotation, coords, player }: Road
) {
  if (!ctx) return;

  const { highlightedObject, interaction } = storeToRefs(useCatanStore());

  const ROAD_WIDTH = ctx.canvas.width * ROAD_WIDTH_MULT;
  const ROAD_LENGTH = ctx.canvas.width * ROAD_LENGTH_MULT;

  const center = hexCoordsToCoords(ctx, coords);

  ctx.save();
  ctx.beginPath();
  ctx.translate(center.x, center.y);
  ctx.rotate(-rotation);

  const highlightRoad =
    interaction.value != null &&
    sameCoords(coords, highlightedObject.value?.coords) &&
    interaction.value.type === "road" &&
    interaction.value.highlight === "road";
  ctx.fillStyle = highlightRoad
    ? interaction.value.color
    : PLAYER_COLORS[player ?? "red"];
  ctx.fillRect(-ROAD_LENGTH / 2, -ROAD_WIDTH / 2, ROAD_LENGTH, ROAD_WIDTH);
  ctx.strokeRect(-ROAD_LENGTH / 2, -ROAD_WIDTH / 2, ROAD_LENGTH, ROAD_WIDTH);
  ctx.closePath();
  ctx.restore();
}
