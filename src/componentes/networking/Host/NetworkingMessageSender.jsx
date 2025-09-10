import { useContext, useState, useEffect } from "react";
import { NetworkingMessageSenderContext } from "./NetworkingMessageSenderContext"
import { NetworkingContext } from "../State/NetworkingContext";

export const NetworkingMessageSender = ( {children} ) => {
  const {conn, isHost} = useContext(NetworkingContext);
  //const [myMessagePayload, setMyMessagePayload] = useState({host:[],0:[],1:[],2:[],3:[]});
  const [singlePlayerMessagePlayload, setSinglePlayerMessagePayload] = useState([]);
  const [singleMessageTarget, setSingleMessageTarget] = useState(null);
  const [allPlayerMessagePayload, setAllPlayerMessagePayload] = useState([]);

  const [sendMessages, setSendMessages] = useState(false);

  const addToMessagePayloadToHost = (message) => {
    setSinglePlayerMessagePayload((prevMessages) => [...prevMessages, message]);
  }
  const addToMessagePayloadToPlayer = (message, player) => {
    setSinglePlayerMessagePayload((prevMessages) => [...prevMessages, message]);
    setSingleMessageTarget(player);
  }
  const addToMessagePayloadToAllPlayers = (message) => {
    setAllPlayerMessagePayload((prevMessages) => [...prevMessages, message]);
  }
  const sendTheMessages = () => {
    setSendMessages(true);
  }
//  const sendMessagesToHost = () => {
//    setSendMessages(true);
//    console.log("Sending this message Payload to the Host:");
//    if (isHost == true)
//      console.log("**** WARNING **** A Host is calling this function, which shouldn't happen.");
//    else {
//      conn.send(myMessagePayload);
//    }
//  }
//  const sendMessagesPayloadToPlayer = (player) => {
//    setSendMessages(true);
//    console.log("Sending this message Payload to player "+player+":");
//    console.log(myMessagePayload);
//    if (isHost == true){
//      conn[player].send(myMessagePayload);
//      setSingleMessageTarget(player);
//    }
//    else
//      console.log("**** WARNING **** A player is calling this function, which shouldn't happen.");
//  }
//
//
//  const sendMessagesPayloadToAllPlayers = () => {
//    setSendMessages(true);
//    console.log("Sending this message Payload to the All Players:");
//    if (isHost == true){
//      conn.forEach((player) => {
//        player.send(myMessagePayload);
//      })
//    }
//    else
//      console.log("**** WARNING **** A player is calling this function, which shouldn't happen.");
//  }

  useEffect(() => {
    console.log("checking useEffect");
    if(sendMessages != false) {
      console.log("We have some messages to send.")
      if (singlePlayerMessagePlayload.length != 0) {
        if (isHost)
          conn[singleMessageTarget].send(singlePlayerMessagePlayload);
        else
          conn.send(singlePlayerMessagePlayload);
      }
      if (allPlayerMessagePayload.length != 0) {
        conn.forEach((player) => {
          player.send(allPlayerMessagePayload);
        })
      }
      setSingleMessageTarget(null);
      setSendMessages(false);
      setSinglePlayerMessagePayload([]);
      setSingleMessageTarget([]);
    }
  }, [conn, sendMessages, singlePlayerMessagePlayload, allPlayerMessagePayload, singleMessageTarget, isHost])

  return <NetworkingMessageSenderContext.Provider value={{
      addToMessagePayloadToHost,
      addToMessagePayloadToPlayer,
      addToMessagePayloadToAllPlayers,
      sendTheMessages
    }}>
      {children}
    </NetworkingMessageSenderContext.Provider>
}

export default NetworkingMessageSender