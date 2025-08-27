import { useContext } from "react";
import { PlayerColorContext } from "../../state/playerColor/PlayerColorContext";

export default function Settlements(props) {
  const {playerColor} = useContext(PlayerColorContext);
      let translateValue = "translate(" + (props.centerX-6.5) + "," + (props.centerY-7) + ") scale(.05)";
      if(props.tileCornerNodes[props.x][props.y].value == "Settlement") {
        return (
          <path
            id={"tileCornerSettlement-"+props.x+"-"+props.y}
            key={crypto.randomUUID()}
            fill={playerColor[props.tileCornerNodes[props.x][props.y].owner]}
            transform={translateValue} 
            d="M224,115.53906V208a16.01833,16.01833,0,0,1-16,16H48a16.01833,16.01833,0,0,1-16-16V115.53857a16.03346,16.03346,0,0,1,5.23633-11.83837l79.99414-72.73438a15.93607,15.93607,0,0,1,21.52637-.001l80.00683,72.73536.001.001A16.03466,16.03466,0,0,1,224,115.53906Z"
          />
        );
      }
  return;
}