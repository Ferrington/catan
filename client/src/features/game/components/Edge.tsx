import {Edge as EdgeType} from "../../types/types.ts";

export default function Edge({edge}: { edge: EdgeType }) {
  return (
    <div className="edge" style={{
      top: edge.top,
      left: edge.left,
      transform: `rotate(${edge.rotation}deg)`,
    }}></div>
  );
}