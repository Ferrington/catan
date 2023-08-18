import "../game.css";
import {useSnapshot} from "valtio";
import {store} from "../../store/store.ts";
import Tile from "./Tile.tsx";
import {BoardState, Edge as EdgeType, Tile as TileType, Vertex as VertexType} from "../../types/types.ts";
import Vertex from "./Vertex.tsx";
import Edge from "./Edge.tsx";


export default function Board() {
  const {tiles, vertices, edges} = useSnapshot<BoardState>(store);

  return (
    <div id="container">
      <div id="board">
        {Object.entries(tiles)
          .map(([key, value]) => <Tile key={key} tile={value as TileType}/>)}
        {Object.entries(vertices)
          .map(([key, value]) => <Vertex key={key} vertex={value as VertexType}/>)}
        {Object.entries(edges)
          .map(([key, value]) => <Edge key={key} edge={value as EdgeType}/>)}
      </div>

    </div>
  );
}
