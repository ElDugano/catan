import { useContext, useState } from "react";
import { NetworkingMessageSenderContext } from "./NetworkingMessageSenderContext"
import { NetworkingContext } from "../State/NetworkingContext";

export const NetworkingMessageSender = ( {children} ) => {
  const {conn, isHost} = useContext(NetworkingContext);
  const [testState, setTestState] = useState("cat");

  console.log("------ NetworkingMessageSenderUpdated ------");

  let myMessagePayload = [];
  const addToMessagePayload = (message) => {
    myMessagePayload.push(message);
    setTestState(testState + "cat");
  }

  const sendMessagesPayloadToPlayer = (player) => {
    console.log("Sending this message Payload to player "+player+":");
    console.log(myMessagePayload);
    if (isHost == true){
      conn[player].send(myMessagePayload);
    }
    else
      console.log("**** WARNING **** A player is calling this function, which shouldn't happen.");
    myMessagePayload=[];
  }
  const sendMessagesToHost = () => {
    console.log("Sending this message Payload to the Host:");
    if (isHost == true)
      console.log("**** WARNING **** A Host is calling this function, which shouldn't happen.");
    else {
      conn.send(myMessagePayload);
    }
    myMessagePayload=[];
  }

  const sendMessagesPayloadToAllPlayers = () => {
    console.log("Sending this message Payload to the All Players:");
    if (isHost == true){
      conn.forEach((player) => {
        player.send(myMessagePayload);
      })
    }
    else
      console.log("**** WARNING **** A player is calling this function, which shouldn't happen.");
    myMessagePayload=[];
  }

  return <NetworkingMessageSenderContext.Provider value={{
      addToMessagePayload,
      sendMessagesPayloadToPlayer,
      sendMessagesToHost,
      sendMessagesPayloadToAllPlayers
    }}>
      {children}
    </NetworkingMessageSenderContext.Provider>
}

export default NetworkingMessageSender