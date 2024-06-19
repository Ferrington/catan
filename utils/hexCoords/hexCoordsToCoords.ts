import {
  HEX_VERTICES,
  TILE_GAP_MULT,
  TILE_RADIUS_MULT,
} from "~/config/constants";
import { calcBoardCenter } from "~/utils/board/calcBoardCenter";
import { findRoadEdge } from "~/utils/board/roads/findRoadEdge";
import { findSettlementVertex } from "~/utils/board/settlements/findSettlementVertex";

export function hexCoordsToCoords(
  ctx: CanvasRenderingContext2D | null,
  hexCoords: HexPoint
): Point {
  if (!ctx) throw new Error("Canvas context is null");

  const boardCenter = calcBoardCenter(ctx.canvas);

  const type = determineCoordType(hexCoords);

  if (type === "tile")
    return tileHexCoordsToCoords(ctx, hexCoords, boardCenter);
  if (type === "road")
    return roadHexCoordsToCoords(ctx, hexCoords, boardCenter);
  if (type === "settlement")
    return settlementHexCoordsToCoords(ctx, hexCoords, boardCenter);

  throw new Error("Invalid hex coords");
}

function determineCoordType(hexCoords: HexPoint) {
  if (hexCoords.r + hexCoords.q + hexCoords.s === 0 && allIntegers(hexCoords)) {
    return "tile";
  } else if (hexCoords.r + hexCoords.q + hexCoords.s === 0) {
    return "road";
  } else {
    return "settlement";
  }
}

function tileHexCoordsToCoords(
  ctx: CanvasRenderingContext2D,
  hexCoords: HexPoint,
  boardCenter: Point
): Point {
  const TILE_RADIUS = ctx.canvas.width * TILE_RADIUS_MULT;
  const TILE_GAP = ctx.canvas.width * TILE_GAP_MULT;

  const hexApothem = (TILE_RADIUS * Math.sqrt(3)) / 2;
  const hexWidth = hexApothem * 2;
  const row = hexCoords.r + 2;
  const col = 2 + (hexCoords.r >= 0 ? hexCoords.q : hexCoords.q + hexCoords.r);

  const boardOffset = {
    x: boardCenter.x - hexWidth - TILE_GAP * 2,
    y:
      boardCenter.y -
      2 * (TILE_RADIUS * 1.5 + Math.sqrt(TILE_GAP ** 2 - (TILE_GAP / 2) ** 2)),
  };

  const offsetDirection = row < 3 ? -1 : 1;
  let offset;
  if (row < 3) {
    offset =
      boardOffset.x + offsetDirection * row * (hexApothem + TILE_GAP / 2);
  } else {
    offset =
      boardOffset.x + offsetDirection * (row - 4) * (hexApothem + TILE_GAP / 2);
  }

  return {
    x: offset + col * (hexWidth + TILE_GAP),
    y:
      boardOffset.y +
      row *
        (TILE_RADIUS * 1.5 + Math.sqrt(TILE_GAP ** 2 - (TILE_GAP / 2) ** 2)),
  };
}

function roadHexCoordsToCoords(
  ctx: CanvasRenderingContext2D,
  roadCoords: HexPoint,
  boardCenter: Point
): Point {
  const TILE_RADIUS = ctx.canvas.width * TILE_RADIUS_MULT;
  const TILE_GAP = ctx.canvas.width * TILE_GAP_MULT;

  const tileCoords = getTileCoordsFromRoad(roadCoords);
  const tileCenter = tileHexCoordsToCoords(ctx, tileCoords, boardCenter);
  const edge = findRoadEdge(roadCoords, tileCoords);
  const tileApothem = (TILE_RADIUS * Math.sqrt(3)) / 2;

  const angle = (-edge * Math.PI) / 3;
  return {
    x: tileCenter.x + (tileApothem + TILE_GAP / 2) * Math.cos(angle),
    y: tileCenter.y + (tileApothem + TILE_GAP / 2) * Math.sin(angle),
  };
}

function settlementHexCoordsToCoords(
  ctx: CanvasRenderingContext2D,
  settlementCoords: HexPoint,
  boardCenter: Point
): Point {
  const TILE_RADIUS = ctx.canvas.width * TILE_RADIUS_MULT;
  const TILE_GAP = ctx.canvas.width * TILE_GAP_MULT;

  const tileCoords = getTileCoordsFromSettlement(settlementCoords);
  const tileCenter = tileHexCoordsToCoords(ctx, tileCoords, boardCenter);
  const vertex = findSettlementVertex(settlementCoords, tileCoords);

  const i = HEX_VERTICES.indexOf(vertex);
  const centroidDistance = (TILE_GAP * Math.sqrt(3)) / 3;

  const angle = (-i * Math.PI) / 3 - Math.PI / 6;

  return {
    x: tileCenter.x + (TILE_RADIUS + centroidDistance) * Math.cos(angle),
    y: tileCenter.y + (TILE_RADIUS + centroidDistance) * Math.sin(angle),
  };
}

function allIntegers(hexCoords: HexPoint) {
  return (
    hexCoords.q % 1 === 0 && hexCoords.r % 1 === 0 && hexCoords.s % 1 === 0
  );
}

function getTileCoordsFromRoad(hexCoords: HexPoint) {
  const q = Math.trunc(hexCoords.q);
  const r = Math.trunc(hexCoords.r);
  const s = Math.trunc(hexCoords.s);

  if (hexCoords.s % 1 === 0) {
    return {
      q: 0 - r - s,
      r,
      s,
    };
  }
  return {
    q,
    r,
    s: 0 - q - r,
  };
}

function getTileCoordsFromSettlement({ q, r, s }: HexPoint) {
  const leftOfCenter = q < s;
  const aboveCenter = r < 0;

  const newR = Math.trunc(r);
  let newQ = 0;
  let newS = 0;

  if (leftOfCenter && aboveCenter) {
    newS = s - 0.5;
    newQ = 0 - newR - newS;
  } else if (leftOfCenter && !aboveCenter) {
    newQ = q + 0.5;
    newS = 0 - newR - newQ;
  } else if (!leftOfCenter && aboveCenter) {
    newQ = q - 0.5;
    newS = 0 - newR - newQ;
  } else {
    newS = s + 0.5;
    newQ = 0 - newR - newS;
  }

  return { q: newQ, r: newR, s: newS };
}
