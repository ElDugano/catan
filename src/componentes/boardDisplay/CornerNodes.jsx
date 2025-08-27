import { useContext } from 'react'
import { TurnStateContext } from "../../state/turnState/TurnStateContext";
import BuildSettlementButton from './BuildSettlementButton';
import Settlements from './Settlements';

export default function CornerNodes(props) {
  const {isTurnStateBuildingASettlement}= useContext(TurnStateContext);

  let boardContent=[];
  for (let x=1; x <= 12; x++) {
    for (let y=0; y <= 7; y++) {
      let centerX = x*30+30;
      let centerY = (x%2 !== 0 && y%2 == 0) || (x%2 == 0 && y%2 !== 0) ? y*50 : y*50+20;
      
      if(isTurnStateBuildingASettlement()){
        boardContent.push(<BuildSettlementButton
          x={x}
          y={y}
          centerX={centerX}
          centerY={centerY}
          key={crypto.randomUUID()}
          tileNodeClickFunction={props.tileNodeClickFunction}
          tileCornerNodes={props.tileCornerNodes} />);}

      boardContent.push(<Settlements
        x={x}
        y={y}
        centerX={centerX}
        centerY={centerY}
        key={crypto.randomUUID()}
        tileCornerNodes={props.tileCornerNodes}
        playerColor={props.playerColor}
      />)
    }
  }
  return (boardContent);
}