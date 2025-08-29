import { useContext } from 'react'
import { TurnStateContext } from "../../../state/turnState/TurnStateContext";

import { CurrentPlayerTurnContext } from '../../../state/currentPlayerTurn/CurrentPlayerTurnContext';
import { TileCornerNodesContext } from '../state/tileCornerNodes/TileCornerNodesContext.js';
import BuildSettlementButton from './BuildSettlementButton';
import Settlement from './Settlement';

export default function CornerNodes(props) {
  const {isTurnStateBuildingASettlement, isTurnStateBuildingACity}= useContext(TurnStateContext);
  const {currentPlayerTurn} = useContext(CurrentPlayerTurnContext);
  const {tileCornerNodes, isNodeValueSettlement, isNodeValueLand, setNodeValueToSettlement} = useContext(TileCornerNodesContext);

 

  function buildSettlement(x, y) {
    setNodeValueToSettlement(x, y,currentPlayerTurn);
    props.gameboardHelperFunction(x, y);
  }

  let boardContent=[];
  for (let x=1; x <= 12; x++) {
    for (let y=0; y <= 7; y++) {
      const centerX = x*30+30;
      const centerY = (x%2 !== 0 && y%2 == 0) || (x%2 == 0 && y%2 !== 0) ? y*50 : y*50+20;
      if(     isTurnStateBuildingASettlement() && 
              isNodeValueLand(x,y) &&
              tileCornerNodes[x+1][y].owner == "none" &&
              tileCornerNodes[x-1][y].owner == "none" &&
              (((x+y)%2 == 1 && tileCornerNodes[x][y-1].owner == "none") ||
               ((x+y)%2 == 0 && tileCornerNodes[x][y+1].owner == "none"))) {
        boardContent.push(
        <BuildSettlementButton
          centerX={centerX}
          centerY={centerY}
          key={crypto.randomUUID()}
          tileNodeClickFunction={() => buildSettlement(x, y)}

        />);}
      if(isNodeValueSettlement(x,y)) {
        boardContent.push(
        <Settlement
          centerX={centerX}
          centerY={centerY}
          owner={tileCornerNodes[x][y].owner}
          key={crypto.randomUUID()}
        />)}
      if(isTurnStateBuildingACity()) {
        console.log("CornerNodes Notice 1: Ready to build a city, but we don't have any code to support doing this.")
      }
      if(tileCornerNodes[x][y].value == "city") {
        console.log("CornerNodes Notice 2: Display a city, but we don't have code to support this.")
      }
    }
  }
  return (boardContent);
}