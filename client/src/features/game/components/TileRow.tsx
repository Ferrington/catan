import HexCoordinate from "../HexCoordinate.ts";
import Tile from "./Tile.tsx";

export default function TileRow({size, start}: { size: number, start: HexCoordinate }) {
  const hexes = [];
  let coords = start;
  for (let i = 0; i < size; i++) {
    hexes.push(<Tile coords={coords}></Tile>);
    coords = coords.rightNeighbor();
  }

  return (
    <div className="tile-row">
      {hexes}
    </div>
  );
}