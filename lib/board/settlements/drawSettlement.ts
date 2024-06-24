import { PIECE_SIZE_MULT, PLAYER_COLORS } from "~~/config/constants";
import { hexCoordsToCoords } from "~~/lib/hexCoords/hexCoordsToCoords";
import { sameCoords } from "~~/lib/hexCoords/sameCoords";

export function drawSettlement(
  ctx: CanvasRenderingContext2D | null,
  { coords, player }: Settlement
) {
  if (!ctx) return;

  const { highlightedObject, interaction } = storeToRefs(useCatanStore());

  const center = hexCoordsToCoords(ctx, coords);

  const PIECE_SIZE = ctx.canvas.width * PIECE_SIZE_MULT;

  ctx.beginPath();
  const p: Point = { ...center, y: center.y + 0.2 * PIECE_SIZE };
  p.x -= PIECE_SIZE;
  p.y -= 0.8 * PIECE_SIZE;
  ctx.moveTo(p.x, p.y);
  p.x += PIECE_SIZE;
  p.y -= 0.8 * PIECE_SIZE;
  ctx.lineTo(p.x, p.y);
  p.x += PIECE_SIZE;
  p.y += 0.8 * PIECE_SIZE;
  ctx.lineTo(p.x, p.y);
  p.y += 1.6 * PIECE_SIZE;
  ctx.lineTo(p.x, p.y);
  p.x -= 2 * PIECE_SIZE;
  ctx.lineTo(p.x, p.y);

  const highlightSettlement =
    interaction.value != null &&
    sameCoords(coords, highlightedObject.value?.coords) &&
    interaction.value.type === "settlement" &&
    interaction.value.highlight === "settlement";
  ctx.fillStyle = highlightSettlement
    ? interaction.value.color
    : PLAYER_COLORS[player ?? "red"];
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
}
