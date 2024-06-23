import { PIECE_SIZE_MULT, PLAYER_COLORS } from "~~/config/constants";
import { hexCoordsToCoords } from "~~/lib/hexCoords/hexCoordsToCoords";
import { sameCoords } from "~~/lib/hexCoords/sameCoords";

export function drawSettlement(
  ctx: CanvasRenderingContext2D | null,
  { coords, player }: Settlement,
  highlightedObject: HighlightedObject | null
) {
  if (!ctx) return;

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
  ctx.fillStyle = sameCoords(coords, highlightedObject?.coords)
    ? "#90EE90"
    : PLAYER_COLORS[player ?? "red"];
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
}
