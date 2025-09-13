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
  const { setPlayerResourceCards, setDiscardHalfResourcesPlayers, setDiscardHalfResourcesCardAmount } = useContext(PlayerResourceCardsContext);
  const { newPlayerDevelopmentCardJustPurchased } = useContext(DevelopmentCardsContext);

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
          //Host ->Board Setup
          "landTileNumbers"           in recievedMessages && setLandTileNumbers(recievedMessages.landTileNumbers);
          "landTiles"                 in recievedMessages && setLandTiles(recievedMessages.landTiles);
          "desertLocation"            in recievedMessages && setDesertLocation(recievedMessages.desertLocation);
          "portTiles"                 in recievedMessages && setPortTiles(recievedMessages.portTiles);
          "thiefLocation"             in recievedMessages && setThiefLocation(recievedMessages.thiefLocation);
          "tileCornerNodes"           in recievedMessages && setTileCornerNodes(recievedMessages.tileCornerNodes);
          "setupClientPlayerOrder"    in recievedMessages && setupClientPlayerOrder(recievedMessages.setupClientPlayerOrder);
          //Host -> NetworkingSetup
          "clientPlayerNumber"        in recievedMessages && setClientPlayerNumber(recievedMessages.clientPlayerNumber);
          "currentPlayerTurn"         in recievedMessages && setCurrentPlayerTurn(recievedMessages.currentPlayerTurn);
          //Client -> Build Settlement
          "buildSettlement"           in recievedMessages && props.buildSettlement(recievedMessages.buildSettlement.x, recievedMessages.buildSettlement.y)
          //Host -> Build Settlement
            //tileCornerNodes
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
          "buildRoad"                 in recievedMessages && props.buildRoad(recievedMessages.buildRoad.x, recievedMessages.buildRoad.y, recievedMessages.buildRoad.direction);
          "turnState"                 in recievedMessages && setTurnState(recievedMessages.turnState);
          "gameState"                 in recievedMessages && setGameState(recievedMessages.gameState);
          "rollTheDice"               in recievedMessages && props.rollTheDice();
          "endTurn"                   in recievedMessages && props.endTurn();
          "buildCity"                 in recievedMessages && props.buildCity(recievedMessages.buildCity.x, recievedMessages.buildCity.y);
          "newPlayerDevelopmentCardJustPurchased" in recievedMessages && newPlayerDevelopmentCardJustPurchased(recievedMessages.newPlayerDevelopmentCardJustPurchased);
          "discardHalfResourcesPlayers" in recievedMessages && setDiscardHalfResourcesPlayers(recievedMessages.discardHalfResourcesPlayers);
          "discardHalfResourcesCardAmount" in recievedMessages && setDiscardHalfResourcesCardAmount(recievedMessages.discardHalfResourcesCardAmount);
          "removeHalfResources"       in recievedMessages && props.removeHalfResources(recievedMessages.removeHalfResources.player, recievedMessages.removeHalfResources.discardingResources);
          //"" in recievedMessages && (recievedMessages.);
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