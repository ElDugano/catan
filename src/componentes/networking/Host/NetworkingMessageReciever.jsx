import { useContext, useEffect } from "react";
import { NetworkingContext } from "../State/NetworkingContext";

import { GameStateContext } from "../../../state/gameState/GameStateContext";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext";

import { LandTileNumbersContext } from "../../gameboard/state/landTileNumbers/LandTileNumbersContext";
import { LandTilesContext } from "../../gameboard/state/landTiles/LandTilesContext";
import { PortTilesContext } from "../../gameboard/state/portTiles/PortTilesContext";
import { ThiefLocationContext } from "../../gameboard/state/thiefLocation/ThiefLocationContext";
import { TileCornerNodesContext } from "../../gameboard/state/tileCornerNodes/TileCornerNodesContext";

import { ScoreBoardContext } from "../../../state/scoreBoard/ScoreBoardContext";

import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PortOwnerContext } from "../../../state/portOwner/PortOwnerContext";
import { PlayerAvailableBuildingsContext } from "../../../state/playerAvailableBuildings/PlayerAvailableBuildingsContext";
import { PlayerResourceCardsContext } from "../../../state/playerResourceCards/PlayerResourceCardsContext";
import { DevelopmentCardsContext } from "../../../state/developmentCards/DevelopmentCardsContext";
import { DiceContext } from "../../../state/dice/DiceContext";

