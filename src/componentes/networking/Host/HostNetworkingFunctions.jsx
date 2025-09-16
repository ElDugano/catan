import { useContext, useState } from "react";

import NetworkingMessageReciever from "./NetworkingMessageReciever";

import { GameStateContext } from "../../../state/gameState/GameStateContext";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext";

import { ScoreBoardContext } from "../../../state/scoreBoard/ScoreBoardContext";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerAvailableBuildingsContext } from "../../../state/playerAvailableBuildings/PlayerAvailableBuildingsContext";
import { PlayerResourceCardsContext } from "../../../state/playerResourceCards/PlayerResourceCardsContext";
import { DiceContext } from "../../../state/dice/DiceContext";
import { DevelopmentCardsContext } from "../../../state/developmentCards/DevelopmentCardsContext";

import { TileCornerNodesContext } from "../../gameboard/state/tileCornerNodes/TileCornerNodesContext";
import { LandTilesContext } from "../../gameboard/state/landTiles/LandTilesContext";
import { PortOwnerContext } from "../../../state/portOwner/PortOwnerContext";
import { ThiefLocationContext } from "../../gameboard/state/thiefLocation/ThiefLocationContext";

import checkIfSettlmentSplitLongestRoad from "../../gameboard/helpers/CheckIfSettlmentSplitLongestRoad";
import mapTileTypeToResourceType from "../../../helpers/turnState/MapTileTypeToResourceType";

import { NetworkingMessageSenderContext } from "./NetworkingMessageSenderContext";
import findThePlayersLongestRoad from "../../gameboard/helpers/FindLongestRoad";

//import BuildSettlement from "./buildSettlement";

