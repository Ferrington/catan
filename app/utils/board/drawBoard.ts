import { calcBoardCenter } from "~/utils/board/calcBoardCenter";
import { drawRoad } from "~/utils/board/roads/drawRoad";
import { drawCity } from "~/utils/board/settlements/drawCity";
import { drawSettlement } from "~/utils/board/settlements/drawSettlement";
import { drawHexagon } from "~/utils/board/tiles/drawHexagon";
import { drawTile } from "~/utils/board/tiles/drawTile";
import { BOARD_RADIUS_MULT, DEBUG_MODE } from "~~/config/constants";

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

    drawTile(ctx, highlightedObject.value, tile, board.value.robberLocation);
  });

  Object.values(board.value.roads).forEach((road) => {
    if (!ctx) return;

    if (road.player || DEBUG_MODE) {
      drawRoad(ctx, road, highlightedObject.value);
    }
  });

  Object.values(board.value.settlements).forEach((settlement) => {
    if (!settlement.player && !DEBUG_MODE) return;

    if (settlement.isCity) {
      drawCity(ctx, settlement, highlightedObject.value);
    } else {
      drawSettlement(ctx, settlement, highlightedObject.value);
    }
  });
}
