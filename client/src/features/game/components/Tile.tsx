import {Tile as TileType} from "../../types/types.ts";
import brickImg from "../../../assets/resources/brick.svg";
import sheepImg from "../../../assets/resources/sheep.svg";
import rockImg from "../../../assets/resources/rock.svg";
import wheatImg from "../../../assets/resources/wheat.svg";
import woodImg from "../../../assets/resources/wood.svg";

type Imgs = {
  brick: string;
  sheep: string;
  rock: string;
  wheat: string;
  wood: string;
};

const imgs: Imgs = {
  brick: brickImg,
  sheep: sheepImg,
  rock: rockImg,
  wheat: wheatImg,
  wood: woodImg,
}

export default function Tile({tile}: { tile: TileType }) {

  const {coords} = tile;

  console.log(tile.resource);

  return (
    <div className="tile" style={{
      top: tile.top,
      left: tile.left
    }}>
      <div className="text">
        {tile.resource != null && <img src={imgs[tile.resource]} width={40} height={40} alt="resource icon"/>}
        <div style={{position: "absolute", top: 20}}>{coords.toString()}</div>
      </div>
    </div>
  );
}