const HostNetworkingFunctions = () => {
  const { isGameStateBoardSetup, setGameStateToMainGame }= useContext(GameStateContext);
    //Currently gets stuck here because this isn't a react component. This is being called like a regular function
  const { setTurnStateToBuildingARoad,
            turnState,
          setTurnStateToIdle,
          setClientTurnStateToIdle,
          isTurnStateBuildingARoad,
          setClientTurnStateToBuildingARoad,
          isClientTurnStateBuildingARoad,
          setClientTurnStateToBuildingASettlement,
          isTurnStateRoadBuilderCardFirstRoad,
          isTurnStateRoadBuilderCardSecondRoad,
          setTurnStateToStartTurn,
          setTurnStateToRollingTheDice,
          setTurnStateToBuildingARoadLongestRoadCheck,
          setTurnStateToRoadBuilderCardFirstRoadLongestRoadCheck,
          isClientStateRoadBuilderCardFirstRoad,
          setTurnStateToRoadBuilderCarSecondRoadLongestRoadCheck,
          setTurnStateToGatheringResources,
          setTurnStateToRemoveHalfResources,
          setTurnStateToMoveTheThief,
          setTurnStateToRobAPlayer,
          isTurnStateRoadBuilderCardFirstRoadLongestRoadCheck,
          setTurnStateToRoadBuilderCardSecondRoad,
          isTurnStateRoadBuilderCardSecondRoadLongestRoadCheck }= useContext(TurnStateContext);

  const { scorePoint, checkIfLongestRoad, setLongestRoad, longestRoadOwner } = useContext(ScoreBoardContext);
  const { currentPlayerTurn,
          numberOfPlayers,
          gotoNextPlayerTurn,
          gotoPreviousPlayerTurn,
          nextPlayerTurn,
          previousPlayerTurn,
          isPlayerOrderArrayPositionEnd,
          isPlayerOrderArrayPositionStart } = useContext(CurrentPlayerTurnContext);
  const { returnUsedRoads,
          returnAvailableSettlements,
          removeSettlementFromAvailableBuildings,
          removeCityFromAvailableBuildings,
          removeRoadFromAvailableBuildings } = useContext(PlayerAvailableBuildingsContext);
  const { addCollectionOfResourcesToPlayer,
          removePlayerResourcesToBuildRoad,
          removePlayerResourcesToBuildSettlement,
          removePlayerResourcesToBuildCity,
          removePlayerResourcesToBuildDevelopmentCard,
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
  const { givePlayerDevelopmentCardFromDeck } = useContext(DevelopmentCardsContext);

  const { addToMessagePayloadToPlayer, addToMessagePayloadToAllPlayers, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  //This is a way I can place these functions in another file.
  //This creates unnessessary rerendering, however, so it doesn't seem like a better solution.
  //const [buildSettlementFunction, setBuildSettlementFunction] = useState(null);
  //const buildSettlement = (x, y) => {
  //  setBuildSettlementFunction(<BuildSettlement x={x} y={y} destructer={setBuildSettlementFunction} />);
  //}

  const buildSettlement = (x, y) => {
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
      addToMessagePayloadToPlayer(setClientTurnStateToBuildingARoad(), currentPlayerTurn);
    }
    else{
      addToMessagePayloadToAllPlayers(removePlayerResourcesToBuildSettlement(currentPlayerTurn)); //Should be sent to just the player.
      addToMessagePayloadToPlayer(setTurnStateToIdle(), currentPlayerTurn);
    }
    sendTheMessages();
  }

  const buildRoad = (x, y, direction, clientTurnState) => {
    console.log("We are checking the tileCornerNodes after building a road.")
    if (direction == "right")
      addToMessagePayloadToAllPlayers(setNodeRightRoadOwner(x, y, currentPlayerTurn));
    else// direction == down
      addToMessagePayloadToAllPlayers(setNodeBottomRoadOwner(x, y, currentPlayerTurn));
    addToMessagePayloadToAllPlayers(removeRoadFromAvailableBuildings(x, y, currentPlayerTurn));
    addToMessagePayloadToAllPlayers(setTurnStateToIdle());

    checkIfLongestRoad(findThePlayersLongestRoad(tileCornerNodes, currentPlayerTurn, returnUsedRoads(currentPlayerTurn)), currentPlayerTurn);
      //We will likely need to do a score check within that.
    if(isGameStateBoardSetup()){
      addToMessagePayloadToPlayer(setClientTurnStateToIdle(), currentPlayerTurn);
      setTurnStateToIdle();
      if(returnAvailableSettlements(currentPlayerTurn) == 4 && isPlayerOrderArrayPositionEnd()) {
        addToMessagePayloadToPlayer(setClientTurnStateToBuildingASettlement(), currentPlayerTurn);
        console.log("Time to reverse course");
      }
      else if(returnAvailableSettlements(currentPlayerTurn) == 4) {
        addToMessagePayloadToPlayer(setClientTurnStateToBuildingASettlement(), nextPlayerTurn());
        addToMessagePayloadToAllPlayers(gotoNextPlayerTurn());
        console.log("moving forward");
      }
      else if(returnAvailableSettlements(currentPlayerTurn) == 3 && !isPlayerOrderArrayPositionStart()) {
        addToMessagePayloadToPlayer(setClientTurnStateToBuildingASettlement(), previousPlayerTurn());
        addToMessagePayloadToAllPlayers(gotoPreviousPlayerTurn());
        console.log("moving backwards");
      }
      else {
        console.log("^^^^START THE GAME^^^^");
        addToMessagePayloadToAllPlayers(setGameStateToMainGame());
        addToMessagePayloadToPlayer(setTurnStateToStartTurn(), currentPlayerTurn);//Should this only be sent to plater to start?
      }
    }
    //else if(isClientStateRoadBuilderCardFirstRoad(clientTurnState))//Below not implemented yet.
    //  addToMessagePayloadToAllPlayers(setTurnStateToRoadBuilderCardSecondRoad());
    //else if (isTurnStateRoadBuilderCardSecondRoadLongestRoadCheck())
    //  addToMessagePayloadToAllPlayers(setTurnStateToIdle());
    else {
    //  addToMessagePayloadToPlayer(setTurnStateToIdle(), currentPlayerTurn);
      addToMessagePayloadToPlayer(removePlayerResourcesToBuildRoad(currentPlayerTurn));
    }
    sendTheMessages();
  }

  const buildCity = (x, y) => {
    addToMessagePayloadToAllPlayers(setNodeValueToCity(x, y));
    addToMessagePayloadToAllPlayers(scorePoint(currentPlayerTurn));
    addToMessagePayloadToAllPlayers(removeCityFromAvailableBuildings(x, y, currentPlayerTurn));
    addToMessagePayloadToAllPlayers(removePlayerResourcesToBuildCity(currentPlayerTurn));
    addToMessagePayloadToPlayer(setTurnStateToIdle(), currentPlayerTurn);

    sendTheMessages();
  }

  const buyDevelopmentCard = () => {
    addToMessagePayloadToPlayer(givePlayerDevelopmentCardFromDeck(currentPlayerTurn), currentPlayerTurn);
    addToMessagePayloadToPlayer(removePlayerResourcesToBuildDevelopmentCard(currentPlayerTurn), currentPlayerTurn);
    addToMessagePayloadToPlayer(setTurnStateToIdle(), currentPlayerTurn);
    //Something should be in here about returning what card they just got.
    //That can end up being some kind of state, an object, which is used when players actually get resources.
    //Like, it basically makes a pop up that you can close. Maybe also have things like it closes at the start of a new turn.
    //Or something similar.
    //This would also get called when you rob someone.
    sendTheMessages();
  }

  const rollTheDice = () => {
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
      buildCity = {buildCity}
      buyDevelopmentCard = {buyDevelopmentCard}
      rollTheDice = {rollTheDice}
      removeHalfResources = {removeHalfResources}
      moveTheThief = {moveTheThief}
      stealACard = {stealACard}
      nobodyToRob = {nobodyToRob}
      endTurn = {endTurn}

      cheat = {cheat}
    />
    {/*buildSettlementFunction*/}
  </>
  );
}

export default HostNetworkingFunctions;