
import { useEffect, useContext } from "react";

import { GameStateContext } from "../../../state/gameState/GameStateContext";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext";

import { ScoreBoardContext } from "../../../state/scoreBoard/ScoreBoardContext";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerAvailableBuildingsContext } from "../../../state/playerAvailableBuildings/PlayerAvailableBuildingsContext";
import { PlayerResourceCardsContext } from "../../../state/playerResourceCards/PlayerResourceCardsContext";

import { TileCornerNodesContext } from "../../gameboard/state/tileCornerNodes/TileCornerNodesContext";
import { LandTilesContext } from "../../gameboard/state/landTiles/LandTilesContext";
import { PortOwnerContext } from "../../../state/portOwner/PortOwnerContext";

import checkIfSettlmentSplitLongestRoad from "../../gameboard/helpers/CheckIfSettlmentSplitLongestRoad";
import mapTileTypeToResourceType from "../../../helpers/turnState/MapTileTypeToResourceType";

import { NetworkingMessageSenderContext } from "./NetworkingMessageSenderContext";

const BuildSettlement = (props) => {
  const { isGameStateBoardSetup }= useContext(GameStateContext);
  const { setTurnStateToIdle, setClientTurnStateToBuildingARoad }= useContext(TurnStateContext);
  const { scorePoint, setLongestRoad, longestRoadOwner } = useContext(ScoreBoardContext);
  const { currentPlayerTurn, numberOfPlayers } = useContext(CurrentPlayerTurnContext);
  const { returnAvailableSettlements, removeSettlementFromAvailableBuildings } = useContext(PlayerAvailableBuildingsContext);
  const { addCollectionOfResourcesToPlayer, removePlayerResourcesToBuildSettlement }  = useContext(PlayerResourceCardsContext);
  const { tileCornerNodes, setNodeValueToSettlement } = useContext(TileCornerNodesContext);
  const { landTiles } = useContext(LandTilesContext);
  const { setPortOwner } = useContext(PortOwnerContext);
  const { addToMessagePayloadToPlayer, addToMessagePayloadToAllPlayers, sendTheMessages } = useContext(NetworkingMessageSenderContext);
  

  //This whole component is written as a test. It is currently not in use as of the time of writing this comment.
  //The current method to get this to be used is not the best practice because it causes rerenders for a simple function call.

  useEffect(() => {
    addToMessagePayloadToAllPlayers({header:"Building a Settlement"});
    addToMessagePayloadToAllPlayers(setNodeValueToSettlement(props.x, props.y, currentPlayerTurn));
    addToMessagePayloadToAllPlayers(scorePoint(currentPlayerTurn));
    if ("port" in tileCornerNodes[props.x][props.y]){
      addToMessagePayloadToAllPlayers(setPortOwner(currentPlayerTurn, tileCornerNodes[props.x][props.y].port));
    }
    addToMessagePayloadToAllPlayers(removeSettlementFromAvailableBuildings(props.x, props.y, currentPlayerTurn));
    addToMessagePayloadToAllPlayers({lastBuiltObject:{value: "Settlement", player:currentPlayerTurn,x: props.x, y: props.y}})//TODO, see if there is a better way to handle this.
    if (currentPlayerTurn != longestRoadOwner){
      checkIfSettlmentSplitLongestRoad(tileCornerNodes, props.x, props.y, longestRoadOwner, numberOfPlayers, setLongestRoad);
    }//TODO: Above with splitting the road needs to be sent and updated score, likely.
    if(isGameStateBoardSetup() && returnAvailableSettlements(currentPlayerTurn) == 3){
      let resourcesGained = {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0};
      if((props.x+props.y)%2 == 0) {
        if (landTiles[props.x] && landTiles[props.x][props.y-1]) resourcesGained[mapTileTypeToResourceType(landTiles[props.x][props.y-1])]++;
        if (landTiles[props.x-1] && landTiles[props.x-1][props.y]) resourcesGained[mapTileTypeToResourceType(landTiles[props.x-1][props.y])]++;
        if (landTiles[props.x+1] && landTiles[props.x+1][props.y]) resourcesGained[mapTileTypeToResourceType(landTiles[props.x+1][props.y])]++; }
      else {
        if (landTiles[props.x-1] && landTiles[props.x-1][props.y-1]) resourcesGained[mapTileTypeToResourceType(landTiles[props.x-1][props.y-1])]++;
        if (landTiles[props.x+1] && landTiles[props.x+1][props.y-1]) resourcesGained[mapTileTypeToResourceType(landTiles[props.x+1][props.y-1])]++;
        if (landTiles[props.x+1] && landTiles[props.x][props.y]) resourcesGained[mapTileTypeToResourceType(landTiles[props.x][props.y])]++;  }
      addToMessagePayloadToAllPlayers(addCollectionOfResourcesToPlayer(currentPlayerTurn, resourcesGained));
    }
    if(isGameStateBoardSetup()) {
      addToMessagePayloadToPlayer(setClientTurnStateToBuildingARoad(), currentPlayerTurn);
    }
    else{
      addToMessagePayloadToAllPlayers(removePlayerResourcesToBuildSettlement(currentPlayerTurn)); //Should be sent to just the player.
      addToMessagePayloadToPlayer(setTurnStateToIdle(), currentPlayerTurn);
    }
    sendTheMessages();
    props.destructer(null);
  }, [addCollectionOfResourcesToPlayer, addToMessagePayloadToAllPlayers, addToMessagePayloadToPlayer, currentPlayerTurn, isGameStateBoardSetup, landTiles, longestRoadOwner, numberOfPlayers, props, props.x, props.y, removePlayerResourcesToBuildSettlement, removeSettlementFromAvailableBuildings, returnAvailableSettlements, scorePoint, sendTheMessages, setClientTurnStateToBuildingARoad, setLongestRoad, setNodeValueToSettlement, setPortOwner, setTurnStateToIdle, tileCornerNodes])
  return
}

export default BuildSettlement;