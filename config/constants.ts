import brick from "~/assets/resources/brick.svg";
import desert from "~/assets/resources/desert.svg";
import grain from "~/assets/resources/grain.svg";
import lumber from "~/assets/resources/lumber.svg";
import ore from "~/assets/resources/ore.svg";
import wool from "~/assets/resources/wool.svg";

export const DEBUG_MODE = false;

export const PIECE_SIZE_MULT = 0.00977; // 11 / 1125
export const TILE_RADIUS_MULT = 0.08888; // 100 / 1125
export const BOARD_RADIUS_MULT = 0.5;
export const TILE_GAP_MULT = 0; // 0 / 1125
export const ROAD_WIDTH_MULT = 0.00977; // 11 / 1125
export const ROAD_LENGTH_MULT = 0.03911; // 4 * 11 / 1125
export const TILE_IMAGE_SIZE_MULT = 0.04; // 45 / 1125

export const TILE_INTERSECT_OFFSET = -5;
export const SETTLEMENT_INTERSECT_OFFSET = 8;
export const ROAD_INTERSECT_OFFSET = 5;

export const HEX_VERTICES: VertexDirection[] = [
  "TOP_RIGHT",
  "TOP",
  "TOP_LEFT",
  "BOTTOM_LEFT",
  "BOTTOM",
  "BOTTOM_RIGHT",
];

const woolImg = new Image();
woolImg.src = wool;

const brickImg = new Image();
brickImg.src = brick;

const lumberImg = new Image();
lumberImg.src = lumber;

const grainImg = new Image();
grainImg.src = grain;

const oreImg = new Image();
oreImg.src = ore;

const desertImg = new Image();
desertImg.src = desert;

export const RESOURCES: Record<
  Resource,
  { color: string; img: HTMLImageElement }
> = {
  wool: { color: "#9bff9b", img: woolImg },
  brick: { color: "#ffb0b0", img: brickImg },
  lumber: { color: "#d78e71", img: lumberImg },
  grain: { color: "#ffe140", img: grainImg },
  ore: { color: "#d3d3d3", img: oreImg },
  desert: { color: "#fffac8", img: desertImg },
};

export const PLAYER_COLORS: Record<PlayerColor, string> = {
  red: "#e6194B",
  blue: "#4363d8",
  green: "#3cb44b",
  purple: "#911eb4",
};

export const PIP_COUNTS: Record<number, number> = {
  2: 1,
  12: 1,
  3: 2,
  11: 2,
  4: 3,
  10: 3,
  5: 4,
  9: 4,
  6: 5,
  8: 5,
};
