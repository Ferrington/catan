import {Tile as TileType} from "../../types/types.ts";

export default function Tile({tile}: { tile: TileType }) {

  const {coords} = tile;

  return (
    <div className="tile" style={{
      top: tile.top,
      left: tile.left
    }}>
      <div className="text">{coords.toString()}</div>
    </div>
  );
}