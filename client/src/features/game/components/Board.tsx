import "../game.css";
import {useSnapshot} from "valtio";
import {store} from "../../store/store.ts";
import Tile from "./Tile.tsx";
import {BoardState, Tile as TileType, Vertex as VertexType} from "../../types/types.ts";
import Vertex from "./Vertex.tsx";


export default function Board() {
  const {tiles, vertices} = useSnapshot<BoardState>(store);

  return (
    <div id="container">
      <div id="board">
        {Object.entries(tiles)
          .map(([key, value]) => <Tile key={key} tile={value as TileType}/>)}
        {Object.entries(vertices)
          .map(([key, value]) => <Vertex key={key} vertex={value as VertexType}/>)}
      </div>

    </div>
  );
}
