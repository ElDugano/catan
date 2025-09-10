import { useContext, useEffect } from "react";
import { NetworkingContext } from "../State/NetworkingContext";

import { GameStateContext } from "../../../state/gameState/GameStateContext";

import { LandTileNumbersContext } from "../../gameboard/state/landTileNumbers/LandTileNumbersContext";
import { LandTilesContext } from "../../gameboard/state/landTiles/LandTilesContext";
import { PortTilesContext } from "../../gameboard/state/portTiles/PortTilesContext";
import { ThiefLocationContext } from "../../gameboard/state/thiefLocation/ThiefLocationContext";
import { TileCornerNodesContext } from "../../gameboard/state/tileCornerNodes/TileCornerNodesContext";

const NetworkingMessageReciever = () => {
  const { recievedMessages, clearMessage, recievedMessagesPlayer } = useContext(NetworkingContext);
  const { setGameStateToBoardSetup } = useContext(GameStateContext);  //Now, to simplify, we might just use setStates, not helper functions.

  const { setLandTileNumbers } = useContext(LandTileNumbersContext);
  const { setLandTiles, setDesertLocation} = useContext(LandTilesContext);
  const { setPortTiles } = useContext(PortTilesContext);
  const { setThiefLocation } = useContext(ThiefLocationContext);
  const { setTileCornerNodes } = useContext(TileCornerNodesContext);

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
            }


            if (messageType == "gameState")
              setGameStateToBoardSetup();
          }
        }
      })
      

      clearMessage();
    }
  })
  return
}

export default NetworkingMessageReciever