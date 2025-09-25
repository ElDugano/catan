import { useContext } from "react";
import { PlayerInformationContext } from "../../../state/playerInformation/PlayerInformationContext";

export default function BuildRoadButton(props) {
  const {getAPlayersColor} = useContext(PlayerInformationContext);
  if(props.NodeRoadOwner != "none") {
    return (
      <line
        key={crypto.randomUUID()}
        x1={props.lineStartX}
        y1={props.lineStartY}
        x2={props.lineEndX}
        y2={props.lineEndY}
        className={""}
        stroke={getAPlayersColor(props.NodeRoadOwner)}
        strokeWidth={4}
      />)
    }
  return;
}