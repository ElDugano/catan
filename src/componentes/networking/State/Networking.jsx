import { useState, useEffect, useContext } from "react"
import { NetworkingContext } from "./NetworkingContext";

import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext";

export const Networking = ({ children }) => {
  const [isHost, setIsHost] = useState(null);
  const [newestConn, setNewestConn] = useState(null);
  const [conn, setConn] = useState(null);
  const [recievedMessages, setRecievedMessages] = useState(null);
  const [recievedMessagesPlayer, setRecievedMessagesPlayer] = useState(null);
  const hostPeerIDPrefix = "elduganocatangame-";

  const { addPlayer } = useContext(CurrentPlayerTurnContext);

  const clearMessage = () => {
    setRecievedMessages(null);
    setRecievedMessagesPlayer(null);
  }

  useEffect(() => {
    if(newestConn != null) {
      if(isHost == true){
        //const playerNumber = conn.length;
        const playerNumber = addPlayer();
        newestConn.on('open', function() {
          console.log("When does this get displayed. and PlayerNumber: "+playerNumber)
          // Receive messages
          newestConn.on('data', function(data,) {
            setRecievedMessages(data);
            setRecievedMessagesPlayer(playerNumber);        
          });
          // Send a test message messages
          newestConn.send([
            "You have connected to the boardgame!",
            {clientPlayerNumber:playerNumber}
          ]);
          //Cant use NetworkingMessageSender because it is below in context.
        });
        let newConn;
        if(conn == null)
          newConn = newestConn;
        else {
          newConn = [...conn];
          newConn.push(newestConn);
        }
        setConn(newConn);
        setNewestConn(null);
      }
      else if(isHost == false){
        newestConn.on('open', function() {
          // Receive messages
          newestConn.on('data', function(data,) {
            setRecievedMessages(data);
            //console.log('Received:', data);
          });
          // Send a test message
          newestConn.send(["I am a player who has just joined the game!"]);
        });
        setConn(newestConn);
        setNewestConn(null);
      }
    }
  }, [conn, isHost, newestConn, addPlayer]);

  return <NetworkingContext.Provider value={{
    conn,             //Used in Sender
    setConn,
    setNewestConn,
    isHost,
    setIsHost,
    recievedMessages,        //Used in Reciever
    recievedMessagesPlayer, //Used in Reciever
    clearMessage,           //Used in Reciever
    hostPeerIDPrefix
  }}>
    {children}
  </NetworkingContext.Provider>
}