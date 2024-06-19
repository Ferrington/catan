import { BOARD_RADIUS_MULT, DEBUG_MODE } from "~/config/constants";
import { calcBoardCenter } from "~/utils/board/calcBoardCenter";
import { drawRoad } from "~/utils/board/roads/drawRoad";
import { drawCity } from "~/utils/board/settlements/drawCity";
import { drawSettlement } from "~/utils/board/settlements/drawSettlement";
import { drawHexagon } from "~/utils/board/tiles/drawHexagon";
import { drawTile } from "~/utils/board/tiles/drawTile";

export function drawBoard(
  ctx: CanvasRenderingContext2D | null,
  highlightedObject: HighlightedObject | null
) {
  if (!ctx) return;
  const canvas = ctx.canvas;

  const { board } = storeToRefs(useCatanStore());

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const boardCenter = calcBoardCenter(canvas);
  const boardRadius = canvas.width * BOARD_RADIUS_MULT;

  drawHexagon(ctx, boardCenter, boardRadius, "flat", "#87ceeb", "black");

  Object.values(board.value.tiles).forEach((tile) => {
    if (!ctx) return;

    drawTile(ctx, highlightedObject, tile, board.value.robberLocation);
  });

  Object.values(board.value.roads).forEach((road) => {
    if (!ctx) return;

    if (road.player || DEBUG_MODE) {
      drawRoad(ctx, road, highlightedObject);
    }
  });

  Object.values(board.value.settlements).forEach((settlement) => {
    if (!settlement.player && !DEBUG_MODE) return;

    if (settlement.isCity) {
      drawCity(ctx, settlement, highlightedObject);
    } else {
      drawSettlement(ctx, settlement, highlightedObject);
    }
  });
}
