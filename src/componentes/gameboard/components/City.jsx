import { useContext } from "react";
import { PlayerColorContext } from "../../../state/playerColor/PlayerColorContext";

export default function City(props) {
  const {getAPlayersColor} = useContext(PlayerColorContext);
    return (
      <path
        fill={getAPlayersColor(props.owner)}
        transform={"translate(" + (props.centerX-6.5) + "," + (props.centerY-8) + ")"} 
        d="M11 1H1V15H3V11H5V15H15V9H11V1ZM5 3H3V5H5V3ZM9 3H7V5H9V3ZM7 7H9V9H7V7ZM11 11H13V13H11V11Z"
      />
    );
}