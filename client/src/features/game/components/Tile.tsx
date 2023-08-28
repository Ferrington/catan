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

type PipCounts = {
  [index: number]: number
}

const pipCounts: PipCounts = {
  2: 1,
  12: 1,
  3: 2,
  11: 2,
  4: 3,
  10: 3,
  5: 4,
  9: 4,
  6: 5,
  8: 5
}

export default function Tile({tile}: { tile: TileType }) {
  const {coords} = tile;

  return (
    <div className="tile" style={{
      top: tile.top,
      left: tile.left,
      background: tile.resource == null ? "#fff4b1" : resourceVisuals[tile.resource].color,
    }}>
      <div className="text">
        {/*<div style={{position: "absolute", top: 10}}>{coords.toString()}</div>*/}
        {tile.resource != null &&
            <>
                <img src={resourceVisuals[tile.resource].img} width={40} height={40} alt="resource icon"/>
                <div className="number-token" style={{color: [6, 8].includes(tile.numberToken) ? "red" : "black"}}>
                    <div className="number-token--number">{tile.numberToken}</div>
                    <div className="number-token--pips">{".".repeat(pipCounts[tile.numberToken])}</div>
                </div>
            </>
        }
      </div>
    </div>
  );
}