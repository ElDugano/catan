import { useContext } from "react";

import NetworkingMessageReciever from "./NetworkingMessageReciever";

import { GameStateContext } from "../../../state/gameState/GameStateContext";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext";

import { ScoreBoardContext } from "../../../state/scoreBoard/ScoreBoardContext";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerAvailableBuildingsContext } from "../../../state/playerAvailableBuildings/PlayerAvailableBuildingsContext";
import { PlayerResourceCardsContext } from "../../../state/playerResourceCards/PlayerResourceCardsContext";
import { DiceContext } from "../../../state/dice/DiceContext";

import { TileCornerNodesContext } from "../../gameboard/state/tileCornerNodes/TileCornerNodesContext";
import { LandTilesContext } from "../../gameboard/state/landTiles/LandTilesContext";
import { PortOwnerContext } from "../../../state/portOwner/PortOwnerContext";
import { ThiefLocationContext } from "../../gameboard/state/thiefLocation/ThiefLocationContext";

import checkIfSettlmentSplitLongestRoad from "../../gameboard/helpers/CheckIfSettlmentSplitLongestRoad";
import mapTileTypeToResourceType from "../../../helpers/turnState/MapTileTypeToResourceType";

import { NetworkingMessageSenderContext } from "./NetworkingMessageSenderContext";

