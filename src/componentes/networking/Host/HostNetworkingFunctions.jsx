import { useContext } from "react";

import NetworkingMessageReciever from "./NetworkingMessageReciever";

import { GameStateContext } from "../../../state/gameState/GameStateContext";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext";

import { ScoreBoardContext } from "../../../state/scoreBoard/ScoreBoardContext";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerAvailableBuildingsContext } from "../../../state/playerAvailableBuildings/PlayerAvailableBuildingsContext";
import { PlayerResourceCardsContext } from "../../../state/playerResourceCards/PlayerResourceCardsContext";

import { TileCornerNodesContext } from "../../gameboard/state/tileCornerNodes/TileCornerNodesContext";
import { LandTilesContext } from "../../gameboard/state/landTiles/LandTilesContext";
import { PortOwnerContext } from "../../../state/portOwner/PortOwnerContext";

import checkIfSettlmentSplitLongestRoad from "../../gameboard/helpers/checkIfSettlmentSplitLongestRoad";
import mapTileTypeToResourceType from "../../../helpers/turnState/MapTileTypeToResourceType";

import { NetworkingMessageSenderContext } from "./NetworkingMessageSenderContext";

const HostNetworkingFunctions = () => {
  const { isGameStateBoardSetup }= useContext(GameStateContext);
    //Currently gets stuck here because this isn't a react component. This is being called like a regular function
  const { setTurnStateToBuildingARoad,
          setTurnStateToIdle }= useContext(TurnStateContext);

  const { scorePoint, setLongestRoad, longestRoadOwner } = useContext(ScoreBoardContext);
  const { currentPlayerTurn, numberOfPlayers } = useContext(CurrentPlayerTurnContext);
  const { returnAvailableSettlements,
          removeSettlementFromAvailableBuildings } = useContext(PlayerAvailableBuildingsContext);
  const { addCollectionOfResourcesToPlayer,
          removePlayerResourcesToBuildSettlement}  = useContext(PlayerResourceCardsContext);

  const { tileCornerNodes, setNodeValueToSettlement } = useContext(TileCornerNodesContext);
  const { landTiles } = useContext(LandTilesContext);
  const { setPortOwner } = useContext(PortOwnerContext);

  const { addToMessagePayloadToPlayer, addToMessagePayloadToAllPlayers, sendTheMessages } = useContext(NetworkingMessageSenderContext);


  const buildSettlement = (x, y) => {
    console.log("We got told to build a settlment at x: "+x+" y:"+y);
    addToMessagePayloadToAllPlayers({header:"Building a Settlement"});
    addToMessagePayloadToAllPlayers(setNodeValueToSettlement(x, y, currentPlayerTurn));
    addToMessagePayloadToAllPlayers(scorePoint(currentPlayerTurn));
    if ("port" in tileCornerNodes[x][y]){
      addToMessagePayloadToAllPlayers(setPortOwner(currentPlayerTurn, tileCornerNodes[x][y].port));
    }
    addToMessagePayloadToAllPlayers(removeSettlementFromAvailableBuildings(x, y, currentPlayerTurn));
    addToMessagePayloadToAllPlayers({lastBuiltObject:{value: "Settlement", player:currentPlayerTurn,x: x, y: y}})//TODO, see if there is a better way to handle this.
    if (currentPlayerTurn != longestRoadOwner){
      checkIfSettlmentSplitLongestRoad(tileCornerNodes, x, y, longestRoadOwner, numberOfPlayers, setLongestRoad);
    }//TODO: Above with splitting the road needs to be sent and updated score, likely.
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
      addToMessagePayloadToAllPlayers(addCollectionOfResourcesToPlayer(currentPlayerTurn, resourcesGained));
    }
    if(isGameStateBoardSetup()) {
      setTurnStateToBuildingARoad();
      addToMessagePayloadToPlayer({turnState:"Building a road"}, currentPlayerTurn) //TODO: THIS SHOULD BE UPDATED SO THE FUNCTION RETURNS THIS
    }
    else{
      removePlayerResourcesToBuildSettlement(currentPlayerTurn);
      setTurnStateToIdle();
    }
    console.log("That was pretty cool, actually. I should tell all the other players about this!");
    sendTheMessages();
  }

  return (
  <>
    <NetworkingMessageReciever
      buildSettlement={buildSettlement}
    />
  </>
  );
}

export default HostNetworkingFunctions;