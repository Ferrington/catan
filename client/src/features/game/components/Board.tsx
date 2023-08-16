import "../game.css";
import HexCoordinate from "../HexCoordinate.ts";
import TileRow from "./TileRow.tsx";

const rows = [
  {size: 3, start: new HexCoordinate(2, 0, -2)},
  {size: 4, start: new HexCoordinate(2, -1, -1)},
  {size: 5, start: new HexCoordinate(2, -2, 0)},
  {size: 4, start: new HexCoordinate(1, -2, 1)},
  {size: 3, start: new HexCoordinate(0, -2, 2)},
];

export default function Board() {
  return (
    <div id="container">
      <div id="board">
        {rows.map(({size, start}) => <TileRow key={start.toString()} size={size} start={start}/>)}
      </div>

    </div>
  );
}
