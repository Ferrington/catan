import { BOARD_RADIUS_MULT, DEBUG_MODE } from "~~/config/constants";
import { calcBoardCenter } from "~~/lib/board/calcBoardCenter";
import { drawRoad } from "~~/lib/board/roads/drawRoad";
import { drawCity } from "~~/lib/board/settlements/drawCity";
import { drawSettlement } from "~~/lib/board/settlements/drawSettlement";
import { drawHexagon } from "~~/lib/board/tiles/drawHexagon";
import { drawTile } from "~~/lib/board/tiles/drawTile";

export function drawBoard() {
  const { board, canvas, highlightedObject } = storeToRefs(useCatanStore());

  const ctx = canvas.value?.getContext("2d");
  if (!canvas.value || !ctx || !board.value) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  const boardCenter = calcBoardCenter(canvas.value);
  const boardRadius = canvas.value.width * BOARD_RADIUS_MULT;

  drawHexagon(ctx, boardCenter, boardRadius, "flat", "#87ceeb", "black");

  Object.values(board.value.tiles).forEach((tile) => {
    if (!ctx || !board.value) return;

    drawTile(ctx, tile, board.value.robberLocation);
  });

  Object.values(board.value.roads).forEach((road) => {
    if (!ctx) return;

    if (road.player || DEBUG_MODE) {
      drawRoad(ctx, road);
    }
  });

  Object.values(board.value.settlements).forEach((settlement) => {
    if (!settlement.player && !DEBUG_MODE) return;

    if (settlement.isCity) {
      drawCity(ctx, settlement);
    } else {
      drawSettlement(ctx, settlement);
    }
  });
}
