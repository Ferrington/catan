import brick from "~/assets/resources/brick.svg";
import desert from "~/assets/resources/desert.svg";
import grain from "~/assets/resources/grain.svg";
import lumber from "~/assets/resources/lumber.svg";
import ore from "~/assets/resources/ore.svg";
import wool from "~/assets/resources/wool.svg";

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
  TileType,
  { color: string; img: HTMLImageElement }
> = {
  wool: { color: "#9bff9b", img: woolImg },
  brick: { color: "#ffb0b0", img: brickImg },
  lumber: { color: "#d78e71", img: lumberImg },
  grain: { color: "#ffe140", img: grainImg },
  ore: { color: "#d3d3d3", img: oreImg },
  desert: { color: "#fffac8", img: desertImg },
};
