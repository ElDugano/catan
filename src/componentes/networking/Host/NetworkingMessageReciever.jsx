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
  const { setStandardPortOwner,
          setWoolPortOwner,
          setGrainPortOwner,
          setLumberPortOwner,
          setBrickPortOwner,
          setOrePortOwner   } = useContext(PortOwnerContext);
  const { setPlayerAvailableBuildings, setLastBuiltObject } = useContext(PlayerAvailableBuildingsContext);
  const { setPlayerResourceCards,
          setDiscardHalfResourcesPlayers,
          setDiscardHalfResourcesCardAmount,
          setRobbingTargetPlayers,
          setPreviouslyGainedResources } = useContext(PlayerResourceCardsContext);
  const { setPlayerDevelopmentCardJustPurchased, setPlayerDevelopmentCardHand, setTotalPlayerDevelopmentCardHand } = useContext(DevelopmentCardsContext);
  const { setDiceRolledThisTurn } = useContext(DiceContext);

  const { setCurrentPlayerTurn, setupClientPlayerOrder, setClientPlayerNumber } = useContext(CurrentPlayerTurnContext);

  useEffect(() => {
    if (recievedMessages != null) {
      console.log("Recieved the below message in the Reciever:")
      console.log('Received:', recievedMessages);
      console.log("This was sent from Player: "+recievedMessagesPlayer)
        if (typeof recievedMessages === 'object'){
          //switch (recievedMessages.header) {
          //  case "Board Setup":
          //    console.log*("Did we get into the board game setup stage?")
          //  break;
          //  case "Building a Settlement":
          //    console.log("We are building a settlement.")
          //  break;
          //}
          "gameState"                 in recievedMessages && setGameState(recievedMessages.gameState);
          "turnState"                 in recievedMessages && setTurnState(recievedMessages.turnState);
          "landTileNumbers"           in recievedMessages && setLandTileNumbers(recievedMessages.landTileNumbers);
          "landTiles"                 in recievedMessages && setLandTiles(recievedMessages.landTiles);
          "desertLocation"            in recievedMessages && setDesertLocation(recievedMessages.desertLocation);
          "portTiles"                 in recievedMessages && setPortTiles(recievedMessages.portTiles);
          "thiefLocation"             in recievedMessages && setThiefLocation(recievedMessages.thiefLocation);
          "tileCornerNodes"           in recievedMessages && setTileCornerNodes(recievedMessages.tileCornerNodes);
          "setupClientPlayerOrder"    in recievedMessages && setupClientPlayerOrder(recievedMessages.setupClientPlayerOrder);
          "clientPlayerNumber"        in recievedMessages && setClientPlayerNumber(recievedMessages.clientPlayerNumber);
          "currentPlayerTurn"         in recievedMessages && setCurrentPlayerTurn(recievedMessages.currentPlayerTurn);
          "scoreBoard"                in recievedMessages && setScoreBoard(recievedMessages.scoreBoard);
          //"hiddenPoints"              in recievedMessages && (recievedMessages.hiddenPoints);
          //"winner"                    in recievedMessages && (recievedMessages.winner);
          //"longestRoadOwner"          in recievedMessages && (recievedMessages.longestRoadOwner);
          //"longestRoadDistance"       in recievedMessages && (recievedMessages.longestRoadDistance);
          //"playerLongestRoad"         in recievedMessages && (recievedMessages.playerLongestRoad);
          "standardPortOwner"         in recievedMessages && setStandardPortOwner(recievedMessages.standardPortOwner, "Standard");
          "woolPortOwner"             in recievedMessages && setWoolPortOwner(recievedMessages.woolPortOwner, "Wool");
          "grainPortOwner"            in recievedMessages && setGrainPortOwner(recievedMessages.grainPortOwner, "Grain");
          "lumberPortOwner"           in recievedMessages && setLumberPortOwner(recievedMessages.lumberPortOwner, "Lumber");
          "brickPortOwner"            in recievedMessages && setBrickPortOwner(recievedMessages.brickPortOwner, "Brick");
          "orePortOwner"              in recievedMessages && setOrePortOwner(recievedMessages.orePortOwner, "Ore");
          "playerAvailableBuildings"  in recievedMessages && setPlayerAvailableBuildings(recievedMessages.playerAvailableBuildings);
          "lastBuiltObject"           in recievedMessages && setLastBuiltObject(recievedMessages.lastBuiltObject);
          "playerResourceCards"       in recievedMessages && setPlayerResourceCards(recievedMessages.playerResourceCards);
          "previouslyGainedResources" in recievedMessages && setPreviouslyGainedResources(recievedMessages.previouslyGainedResources);
          "discardHalfResourcesPlayers" in recievedMessages && setDiscardHalfResourcesPlayers(recievedMessages.discardHalfResourcesPlayers);
          "discardHalfResourcesCardAmount" in recievedMessages && setDiscardHalfResourcesCardAmount(recievedMessages.discardHalfResourcesCardAmount);
          "robbingTargetPlayers"      in recievedMessages && setRobbingTargetPlayers(recievedMessages.robbingTargetPlayers);
          "playerDevelopmentCardJustPurchased" in recievedMessages && setPlayerDevelopmentCardJustPurchased(recievedMessages.playerDevelopmentCardJustPurchased);
          "playerDevelopmentCardHand" in recievedMessages && setPlayerDevelopmentCardHand(recievedMessages.playerDevelopmentCardHand);
          //"playerDevelopmentCardPlayed" in recievedMessages && (recievedMessages.playerDevelopmentCardPlayed);
          "diceRolledThisTurn"        in recievedMessages && setDiceRolledThisTurn(recievedMessages.diceRolledThisTurn);
          //"playerOrder" in recievedMessages && (recievedMessages.playerOrder);
          //"currentPlayerTurn" in recievedMessages && (recievedMessages.currentPlayerTurn);
          //"numberOfPlayers" in recievedMessages && (recievedMessages.numberOfPlayers);
          //"playerOrderArrayPosition" in recievedMessages && (recievedMessages.playerOrderArrayPosition);
          //"clientPlayerNumber" in recievedMessages && (recievedMessages.clientPlayerNumber);
          
          
          "totalPlayerDevelopmentCardHand" in recievedMessages && setTotalPlayerDevelopmentCardHand(recievedMessages.totalPlayerDevelopmentCardHand);
          //"" in recievedMessages && (recievedMessages.);
          //"" in recievedMessages && (recievedMessages.);
          //"" in recievedMessages && (recievedMessages.);
          //"" in recievedMessages && (recievedMessages.);
          //"" in recievedMessages && (recievedMessages.);
          //"" in recievedMessages && (recievedMessages.);
          //"" in recievedMessages && (recievedMessages.);
          "buildSettlement"           in recievedMessages && props.buildSettlement(recievedMessages.buildSettlement.x, recievedMessages.buildSettlement.y)
          "buildRoad"                 in recievedMessages && props.buildRoad(recievedMessages.buildRoad.x, recievedMessages.buildRoad.y, recievedMessages.buildRoad.direction, recievedMessages.buildRoad.clientTurnState);
          "rollTheDice"               in recievedMessages && props.rollTheDice();
          "endTurn"                   in recievedMessages && props.endTurn();
          "buildCity"                 in recievedMessages && props.buildCity(recievedMessages.buildCity.x, recievedMessages.buildCity.y);
          "removeHalfResources"       in recievedMessages && props.removeHalfResources(recievedMessages.removeHalfResources.player, recievedMessages.removeHalfResources.discardingResources);
          "moveTheThief"              in recievedMessages && props.moveTheThief(recievedMessages.moveTheThief.x, recievedMessages.moveTheThief.y);
          "stealACard"                in recievedMessages && props.stealACard(recievedMessages.stealACard);
          "nobodyToRob"               in recievedMessages && props.nobodyToRob();
          "buyDevelopmentCard"        in recievedMessages && props.buyDevelopmentCard();
          "playKnight"                in recievedMessages && props.playKnight();
          "playYearOfPlenty"          in recievedMessages && props.playYearOfPlenty(recievedMessages.playYearOfPlenty);
          "tradeResourceCards"        in recievedMessages && props.tradeResourceCards(recievedMessages.tradeResourceCards.giveTradeItem, recievedMessages.tradeResourceCards.giveTradeAmount, recievedMessages.tradeResourceCards.recieveTradeItem, recievedMessages.tradeResourceCards.recieveTradeAmount, recievedMessages.tradeResourceCards.tradeTarget);
          "cheat"                     in recievedMessages && props.cheat(recievedMessages.cheat);
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