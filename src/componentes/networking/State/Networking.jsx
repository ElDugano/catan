import { useState, useEffect } from "react"
import { NetworkingContext } from "./NetworkingContext";

export const Networking = ({ children }) => {
  const [isHost, setIsHost] = useState(null);
  const [newestConn, setNewestConn] = useState(null);
  const [conn, setConn] = useState(null);
  const [recievedMessages, setRecievedMessages] = useState(null);
  const [recievedMessagesPlayer, setRecievedMessagesPlayer] = useState(null);
  const hostPeerIDPrefix = "elduganocatangame-";

  const clearMessage = () => {
    setRecievedMessages(null);
    setRecievedMessagesPlayer(null);
  }

  useEffect(() => {
    if(newestConn != null) {
      if(isHost == true){
        const playerNumber = conn.length;
        newestConn.on('open', function() {
          // Receive messages
          newestConn.on('data', function(data,) {
            setRecievedMessages(data);
            setRecievedMessagesPlayer(playerNumber);        
                  //This will likely need to reconfiguring or something. If we want to randomize the player numbers.
          });
          // Send a test message messages
          newestConn.send(["You have connected to the boardgame!"]);
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
  }, [conn, isHost, newestConn, ]);

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