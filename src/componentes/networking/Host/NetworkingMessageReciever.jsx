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
      recievedMessages.forEach(recievedMessage => {
        if (typeof recievedMessage === 'object'){
          for (let messageType in recievedMessage) {
            console.log(recievedMessage);
            //We are doing a switch statement right now, but likely we will just create different codes.
            //A code could be like boardsetup, which holds another object. This can be reserved for the major change types, maybe.
            switch (messageType) {
              case "gameState":
                //Do another swtich
                console.log("We need to do another check here in NetowrkingMessageReciever.jsx.");
                setGameStateToBoardSetup();
              break;
              case "landTileNumbers":
                setLandTileNumbers(recievedMessage[messageType]);
              break;
              case "landTiles":
                console.log("Working with the landTiles here.");
                console.log(recievedMessage[messageType])
                setLandTiles(recievedMessage[messageType]);
              break;
              case "desertLocation":
                setDesertLocation(recievedMessage[messageType]);
              break;
              case "portTiles":
                setPortTiles(recievedMessage[messageType]);
              break;
              case "thiefLocation":
                setThiefLocation(recievedMessage[messageType]);
              break;
              case "tileCornerNodes":
                setTileCornerNodes(recievedMessage[messageType]);
              break;
              case "clientPlayerNumber":
                console.log("I am player "+recievedMessage[messageType]);
                setClientPlayerNumber(recievedMessage[messageType]);
              break;
              case "currentPlayerTurn":
                setCurrentPlayerTurn(recievedMessage[messageType]);
              break;
              case "setupClientPlayerOrder":
                setupClientPlayerOrder(recievedMessage[messageType]);
              break;
              case "buildSettlement":
                console.log("I have to call something. Basically the buildSettlement(x,y) function in CornerNodes.");
                console.log("I really just need to add in an extra little component to handle host duties like this.");
                console.log(props.buildSettlement);
                props.buildSettlement(recievedMessage[messageType].x, recievedMessage[messageType].y);
              break
            }
          }
        }
      })
      clearMessage();
    }
  })
  return <>
  </>
}

export default NetworkingMessageReciever