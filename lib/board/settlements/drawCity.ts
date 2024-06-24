import { PIECE_SIZE_MULT, PLAYER_COLORS } from "~~/config/constants";
import { hexCoordsToCoords } from "~~/lib/hexCoords/hexCoordsToCoords";
import { sameCoords } from "~~/lib/hexCoords/sameCoords";

export function drawCity(
  ctx: CanvasRenderingContext2D | null,
  { coords, player }: Settlement
) {
  if (!ctx) return;

  const { highlightedObject, interaction } = storeToRefs(useCatanStore());

  const center = hexCoordsToCoords(ctx, coords);

  const pieceSize = ctx.canvas.width * PIECE_SIZE_MULT * 0.8;

  ctx.beginPath();

  const p: Point = { ...center, y: center.y + 0.3 * pieceSize };
  p.x -= 0.95 * 2 * pieceSize;
  p.y -= 0.95 * 2 * pieceSize;
  ctx.moveTo(p.x, p.y);
  p.x += pieceSize;
  p.y -= pieceSize;
  ctx.lineTo(p.x, p.y);
  p.x += pieceSize;
  p.y += pieceSize;
  ctx.lineTo(p.x, p.y);
  p.y += pieceSize;
  ctx.lineTo(p.x, p.y);
  p.x += 0.9 * 2 * pieceSize;
  ctx.lineTo(p.x, p.y);
  p.y += 0.9 * 2 * pieceSize;
  ctx.lineTo(p.x, p.y);
  p.x -= 0.95 * 4 * pieceSize;
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
