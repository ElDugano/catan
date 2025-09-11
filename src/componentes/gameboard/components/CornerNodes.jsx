import { useContext } from 'react'
import { GameStateContext } from '../../../state/gameState/GameStateContext';
import { TurnStateContext } from "../../../state/turnState/TurnStateContext";

import { CurrentPlayerTurnContext } from '../../../state/currentPlayerTurn/CurrentPlayerTurnContext';
import { TileCornerNodesContext } from '../state/tileCornerNodes/TileCornerNodesContext.js';
import BuildSettlementButton from './BuildSettlementButton';
import BuildCityButton from './BuildCityButton.jsx';
import Settlement from './Settlement';
import City from './City.jsx';

import { PlayerResourceCardsContext } from "../../../state/playerResourceCards/PlayerResourceCardsContext.js";
import { PlayerAvailableBuildingsContext } from "../../../state/playerAvailableBuildings/PlayerAvailableBuildingsContext.js";
import { ScoreBoardContext } from "../../../state/scoreBoard/ScoreBoardContext.js";
import { PortOwnerContext } from "../../../state/portOwner/PortOwnerContext.js";
import { LandTilesContext } from '../state/landTiles/LandTilesContext.js';

import checkIfSettlmentSplitLongestRoad from "../helpers/checkIfSettlmentSplitLongestRoad.jsx";
import mapTileTypeToResourceType from '../../../helpers/turnState/MapTileTypeToResourceType.jsx';

import { NetworkingMessageSenderContext } from '../../networking/Host/NetworkingMessageSenderContext.js';

export default function CornerNodes() {
  const {isGameStateBoardSetup}= useContext(GameStateContext);
  const { isTurnStateBuildingASettlement,
          isTurnStateBuildingACity,
          setTurnStateToBuildingARoad,
          setTurnStateToIdle }= useContext(TurnStateContext);

  const {currentPlayerTurn, numberOfPlayers, isClientPlayersTurn} = useContext(CurrentPlayerTurnContext);
  const {tileCornerNodes, isNodeValueSettlement, isNodeValueCity, isNodeValueLand, setNodeValueToSettlement, setNodeValueToCity} = useContext(TileCornerNodesContext);

  const { scorePoint, setLongestRoad, longestRoadOwner } = useContext(ScoreBoardContext);
  const { setPortOwner } = useContext(PortOwnerContext);
  const { returnAvailableSettlements,
          removeSettlementFromAvailableBuildings,
          removeCityFromAvailableBuildings } = useContext(PlayerAvailableBuildingsContext);
  const { addCollectionOfResourcesToPlayer,
          removePlayerResourcesToBuildSettlement,
          removePlayerResourcesToBuildCity } = useContext(PlayerResourceCardsContext);
  const { landTiles } = useContext(LandTilesContext);

  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  function buildSettlement(x, y) {
    addToMessagePayloadToHost({buildSettlement:{x:x,y:y}});
    sendTheMessages();
    setNodeValueToSettlement(x, y,currentPlayerTurn);
    scorePoint(currentPlayerTurn);
    if ("port" in tileCornerNodes[x][y]){
      setPortOwner(currentPlayerTurn, tileCornerNodes[x][y].port);
    }
    removeSettlementFromAvailableBuildings(x, y, currentPlayerTurn);
    if (currentPlayerTurn != longestRoadOwner){
      checkIfSettlmentSplitLongestRoad(tileCornerNodes, x, y, longestRoadOwner, numberOfPlayers, setLongestRoad);
    }
    if(isGameStateBoardSetup() && returnAvailableSettlements(currentPlayerTurn) == 3){
      let resourcesGained = {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0};
      if((x+y)%2 == 0) {
        if (landTiles[x] && landTiles[x][y-1]) resourcesGained[mapTileTypeToResourceType(landTiles[x][y-1])]++;
        if (landTiles[x-1] && landTiles[x-1][y]) resourcesGained[mapTileTypeToResourceType(landTiles[x-1][y])]++;
        if (landTiles[x+1] && landTiles[x+1][y]) resourcesGained[mapTileTypeToResourceType(landTiles[x+1][y])]++; }
      else {
        if (landTiles[x-1] && landTiles[x-1][y-1]) resourcesGained[mapTileTypeToResourceType(landTiles[x-1][y-1])]++;
        if (landTiles[x+1] && landTiles[x+1][y-1]) resourcesGained[mapTileTypeToResourceType(landTiles[x+1][y-1])]++;
        if (landTiles[x+1] && landTiles[x][y]) resourcesGained[mapTileTypeToResourceType(landTiles[x][y])]++;  }
      addCollectionOfResourcesToPlayer(currentPlayerTurn, resourcesGained);
    }
    if(isGameStateBoardSetup())
      setTurnStateToBuildingARoad();
    else{
      removePlayerResourcesToBuildSettlement(currentPlayerTurn);
      setTurnStateToIdle();
    }
  }

  function buildCity(x, y) {
    setNodeValueToCity(x, y);
    scorePoint(currentPlayerTurn);
    removeCityFromAvailableBuildings(x, y, currentPlayerTurn);
    removePlayerResourcesToBuildCity(currentPlayerTurn);
    setTurnStateToIdle();
  }

  let boardContent=[];
  for (let x=1; x <= 12; x++) {
    for (let y=0; y <= 7; y++) {
      const centerX = x*30+30;
      const centerY = (x%2 !== 0 && y%2 == 0) || (x%2 == 0 && y%2 !== 0) ? y*50 : y*50+20;
      //Display a Build Settlment Button
      if( isClientPlayersTurn() &&
          isTurnStateBuildingASettlement() && 
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