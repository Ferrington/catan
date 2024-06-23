import { useResizeObserver } from "@vueuse/core";
import {
  PIECE_SIZE_MULT,
  SETTLEMENT_INTERSECT_OFFSET,
  TILE_RADIUS_MULT,
} from "~~/config/constants";
import { drawBoard } from "~~/lib/board/drawBoard";
import { isMouseInRectangle } from "~~/lib/board/roads/isMouseInRectangle";
import { isMouseInHex } from "~~/lib/board/tiles/isMouseInHex";
import { hexCoordsToCoords } from "~~/lib/hexCoords/hexCoordsToCoords";
import { sameCoords } from "~~/lib/hexCoords/sameCoords";

export type HighlightedObject = {
  type: "tile" | "road" | "settlement";
  obj: HexTile | Road | Settlement;
  coords: HexPoint;
};

export function useCatanBoard(
  canvas: Ref<HTMLCanvasElement | null>,
  boardWrapper: Ref<HTMLDivElement | null>
) {
  const mouseCoords = ref<Point | null>(null);

  const { board, highlightedObject } = storeToRefs(useCatanStore());
  const { setCanvas } = useCatanStore();

  onMounted(() => {
    if (!canvas.value) {
      console.error("Could not get canvas element");
      return;
    }

    setCanvas(canvas.value);
  });

  useResizeObserver(boardWrapper, calcCanvasSize);

  function handleMouseMove(e: MouseEvent) {
    mouseCoords.value = getMousePos(e);
    const ctx = canvas.value?.getContext("2d");
    if (!mouseCoords.value || !canvas.value || !ctx || !board.value) {
      return;
    }

    let collisionHappened = false;
    const tileRadius = canvas.value.width * TILE_RADIUS_MULT;
    for (const tile of Object.values(board.value.tiles)) {
      if (
        isMouseInHex(
          tileRadius,
          hexCoordsToCoords(ctx, tile.coords),
          mouseCoords.value
        )
      ) {
        if (!sameCoords(tile.coords, highlightedObject.value?.coords)) {
          highlightedObject.value = {
            type: "tile",
            obj: tile,
            coords: tile.coords,
          };
        }
        collisionHappened = true;
        break;
      }
    }

    const PIECE_SIZE = canvas.value.width * PIECE_SIZE_MULT;
    for (const settlement of Object.values(board.value.settlements)) {
      const center = hexCoordsToCoords(ctx, settlement.coords);
      if (
        Math.hypot(
          center.x - mouseCoords.value.x,
          center.y - mouseCoords.value.y
        ) <=
        PIECE_SIZE + SETTLEMENT_INTERSECT_OFFSET
      ) {
        if (!sameCoords(settlement.coords, highlightedObject.value?.coords)) {
          highlightedObject.value = {
            type: "settlement",
            obj: settlement,
            coords: settlement.coords,
          };
        }
        collisionHappened = true;
        break;
      }
    }

    for (const road of Object.values(board.value.roads)) {
      if (isMouseInRectangle(ctx, road, mouseCoords.value)) {
        if (!sameCoords(road.coords, highlightedObject.value?.coords)) {
          highlightedObject.value = {
            type: "road",
            obj: road,
            coords: road.coords,
          };
        }
        collisionHappened = true;
        break;
      }
    }

    if (!collisionHappened) {
      highlightedObject.value = null;
    }
  }

  function getMousePos(e: MouseEvent): Point | null {
    if (!canvas.value) {
      return null;
    }

    var rect = canvas.value.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  watch(highlightedObject, () => drawBoard(), {
    deep: true,
  });

  function calcCanvasSize() {
    if (!boardWrapper.value || !canvas.value) return;

    const rect = boardWrapper.value.getBoundingClientRect();
    const { width, height } = rect;

    let newWidth = width;
    let newHeight = width * 0.86666;
    if (newHeight > height) {
      newWidth = height * 1.1538;
      newHeight = height;
    }

    canvas.value.width = newWidth;
    canvas.value.height = newHeight;
    drawBoard();
  }

  return {
    mouseCoords,
    handleMouseMove,
    highlightedObject,
  };
}
