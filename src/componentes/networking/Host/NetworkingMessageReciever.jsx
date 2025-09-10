import { useContext, useEffect } from "react";
import { NetworkingContext } from "../State/NetworkingContext";

import { GameStateContext } from "../../../state/gameState/GameStateContext";

const NetworkingMessageReciever = () => {
  const { recievedMessage, clearMessage, recievedMessagesPlayer } = useContext(NetworkingContext);
  const { setGameStateToBoardSetup } = useContext(GameStateContext);  //Now, to simplify, we might just use setStates, not helper functions.

  useEffect(() => {
    if (recievedMessage != null) {
      console.log("Recieved the below message in the Reciever:")
      console.log('Received:', recievedMessage);
      console.log("This was sent from Player: "+recievedMessagesPlayer)

      if (typeof recievedMessage === 'object'){
        for (let key in recievedMessage) {
          if (key == "gameState")
            setGameStateToBoardSetup();
        }
      }

      clearMessage();
    }
  })
  return
}

export default NetworkingMessageReciever