const NetworkingMessageReciever = (props) => {
  const { recievedMessages, clearMessage, recievedMessagesPlayer } = useContext(NetworkingContext);
  const { setGameState } = useContext(GameStateContext);  //Now, to simplify, we might just use setStates, not helper functions.
  const { setTurnState } = useContext(TurnStateContext);

  const { setLandTileNumbers } = useContext(LandTileNumbersContext);
  const { setLandTiles, setDesertLocation} = useContext(LandTilesContext);
  const { setPortTiles } = useContext(PortTilesContext);
  const { setThiefLocation } = useContext(ThiefLocationContext);
  const { setTileCornerNodes } = useContext(TileCornerNodesContext);

  const { setScoreBoard } = useContext(ScoreBoardContext);
  const { setPortOwner } = useContext(PortOwnerContext);
  const { setPlayerAvailableBuildings, setLastBuiltObject } = useContext(PlayerAvailableBuildingsContext);
  const { setPlayerResourceCards,
          setDiscardHalfResourcesPlayers,
          setDiscardHalfResourcesCardAmount,
          setRobbingTargetPlayers } = useContext(PlayerResourceCardsContext);
  const { setPlayerDevelopmentCardJustPurchased, setPlayerDevelopmentCardHand } = useContext(DevelopmentCardsContext);
  const { setDiceRolledThisTurn } = useContext(DiceContext);

  const { setCurrentPlayerTurn, setupClientPlayerOrder, setClientPlayerNumber } = useContext(CurrentPlayerTurnContext);

  useEffect(() => {
    if (recievedMessages != null) {
      console.log("Recieved the below message in the Reciever:")
      console.log('Received:', recievedMessages);
      console.log("This was sent from Player: "+recievedMessagesPlayer)
        if (typeof recievedMessages === 'object'){
          switch (recievedMessages.header) {
            case "Board Setup":
              console.log*("Did we get into the board game setup stage?")
            break;
            case "Building a Settlement":
              console.log("We are building a settlement.")
            break;
          }
          "landTileNumbers"           in recievedMessages && setLandTileNumbers(recievedMessages.landTileNumbers);
          "landTiles"                 in recievedMessages && setLandTiles(recievedMessages.landTiles);
          "desertLocation"            in recievedMessages && setDesertLocation(recievedMessages.desertLocation);
          "portTiles"                 in recievedMessages && setPortTiles(recievedMessages.portTiles);
          "thiefLocation"             in recievedMessages && setThiefLocation(recievedMessages.thiefLocation);
          "tileCornerNodes"           in recievedMessages && setTileCornerNodes(recievedMessages.tileCornerNodes);
          "setupClientPlayerOrder"    in recievedMessages && setupClientPlayerOrder(recievedMessages.setupClientPlayerOrder);
          "clientPlayerNumber"        in recievedMessages && setClientPlayerNumber(recievedMessages.clientPlayerNumber);
          "currentPlayerTurn"         in recievedMessages && setCurrentPlayerTurn(recievedMessages.currentPlayerTurn);
          "buildSettlement"           in recievedMessages && props.buildSettlement(recievedMessages.buildSettlement.x, recievedMessages.buildSettlement.y)
          "scoreBoard"                in recievedMessages && setScoreBoard(recievedMessages.scoreBoard);
          "standardPortOwner"         in recievedMessages && setPortOwner(recievedMessages.orePortOwner, "Standard");
          "woolPortOwner"             in recievedMessages && setPortOwner(recievedMessages.orePortOwner, "Wool");
          "grainPortOwner"            in recievedMessages && setPortOwner(recievedMessages.orePortOwner, "Grain");
          "lumberPortOwner"           in recievedMessages && setPortOwner(recievedMessages.orePortOwner, "Lumber");
          "brickPortOwner"            in recievedMessages && setPortOwner(recievedMessages.orePortOwner, "Brick");
          "orePortOwner"              in recievedMessages && setPortOwner(recievedMessages.orePortOwner, "Ore");
          "lastBuiltObject"           in recievedMessages && setLastBuiltObject(recievedMessages.lastBuiltObject);
          "playerAvailableBuildings"  in recievedMessages && setPlayerAvailableBuildings(recievedMessages.playerAvailableBuildings);
          "playerResourceCards"       in recievedMessages && setPlayerResourceCards(recievedMessages.playerResourceCards);
          "buildRoad"                 in recievedMessages && props.buildRoad(recievedMessages.buildRoad.x, recievedMessages.buildRoad.y, recievedMessages.buildRoad.direction, recievedMessages.buildRoad.clientTurnState);
          "turnState"                 in recievedMessages && setTurnState(recievedMessages.turnState);
          "gameState"                 in recievedMessages && setGameState(recievedMessages.gameState);
          "rollTheDice"               in recievedMessages && props.rollTheDice();
          "endTurn"                   in recievedMessages && props.endTurn();
          "buildCity"                 in recievedMessages && props.buildCity(recievedMessages.buildCity.x, recievedMessages.buildCity.y);
          "playerDevelopmentCardJustPurchased" in recievedMessages && setPlayerDevelopmentCardJustPurchased(recievedMessages.playerDevelopmentCardJustPurchased);
          "discardHalfResourcesPlayers" in recievedMessages && setDiscardHalfResourcesPlayers(recievedMessages.discardHalfResourcesPlayers);
          "discardHalfResourcesCardAmount" in recievedMessages && setDiscardHalfResourcesCardAmount(recievedMessages.discardHalfResourcesCardAmount);
          "removeHalfResources"       in recievedMessages && props.removeHalfResources(recievedMessages.removeHalfResources.player, recievedMessages.removeHalfResources.discardingResources);
          "moveTheThief"              in recievedMessages && props.moveTheThief(recievedMessages.moveTheThief.x, recievedMessages.moveTheThief.y);
          "robbingTargetPlayers"      in recievedMessages && setRobbingTargetPlayers(recievedMessages.robbingTargetPlayers);
          "thiefLocation"             in recievedMessages && setThiefLocation(recievedMessages.thiefLocation);
          "stealACard"                in recievedMessages && props.stealACard(recievedMessages.stealACard);
          "setDiceRolledThisTurn"     in recievedMessages && setDiceRolledThisTurn(recievedMessages.setDiceRolledThisTurn);
          "nobodyToRob"               in recievedMessages && props.nobodyToRob();
          "buyDevelopmentCard"        in recievedMessages && props.buyDevelopmentCard();
          "playerDevelopmentCardHand" in recievedMessages && setPlayerDevelopmentCardHand(recievedMessages.playerDevelopmentCardHand);
          //"" in recievedMessages && (recievedMessages.);
          //"" in recievedMessages && (recievedMessages.);
          //"" in recievedMessages && (recievedMessages.);
          //"" in recievedMessages && (recievedMessages.);
          //"" in recievedMessages && (recievedMessages.);
          //"" in recievedMessages && (recievedMessages.);
          //"" in recievedMessages && (recievedMessages.);
          //"" in recievedMessages && (recievedMessages.);
          //"" in recievedMessages && (recievedMessages.);
          "cheat"                   in recievedMessages && props.cheat(recievedMessages.cheat);
        }
        else
          console.log("ERROR: We were sent some information that wasn't in object form.");
      clearMessage();
    }
  })
  return <>
  </>
}

export default NetworkingMessageReciever