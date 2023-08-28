import {Tile as TileType} from "../../types/types.ts";
import brickImg from "../../../assets/resources/brick.svg";
import sheepImg from "../../../assets/resources/sheep.svg";
import rockImg from "../../../assets/resources/rock.svg";
import wheatImg from "../../../assets/resources/wheat.svg";
import woodImg from "../../../assets/resources/wood.svg";

type ResourceVisuals = {
  brick: ResourceVisual;
  sheep: ResourceVisual;
  rock: ResourceVisual;
  wheat: ResourceVisual;
  wood: ResourceVisual;
};

type ResourceVisual = {
  img: string;
  color: string;
}

const resourceVisuals: ResourceVisuals = {
  brick: {
    img: brickImg,
    color: "#ffb0b0",
  },
  sheep: {
    img: sheepImg,
    color: "#9bff9b",
  },
  rock: {
    img: rockImg,
    color: "#d3d3d3",
  },
  wheat: {
    img: wheatImg,
    color: "#ffe140",
  },
  wood: {
    img: woodImg,
    color: "#d78e71",
  },
}

export default function Tile({tile}: { tile: TileType }) {

  const {coords} = tile;

  console.log(tile.resource);

  return (
    <div className="tile" style={{
      top: tile.top,
      left: tile.left,
      background: tile.resource == null ? "#fff4b1" : resourceVisuals[tile.resource].color,
    }}>
      <div className="text">
        {tile.resource != null &&
            <img src={resourceVisuals[tile.resource].img} width={40} height={40} alt="resource icon"/>}
        <div style={{position: "absolute", top: 20}}>{coords.toString()}</div>
      </div>
    </div>
  );
}