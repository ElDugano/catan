import { useContext } from 'react'
import { TurnStateContext } from "../../state/turnState/TurnStateContext";
import { LastBuiltObjectContext } from '../../state/lastBuiltObject/LastBuiltObjectContext';
import { CurrentPlayerTurnContext } from '../../state/currentPlayerTurn/CurrentPlayerTurnContext';
import BuildSettlementButton from './BuildSettlementButton';
import Settlement from './Settlement';

export default function CornerNodes(props) {
  const {isTurnStateBuildingASettlement}= useContext(TurnStateContext);
  const {recordSettlementBuilt}= useContext(LastBuiltObjectContext);
  const {currentPlayerTurn} = useContext(CurrentPlayerTurnContext);

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
          tileNodeClickFunction={() => (props.tileNodeClickFunction(x,y, recordSettlementBuilt(currentPlayerTurn, x, y)))}
          tileCornerNodes={props.tileCornerNodes} />);}

      boardContent.push(<Settlement
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