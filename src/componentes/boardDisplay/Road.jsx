import { useContext } from "react";
import { PlayerColorContext } from "../../state/playerColor/PlayerColorContext";

export default function BuildRoadButton(props) {
  const {playerColor} = useContext(PlayerColorContext);
  if(props.NodeRoadOwner != "none") {
    return (
      <line
        key={crypto.randomUUID()}
        x1={props.lineStartX}
        y1={props.lineStartY}
        x2={props.lineEndX}
        y2={props.lineEndY}
        className={""}
        stroke={playerColor[props.NodeRoadOwner]}
        strokeWidth={4}
      />)
    }
  return;
}