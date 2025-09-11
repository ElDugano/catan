import { useContext, useEffect } from "react";
import { NetworkingContext } from "../State/NetworkingContext";

import { GameStateContext } from "../../../state/gameState/GameStateContext";

import { LandTileNumbersContext } from "../../gameboard/state/landTileNumbers/LandTileNumbersContext";
import { LandTilesContext } from "../../gameboard/state/landTiles/LandTilesContext";
import { PortTilesContext } from "../../gameboard/state/portTiles/PortTilesContext";
import { ThiefLocationContext } from "../../gameboard/state/thiefLocation/ThiefLocationContext";
import { TileCornerNodesContext } from "../../gameboard/state/tileCornerNodes/TileCornerNodesContext";

import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext";

const NetworkingMessageReciever = (props) => {
  const { recievedMessages, clearMessage, recievedMessagesPlayer } = useContext(NetworkingContext);
  const { setGameStateToBoardSetup } = useContext(GameStateContext);  //Now, to simplify, we might just use setStates, not helper functions.

  const { setLandTileNumbers } = useContext(LandTileNumbersContext);
  const { setLandTiles, setDesertLocation} = useContext(LandTilesContext);
  const { setPortTiles } = useContext(PortTilesContext);
  const { setThiefLocation } = useContext(ThiefLocationContext);
  const { setTileCornerNodes } = useContext(TileCornerNodesContext);

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
              setGameStateToBoardSetup();//Needs improvement, maybe? IDK, this is just going to happen, doesn't need to be sent.
            break;
          }
          "landTileNumbers"         in recievedMessages && setLandTileNumbers(recievedMessages.landTileNumbers);
          "landTiles"               in recievedMessages && setLandTiles(recievedMessages.landTiles);
          "desertLocation"          in recievedMessages && setDesertLocation(recievedMessages.desertLocation);
          "portTiles"               in recievedMessages && setPortTiles(recievedMessages.portTiles);
          "thiefLocation"           in recievedMessages && setThiefLocation(recievedMessages.thiefLocation);
          "tileCornerNodes"         in recievedMessages && setTileCornerNodes(recievedMessages.tileCornerNodes);
          "setupClientPlayerOrder"  in recievedMessages && setupClientPlayerOrder(recievedMessages.setupClientPlayerOrder);
          "clientPlayerNumber"      in recievedMessages && setClientPlayerNumber(recievedMessages.clientPlayerNumber);
          "currentPlayerTurn"       in recievedMessages && setCurrentPlayerTurn(recievedMessages.currentPlayerTurn);
          "buildSettlement"         in recievedMessages && props.buildSettlement(recievedMessages.buildSettlement.x,recievedMessages.buildSettlement.y)
          //"" in recievedMessages && 
          //"" in recievedMessages && 
          //"" in recievedMessages && 
          //"" in recievedMessages && 
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