import {Vertex as VertexType} from "../../types/types.ts";

export default function Vertex({vertex}: { vertex: VertexType }) {
  return (
    <div className="vertex" style={{
      top: vertex.top,
      left: vertex.left
    }}></div>
  );
}