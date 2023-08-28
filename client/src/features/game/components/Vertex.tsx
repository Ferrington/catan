import {Vertex as VertexType} from "../../types/types.ts";
import {ReactComponent as CityImg} from "../../../assets/buildings/city.svg";
import {ReactComponent as SettlementImg} from "../../../assets/buildings/settlement.svg";

export default function Vertex({vertex}: { vertex: VertexType }) {

  let building = null;
  if (vertex.building != null) {
    if (vertex.building.type === "city")
      building =
        <CityImg fill={vertex.building.color}
                 style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}}/>;
    else if (vertex.building.type === "settlement")
      building =
        <SettlementImg fill={vertex.building.color}
                       filter="drop-shadow(0px 0px 1px black)"/>;
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