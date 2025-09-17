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
  //if(isHost == false)
    //alert("Networking ran");

  useEffect(() => {
    if(newestConn != null) {
      if(isHost == true){
        let reconnectingPlayer = null;
        conn.forEach((testConn, connPlayer) => {
          if (testConn.peer == newestConn.peer) { //This is a reconnection.
            reconnectingPlayer = connPlayer;
            console.log("We are reconnecting player "+connPlayer);
          }
        });
        let playerNumber;
        if (reconnectingPlayer == null) {
          playerNumber = addPlayer();
        }
        else {
          playerNumber = reconnectingPlayer;
        }
          newestConn.on('open', function() {
          console.log("When does this get displayed. and PlayerNumber: "+playerNumber)
          newestConn.on('data', function(data,) {
            setRecievedMessages(data);
            setRecievedMessagesPlayer(playerNumber);        
          });
          newestConn.send(
            { message:"You have connected to the boardgame!",
              clientPlayerNumber:playerNumber });
              //TODO: We may need to send an updated payload of the whole game.
              //This can be done on reconnect, or really just when the player connects anytime, like, whynot, then we don't need to send stuff at startup.
          });
          newestConn.on('error', (err) => {
            console.log(err);
            console.log(err.type);
          });
          let newConn;
          if(conn == null)
            newConn = newestConn;
          else {
            newConn = [...conn];
            if (reconnectingPlayer == null)
              newConn.push(newestConn);
            else
              newConn[playerNumber] = newestConn;
          }
          setConn(newConn);
          setNewestConn(null);
      }
      else if(isHost == false){
        //alert("going to open the newestConn.on");
        newestConn.on('open', function() {
          // Receive messages
          newestConn.on('data', function(data,) {
            setRecievedMessages(data);
            //console.log('Received:', data);
          });
          // Send a test message
          newestConn.send({message: "I am a player who has just joined the game!"});
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