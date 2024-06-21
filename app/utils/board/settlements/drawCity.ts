import { hexCoordsToCoords } from "~/utils/hexCoords/hexCoordsToCoords";
import { sameCoords } from "~/utils/hexCoords/sameCoords";
import { PIECE_SIZE_MULT, PLAYER_COLORS } from "~~/config/constants";

export function drawCity(
  ctx: CanvasRenderingContext2D | null,
  { coords, player }: Settlement,
  highlightedObject: HighlightedObject | null
) {
  if (!ctx) return;

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

  ctx.fillStyle = sameCoords(coords, highlightedObject?.coords)
    ? "#90EE90"
    : PLAYER_COLORS[player ?? "red"];
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
}