const HostNetworkingFunctions = () => {
  const { isGameStateBoardSetup }= useContext(GameStateContext);
    //Currently gets stuck here because this isn't a react component. This is being called like a regular function
  const { setTurnStateToBuildingARoad,
            turnState,
          setTurnStateToIdle,
          isTurnStateBuildingARoad,
          isTurnStateRoadBuilderCardFirstRoad,
          isTurnStateRoadBuilderCardSecondRoad,
          setTurnStateToStartTurn,
          setTurnStateToRollingTheDice,
          setTurnStateToBuildingARoadLongestRoadCheck,
          setTurnStateToRoadBuilderCardFirstRoadLongestRoadCheck,
          setTurnStateToRoadBuilderCarSecondRoadLongestRoadCheck,
          setTurnStateToGatheringResources,
          setTurnStateToRemoveHalfResources,
          setTurnStateToMoveTheThief,
          setTurnStateToRobAPlayer }= useContext(TurnStateContext);

  const { scorePoint, setLongestRoad, longestRoadOwner } = useContext(ScoreBoardContext);
  const { currentPlayerTurn, numberOfPlayers, gotoNextPlayerTurn } = useContext(CurrentPlayerTurnContext);
  const { returnAvailableSettlements,
          removeSettlementFromAvailableBuildings,
          removeCityFromAvailableBuildings,
          removeRoadFromAvailableBuildings } = useContext(PlayerAvailableBuildingsContext);
  const { addCollectionOfResourcesToPlayer,
          removePlayerResourcesToBuildSettlement,
          removePlayerResourcesToBuildCity,
          findAndSetDiscardHalfResourcesPlayers,
          findAndSetDiscardHalfResourcesCardAmount,
          updateDiscardHalfResourcesPlayers,
          removeCollectionOfResourcesFromPlayer,
          setAndReturnRobbingTargetPlayers,
          stealRandomCardFromPlayer }  = useContext(PlayerResourceCardsContext);

  const { tileCornerNodes,
          setNodeValueToSettlement,
          setNodeValueToCity,
          setNodeRightRoadOwner,
          setNodeBottomRoadOwner,
          isNodeValueSettlement,
          isNodeValueCity,
          getTileNodeOwner } = useContext(TileCornerNodesContext);
  const { landTiles } = useContext(LandTilesContext);
  const { setPortOwner } = useContext(PortOwnerContext);
  const { setAndReturnThiefLocation } = useContext(ThiefLocationContext);
  const { rollDice, setDice, haveDiceBeenRolledThisTurn, setDiceRolledThisTurn } = useContext(DiceContext);

  const { /*addToMessagePayloadToPlayer,*/ addToMessagePayloadToAllPlayers, sendTheMessages } = useContext(NetworkingMessageSenderContext);


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
      addToMessagePayloadToAllPlayers(setTurnStateToBuildingARoad());
    }
    else{
      removePlayerResourcesToBuildSettlement(currentPlayerTurn);
      setTurnStateToIdle();
    }
    sendTheMessages();
  }

  const buildRoad = (x, y, direction) => {
    console.log("Building a road.");
    if (direction == "right")
      addToMessagePayloadToAllPlayers(setNodeRightRoadOwner(x, y, currentPlayerTurn));
    else
      addToMessagePayloadToAllPlayers(setNodeBottomRoadOwner(x, y, currentPlayerTurn));
    addToMessagePayloadToAllPlayers(removeRoadFromAvailableBuildings(x, y, currentPlayerTurn));
    if (isTurnStateBuildingARoad())
      setTurnStateToBuildingARoadLongestRoadCheck();
    if(isTurnStateRoadBuilderCardFirstRoad())
      setTurnStateToRoadBuilderCardFirstRoadLongestRoadCheck();
    if(isTurnStateRoadBuilderCardSecondRoad())
      setTurnStateToRoadBuilderCarSecondRoadLongestRoadCheck();
    //sendTheMessages();
    console.log("This is the turnState: ", turnState);
  }

  const buildCity = (x, y) => {
    console.log("Got to this part of building a city.")
    addToMessagePayloadToAllPlayers(setNodeValueToCity(x, y));
    console.log("1");
    addToMessagePayloadToAllPlayers(scorePoint(currentPlayerTurn));
    console.log("2");
    addToMessagePayloadToAllPlayers(removeCityFromAvailableBuildings(x, y, currentPlayerTurn));
    console.log("3");
    addToMessagePayloadToAllPlayers(removePlayerResourcesToBuildCity(currentPlayerTurn));
    console.log("4");
    addToMessagePayloadToAllPlayers(setTurnStateToIdle());
    console.log("5");
    sendTheMessages();
  }

  const rollTheDice = () => {
      //Notice, we are not passing the dice roll to the players, they probably don't need it.
    if (rollDice() != 7){
      addToMessagePayloadToAllPlayers(setTurnStateToGatheringResources());
    }
    else {
      const discardHalfResourcePlayers = findAndSetDiscardHalfResourcesPlayers();
      if(discardHalfResourcePlayers.discardHalfResourcesPlayers.every(val => val === false)) {
        addToMessagePayloadToAllPlayers(setTurnStateToMoveTheThief());
      }
      else {
        addToMessagePayloadToAllPlayers(setTurnStateToRemoveHalfResources());
        addToMessagePayloadToAllPlayers(discardHalfResourcePlayers);
        addToMessagePayloadToAllPlayers(findAndSetDiscardHalfResourcesCardAmount());
      }

    }
    addToMessagePayloadToAllPlayers({setDiceRolledThisTurn:true});
    sendTheMessages();
  }

  const removeHalfResources = (player, discardingResources) => {
    addToMessagePayloadToAllPlayers(removeCollectionOfResourcesFromPlayer(player, discardingResources));
    let newDiscardHalfResourcesPlayers = updateDiscardHalfResourcesPlayers(player);
    if(newDiscardHalfResourcesPlayers.discardHalfResourcesPlayers.every(val => val === false)) {
      console.log("Okay, we done now.");
      addToMessagePayloadToAllPlayers(setTurnStateToMoveTheThief());
    }
    else {
      console.log("Not done yet.");
      addToMessagePayloadToAllPlayers(newDiscardHalfResourcesPlayers);
    }
    sendTheMessages();
  }

  const moveTheThief = (xCoordinate, yCoordinate) => {
    addToMessagePayloadToAllPlayers(setAndReturnThiefLocation({x:xCoordinate, y:yCoordinate}));
    let robbingTargetPlayers = new Array(false,false,false,false);
    for (let x = xCoordinate - 1; x <= xCoordinate + 1; x++) {
      for (let y = yCoordinate; y <= yCoordinate + 1; y++) {
        if (isNodeValueSettlement(x,y) || isNodeValueCity(x,y))
          robbingTargetPlayers[getTileNodeOwner(x,y)] = true;
      }
    }
    addToMessagePayloadToAllPlayers(setAndReturnRobbingTargetPlayers(robbingTargetPlayers));
    addToMessagePayloadToAllPlayers(setTurnStateToRobAPlayer());
    sendTheMessages();
  }

  const stealACard = (victimPlayer) => {
    console.log(currentPlayerTurn, victimPlayer);
    addToMessagePayloadToAllPlayers(stealRandomCardFromPlayer(currentPlayerTurn, victimPlayer));
    if (haveDiceBeenRolledThisTurn())
      addToMessagePayloadToAllPlayers(setTurnStateToIdle());
    else
      addToMessagePayloadToAllPlayers(setTurnStateToRollingTheDice());
    sendTheMessages();
  }

  const nobodyToRob = () => {
    addToMessagePayloadToAllPlayers(setTurnStateToIdle());
    sendTheMessages();
  }

  const endTurn = () => {
    addToMessagePayloadToAllPlayers(gotoNextPlayerTurn());
    addToMessagePayloadToAllPlayers(setTurnStateToStartTurn());
    sendTheMessages();
  }

  const cheat = (cheatType) => {
    console.log(cheatType);
    if (cheatType == "Give Resources To Current Player") {
      console.log("We are going to cheat real quickly here.");
      addToMessagePayloadToAllPlayers(addCollectionOfResourcesToPlayer(currentPlayerTurn,{Wool:5, Lumber:5, Grain:5, Brick:5, Ore:5}));
    }
    if (cheatType == "Roll 7") {
      setDice([3,4]);
      const discardHalfResourcePlayers = findAndSetDiscardHalfResourcesPlayers();
      if(discardHalfResourcePlayers.discardHalfResourcesPlayers.every(val => val === false)) {
        addToMessagePayloadToAllPlayers(setTurnStateToMoveTheThief());
      }
      else {
        addToMessagePayloadToAllPlayers(setTurnStateToRemoveHalfResources());
        addToMessagePayloadToAllPlayers(discardHalfResourcePlayers);
        addToMessagePayloadToAllPlayers(findAndSetDiscardHalfResourcesCardAmount());
      }
      setDiceRolledThisTurn(true);
      addToMessagePayloadToAllPlayers({setDiceRolledThisTurn:true});
    }
    
    sendTheMessages();
  }

  return (
  <>
    <NetworkingMessageReciever
      buildSettlement = {buildSettlement}
      buildRoad = {buildRoad}
      rollTheDice = {rollTheDice}
      removeHalfResources = {removeHalfResources}
      moveTheThief = {moveTheThief}
      stealACard = {stealACard}
      nobodyToRob = {nobodyToRob}
      endTurn = {endTurn}
      buildCity = {buildCity}

      cheat = {cheat}
    />
  </>
  );
}

export default HostNetworkingFunctions;