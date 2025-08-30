import { useContext } from 'react'
import { GameStateContext } from '../../../state/gameState/GameStateContext';
import { TurnStateContext } from "../../../state/turnState/TurnStateContext";

import { CurrentPlayerTurnContext } from '../../../state/currentPlayerTurn/CurrentPlayerTurnContext';
import { TileCornerNodesContext } from '../state/tileCornerNodes/TileCornerNodesContext.js';
import BuildSettlementButton from './BuildSettlementButton';
import BuildCityButton from './BuildCityButton.jsx';
import Settlement from './Settlement';
import City from './City.jsx';

export default function CornerNodes(props) {
  const {isGameStateBoardSetup}= useContext(GameStateContext);
  const {isTurnStateBuildingASettlement, isTurnStateBuildingACity}= useContext(TurnStateContext);
  const {currentPlayerTurn} = useContext(CurrentPlayerTurnContext);
  const {tileCornerNodes, isNodeValueSettlement, isNodeValueCity, isNodeValueLand, setNodeValueToSettlement, setNodeValueToCity} = useContext(TileCornerNodesContext);

 

  function buildSettlement(x, y) {
    setNodeValueToSettlement(x, y,currentPlayerTurn);
    props.GameboardFunctionBuildSettlement(x, y);
  }

  function buildCity(x, y) {
    console.log("We built a city.");
    setNodeValueToCity(x, y);
    props.GameboardFunctionBuildCity(x, y);
  }

  let boardContent=[];
  for (let x=1; x <= 12; x++) {
    for (let y=0; y <= 7; y++) {
      const centerX = x*30+30;
      const centerY = (x%2 !== 0 && y%2 == 0) || (x%2 == 0 && y%2 !== 0) ? y*50 : y*50+20;
      //Display a Build Settlment Button
      if( isTurnStateBuildingASettlement() && 
          isNodeValueLand(x,y) &&
            //Check to see if there is a city or settlement next to the node.
          tileCornerNodes[x+1][y].owner == "none" &&
          tileCornerNodes[x-1][y].owner == "none" &&
          ( ((x+y)%2 == 1 && tileCornerNodes[x][y-1].owner == "none") ||
            ((x+y)%2 == 0 && tileCornerNodes[x][y+1].owner == "none")) && (
            //Check if we are in the setup stage, or if not, if there is a connecting road.
          isGameStateBoardSetup() || 
          ( tileCornerNodes[x][y].rightRoadOwner == currentPlayerTurn ||
            tileCornerNodes[x-1][y].rightRoadOwner == currentPlayerTurn || (
              ((x+y)%2 == 1 && tileCornerNodes[x][y-1].bottomRoadOwner == currentPlayerTurn) ||
              ((x+y)%2 == 0 && tileCornerNodes[x][y].bottomRoadOwner == currentPlayerTurn)))))
      {
        boardContent.push(
          <BuildSettlementButton
            centerX={centerX}
            centerY={centerY}
            key={crypto.randomUUID()}
            tileNodeClickFunction={() => buildSettlement(x, y)}
          />
        );
      }
      if(isNodeValueSettlement(x,y)) {
//---------- Display a Build City Button ----------//
        if(isTurnStateBuildingACity() && tileCornerNodes[x][y].owner == currentPlayerTurn)
          boardContent.push(
            <BuildCityButton
              key={crypto.randomUUID()}
              centerX={centerX}
              centerY={centerY}
              owner={tileCornerNodes[x][y].owner}
              tileNodeClickFunction={() => buildCity(x, y)}
            />)
//---------- Display a Settlement ----------//
        else
          boardContent.push(
            <Settlement
              centerX={centerX}
              centerY={centerY}
              owner={tileCornerNodes[x][y].owner}
              key={crypto.randomUUID()}
            />);
      }
//---------- Display a City ----------//
      if(isNodeValueCity(x, y))
        boardContent.push(
          <City
            centerX={centerX}
            centerY={centerY}
            owner={tileCornerNodes[x][y].owner}
            key={crypto.randomUUID()}
          />);
    }
  }
  return (boardContent);
}