import { useContext, useState, useEffect } from "react";
import { NetworkingMessageSenderContext } from "./NetworkingMessageSenderContext"
import { NetworkingContext } from "../State/NetworkingContext";

export const NetworkingMessageSender = ( {children} ) => {
  const {conn, isHost} = useContext(NetworkingContext);
  
  const [messagePayload, setMessagePayload] = useState([{},{},{},{}]);
  const [sendMessages, setSendMessages] = useState(false);

  const addToMessagePayloadToHost = (message) => {
    setMessagePayload((prevMessages) => {
      let newMessageArray = [...prevMessages];
      newMessageArray[0] = {...newMessageArray[0], ...message}
      return newMessageArray;
    });
  }
  const addToMessagePayloadToPlayer = (message, player) => {
    setMessagePayload((prevMessages) => {
      let newMessageArray = [...prevMessages];
      newMessageArray[player] = {...newMessageArray[player], ...message}
      return newMessageArray;
    });
  }
  const addToMessagePayloadToAllPlayers = (message) => {
    setMessagePayload((prevMessages) => {
      let newMessageArray = [...prevMessages];
      newMessageArray.forEach((playerMessages, player) => {
        newMessageArray[player] = {...playerMessages, ...message};
      })
      return newMessageArray;
    });
  }
  const sendTheMessages = () => {
    setSendMessages(true);
  }

  useEffect(() => {
    if(sendMessages != false) {
      if (isHost) {
        messagePayload.forEach((playerMessages, player) => {
          if(conn[player])
            conn[player].send(playerMessages);
        })
      }
      else
        conn.send(messagePayload[0]);
      setSendMessages(false);
      setMessagePayload([{},{},{},{}]);
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