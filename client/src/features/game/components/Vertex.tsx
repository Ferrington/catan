import {Vertex as VertexType} from "../../types/types.ts";
import {ReactComponent as CityImg} from "../../../assets/city.svg";
import {ReactComponent as SettlementImg} from "../../../assets/settlement.svg";

export default function Vertex({vertex}: { vertex: VertexType }) {

  let building = null;
  if (vertex.building != null) {
    if (vertex.building.type === "city")
      building = <CityImg fill={vertex.building.color}/>;
    else if (vertex.building.type === "settlement")
      building = <SettlementImg fill={vertex.building.color}/>;
  }


  return (
    <div className="vertex" style={{
      top: vertex.top,
      left: vertex.left
    }}>
      {building}
    </div>
  );
}