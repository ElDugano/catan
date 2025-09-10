import { useState, useEffect } from "react"
import { NetworkingContext } from "./NetworkingContext";

export const Networking = ({ children }) => {
  const [isHost, setIsHost] = useState(null);
  const [newestConn, setNewestConn] = useState(null);
  const [conn, setConn] = useState(null);
  const [recievedMessage, setRecievedMessage] = useState(null);
  const hostPeerIDPrefix = "elduganocatangame-";

  const clearMessage = () => {setRecievedMessage(null)}


  //console.log("Network has updated. This can have an issue as it would call reconnecting everything");
  //We are going to want to monitor this. We might end up having to have a state that knows when the game is setup.
  //Scrach that, newestConn is what prevents issues, it seems.

  useEffect(() => {
    if(newestConn != null) {
      if(isHost == true){
        //const playerNumber = conn.length;
        newestConn.on('open', function() {
          // Receive messages
          newestConn.on('data', function(data,) {
            setRecievedMessage(data);
            //console.log('Received from:',playerNumber,'. Message:', data);
          });
          // Send a test message messages
          newestConn.send("You have connected to the boardgame!");
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
            setRecievedMessage(data);
            //console.log('Received:', data);
          });
          // Send a test message
          newestConn.send("I am a player who has just joined the game!");
        });
        setConn(newestConn);
        setNewestConn(null);
      }
    }
  }, [conn, isHost, newestConn, ]);

  return <NetworkingContext.Provider value={{
    conn,             //Used in Sender
    setConn,
    setNewestConn,
    isHost,
    setIsHost,
    recievedMessage,  //Used in Reciever
    clearMessage,     //Used in Reciever
    hostPeerIDPrefix
  }}>
    {children}
  </NetworkingContext.Provider>
}