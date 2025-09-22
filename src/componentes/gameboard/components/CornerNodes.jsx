import { useContext, useEffect } from 'react'
import { GameStateContext } from '../../../state/gameState/GameStateContext';
import { TurnStateContext } from "../../../state/turnState/TurnStateContext";

import { PlayerAvailableBuildingsContext } from '../../../state/playerAvailableBuildings/PlayerAvailableBuildingsContext.js';
import { CurrentPlayerTurnContext } from '../../../state/currentPlayerTurn/CurrentPlayerTurnContext';
import { TileCornerNodesContext } from '../state/tileCornerNodes/TileCornerNodesContext.js';
import BuildSettlementButton from './BuildSettlementButton';
import BuildCityButton from './BuildCityButton.jsx';
import Settlement from './Settlement';
import City from './City.jsx';

import { NetworkingMessageSenderContext } from '../../networking/Host/NetworkingMessageSenderContext.js';

export default function CornerNodes() {
  const { isGameStateBoardSetup }= useContext(GameStateContext);
  const { isTurnStateBuildingASettlement,
          isTurnStateBuildingACity }= useContext(TurnStateContext);

  const { buildSettlementPlacementAvailable,
          setBuildSettlementPlacementAvailable,
          buildCityPlacementAvailable,
          setABuildCityPlacementAvailable } = useContext(PlayerAvailableBuildingsContext)
  const { currentPlayerTurn, isClientPlayersTurn } = useContext(CurrentPlayerTurnContext);
  const { tileCornerNodes, isNodeValueSettlement, isNodeValueCity, isNodeValueLand } = useContext(TileCornerNodesContext);

  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  function buildSettlement(x, y) {
    addToMessagePayloadToHost({header: "Building a Settlement"});
    addToMessagePayloadToHost({buildSettlement:{x:x,y:y}});
    sendTheMessages();
  }

  function buildCity(x, y) {
    addToMessagePayloadToHost({header: "Building a City"});
    addToMessagePayloadToHost({buildCity:{x:x,y:y}});
    sendTheMessages();
  }

  let checkBuildSettlementPlacementAvailable = false;
  let checkBuildCityPlacementAvailable = false;

  let buildSettlementButtonClass = "hideBuildSettlementButton";
  if (isClientPlayersTurn() && isTurnStateBuildingASettlement() )
    buildSettlementButtonClass = "";
  let buildCityButtonClass = "hideBuildCityButton";
  if (isClientPlayersTurn() && isTurnStateBuildingACity() )
    buildCityButtonClass = "";

  let boardContent=[];
  for (let x=1; x <= 12; x++) {
    for (let y=0; y <= 7; y++) {
      const centerX = x*30+30;
      const centerY = (x%2 !== 0 && y%2 == 0) || (x%2 == 0 && y%2 !== 0) ? y*50 : y*50+20;
      //Display a Build Settlment Button
      if( isNodeValueLand(x,y) &&
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
        checkBuildSettlementPlacementAvailable = true;
        boardContent.push(
          <BuildSettlementButton
            class = {buildSettlementButtonClass}
            centerX={centerX}
            centerY={centerY}
            key={crypto.randomUUID()}
            tileNodeClickFunction={() => buildSettlement(x, y)}
          />
        );
      }
      if(  isNodeValueSettlement(x,y) ) {
//---------- Display a Build City Button ----------//
        if(tileCornerNodes[x][y].owner == currentPlayerTurn) {
          checkBuildCityPlacementAvailable = true;
          boardContent.push(
            <BuildCityButton
              class = {buildCityButtonClass}
              key={crypto.randomUUID()}
              centerX={centerX}
              centerY={centerY}
              owner={tileCornerNodes[x][y].owner}
              tileNodeClickFunction={() => buildCity(x, y)}
            />)}
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

  useEffect(()=>{
    if( checkBuildSettlementPlacementAvailable != buildSettlementPlacementAvailable )
    setBuildSettlementPlacementAvailable(checkBuildSettlementPlacementAvailable);
  if( checkBuildCityPlacementAvailable != buildCityPlacementAvailable )
    setABuildCityPlacementAvailable(checkBuildCityPlacementAvailable);
  })
  return (boardContent);
}