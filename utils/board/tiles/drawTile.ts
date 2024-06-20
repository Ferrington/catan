import { RESOURCES } from "~/assets/resources/imports";
import type { HighlightedObject } from "~/composables/catanBoard";
import {
  PIP_COUNTS,
  TILE_IMAGE_SIZE_MULT,
  TILE_RADIUS_MULT,
} from "~/config/constants";
import { drawHexagon } from "~/utils/board/tiles/drawHexagon";
import { hexVertexCoords } from "~/utils/board/tiles/hexVertexCoords";
import { hexCoordsToCoords } from "~/utils/hexCoords/hexCoordsToCoords";
import { sameCoords } from "~/utils/hexCoords/sameCoords";

export function drawTile(
  c: CanvasRenderingContext2D,
  highlightedObject: HighlightedObject | null,
  { coords, resource, numberToken, harbors }: HexTile,
  robberLocation: HexPoint
) {
  const center = hexCoordsToCoords(c, coords);
  const radius = c.canvas.width * TILE_RADIUS_MULT;

  // Draw harbor
  drawHarbor(c, center, coords, harbors);

  // Draw hexagon
  const fillStyle = sameCoords(coords, highlightedObject?.coords)
    ? "#90EE90"
    : RESOURCES[resource].color;
  drawHexagon(c, center, radius, "pointy", fillStyle, "black");

  // Draw resource image
  if (resource !== "desert") {
    const imgSize = c.canvas.width * TILE_IMAGE_SIZE_MULT;
    c.drawImage(
      RESOURCES[resource].img,
      center.x - imgSize / 2,
      center.y - imgSize / 2 - radius / 3,
      imgSize,
      imgSize
    );
  }

  if (sameCoords(coords, robberLocation)) {
    drawRobber(c, { x: center.x, y: center.y + radius / 4 }, radius);
  } else {
    drawNumberToken(
      c,
      { x: center.x, y: center.y + radius / 4 },
      radius,
      numberToken
    );
  }
}

function drawHarbor(
  c: CanvasRenderingContext2D,
  tileCenter: Point,
  tileCoords: HexPoint,
  harbors: HexTile["harbors"]
) {
  if (Object.values(harbors).length === 0) return;

  const harborCoords = Object.values(harbors).map((harbor) => {
    const hexCoords = hexVertexCoords(tileCoords, harbor.vertex);
    const center = hexCoordsToCoords(c, hexCoords);

    return center;
  });

  const lineLength = c.canvas.width * TILE_RADIUS_MULT * 1.5;
  const midpoint = findMidpoint(harborCoords[0], harborCoords[1]);
  const angle = findAngle(tileCenter, midpoint);
  const offshorePoint = {
    x: tileCenter.x + lineLength * Math.cos(angle),
    y: tileCenter.y + lineLength * Math.sin(angle),
  };

  for (const coords of harborCoords) {
    const lineWidth = c.canvas.width * TILE_RADIUS_MULT * 0.15;
    const angleToMidpoint = findAngle(coords, midpoint);
    const startPoint = {
      x: coords.x + (lineWidth / 2) * Math.cos(angleToMidpoint),
      y: coords.y + (lineWidth / 2) * Math.sin(angleToMidpoint),
    };

    const angle = findAngle(coords, offshorePoint);
    const lineLength = c.canvas.width * TILE_RADIUS_MULT * 0.4;
    const endPoint = {
      x: coords.x + lineLength * Math.cos(angle),
      y: coords.y + lineLength * Math.sin(angle),
    };

    c.lineWidth = lineWidth;
    c.strokeStyle = "brown";
    c.setLineDash([4, 1]);
    c.beginPath();
    c.moveTo(startPoint.x, startPoint.y);
    c.lineTo(endPoint.x, endPoint.y);
    c.stroke();
    c.lineWidth = 1;
    c.strokeStyle = "black";
    c.setLineDash([]);
  }

  c.beginPath();
  const rectSize = c.canvas.width * TILE_RADIUS_MULT * 0.5;
  c.fillStyle = RESOURCES["desert"].color;
  c.strokeRect(
    offshorePoint.x - rectSize / 2,
    offshorePoint.y - (rectSize * 1.4) / 2,
    rectSize,
    rectSize * 1.25
  );
  c.fillRect(
    offshorePoint.x - rectSize / 2,
    offshorePoint.y - (rectSize * 1.4) / 2,
    rectSize,
    rectSize * 1.25
  );
  c.closePath();

  c.fillStyle = "black";
  c.textBaseline = "middle";
  c.textAlign = "center";
  const fontSize = c.canvas.width * TILE_RADIUS_MULT * 0.15;
  c.font = `bold ${fontSize}pt Arial`;
  const ratio = Object.values(harbors)[0].ratio;
  c.fillText(`${ratio}:1`, offshorePoint.x, offshorePoint.y + fontSize);

  const resource = Object.values(harbors)[0].resource;
  if (resource) {
    const imgSize = c.canvas.width * TILE_IMAGE_SIZE_MULT * 0.75;
    c.drawImage(
      RESOURCES[resource].img,
      offshorePoint.x - imgSize / 2,
      offshorePoint.y - imgSize / 2 - fontSize,
      imgSize,
      imgSize
    );
  } else {
    c.font = `${fontSize * 1.35}pt Arial`;
    c.fillText("?", offshorePoint.x, offshorePoint.y - fontSize);
  }
}

function drawNumberToken(
  c: CanvasRenderingContext2D,
  center: Point,
  tileRadius: number,
  number: number | null
) {
  if (number == null) return;
  const tokenCircleRadius = tileRadius / 4;

  c.beginPath();
  c.arc(center.x, center.y, tokenCircleRadius, 0, 2 * Math.PI);
  c.fillStyle = RESOURCES["desert"].color;
  c.fill();
  c.closePath();
  c.stroke();
  c.fillStyle = [6, 8].includes(number) ? "red" : "black";
  c.textBaseline = "middle";
  c.textAlign = "center";
  c.font = `bold ${tokenCircleRadius / 1.5}pt Arial`;
  c.fillText(number.toString(), center.x, center.y - tokenCircleRadius / 6);
  c.font = `bold ${tokenCircleRadius / 1.8}pt Arial`;
  c.fillText(
    ".".repeat(PIP_COUNTS[number]),
    center.x,
    center.y + tokenCircleRadius / 4
  );
}

function drawRobber(
  c: CanvasRenderingContext2D,
  center: Point,
  tileRadius: number
) {
  const tokenCircleRadius = tileRadius / 4;

  c.beginPath();
  c.arc(center.x, center.y, tokenCircleRadius, 0, 2 * Math.PI);
  c.fillStyle = "black";
  c.fill();
  c.closePath();
  c.stroke();
}

function findMidpoint(a: Point, b: Point): Point {
  const midpointX = (a.x + b.x) / 2;
  const midpointY = (a.y + b.y) / 2;
  return { x: midpointX, y: midpointY };
}

function findAngle(a: Point, b: Point): number {
  return Math.atan2(b.y - a.y, b.x - a.x);
}
