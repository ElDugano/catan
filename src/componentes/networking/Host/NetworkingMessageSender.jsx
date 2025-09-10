import { useContext, useState, useEffect } from "react";
import { NetworkingMessageSenderContext } from "./NetworkingMessageSenderContext"
import { NetworkingContext } from "../State/NetworkingContext";

export const NetworkingMessageSender = ( {children} ) => {
  const {conn, isHost} = useContext(NetworkingContext);
  
  const [messagePayload, setMessagePayload] = useState([new Array(), new Array(), new Array(), new Array()]);
  const [sendMessages, setSendMessages] = useState(false);

  const addToMessagePayloadToHost = (message) => {
    setMessagePayload((prevMessages) => {
      let newMessageArray = [...prevMessages];
      newMessageArray[0].push(message);
      return newMessageArray;
    });
  }
  const addToMessagePayloadToPlayer = (message, player) => {
    setMessagePayload((prevMessages) => {
      let newMessageArray = [...prevMessages];
      newMessageArray[player].push(message);
      return newMessageArray;
    });

  }
  const addToMessagePayloadToAllPlayers = (message) => {
    setMessagePayload((prevMessages) => {
      let newMessageArray = [...prevMessages];
      newMessageArray.forEach((playerMessages) => {
        playerMessages.push(message);
      })
      return newMessageArray;
    });
  }
  const sendTheMessages = () => {
    setSendMessages(true);
  }

  useEffect(() => {
    if(sendMessages != false) {
      console.log("We have some messages to send.")
      if (isHost) {
        messagePayload.forEach((playerMessages, player) => {
          if(conn[player])
            conn[player].send(playerMessages);
        })
      }
      else
        conn.send(messagePayload[0]);
      setSendMessages(false);
      setMessagePayload([new Array(), new Array(), new Array(), new Array()]);
    }

    messagePayload
  }, [conn, sendMessages, isHost, messagePayload])

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