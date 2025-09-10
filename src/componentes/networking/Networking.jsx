import { useState, useEffect, useContext } from "react"
import NetworkingHostSetup from "./NetworkingHostSetup";
import NetworkingClientSetup from "./NetworkingClientSetup";

import { GameStateContext } from "../../state/gameState/GameStateContext";

export default function GameSetup() {
  const [isHost, setIsHost] = useState(null);
  const [newestConn, setNewestConn] = useState(null);
  const [conn, setConn] = useState(null);
  const hostPeerIDPrefix = "elduganocatangame-";

  //For testing
  const {setGameStateToBoardSetup} = useContext(GameStateContext);

  useEffect(() => {
    if(isHost == true) {
      if(newestConn != null){
        const playerNumber = conn.length;
        newestConn.on('open', function() {
          // Receive messages
          newestConn.on('data', function(data,) {
            console.log('Received from:',playerNumber,'. Message:', data);
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
    }
    if(isHost == false) {
      if(newestConn != null){
        newestConn.on('open', function() {
          // Receive messages
          newestConn.on('data', function(data,) {
            //----------TESTING CODE -----------//
            if (typeof data === 'object'){
              for (let key in data) {
                if (key == "gameState")
                  setGameStateToBoardSetup();
              }
            }//----------End testing code -----------//
            else
              console.log('Received:', data);
          });

          // Send a test message
          newestConn.send("I am a player who has just joined the game!");
        });
        setConn(newestConn);
        setNewestConn(null);
      }
    }

  }, [conn, isHost, newestConn]);

  const sendHostMessage = () => {
    conn.forEach((player, index) => {
      player.send("Hey, you are player "+index+". I hope you are ready to play!");
    })
  }
  //----------TESTING CODE -----------//
  const hostStartTheGame = () => {
    console.log("This should be handled elsewhere, but we are testing the functionality.")
    conn.forEach((player) => {
      player.send({gameState:"setGameStateToBoardSetup"});
    })
    setGameStateToBoardSetup();
  }
  //----------End testing code -----------//
  const sendClientMessage = () => {
    conn.send("I am ready to start playing.");
  }
  const makeHost= () => {
    setConn([]);
    setIsHost(true);
  }
  const makePlayer = () => {
    setIsHost(false)
    setConn(null);
  }
  

  return (
    <>
      <h1>Welcome to catan</h1>
      <button onClick={makeHost}>Boardgame Display</button>
      <button onClick={makePlayer}>Be a player</button>
      {isHost == true && <NetworkingHostSetup setNewestConn={setNewestConn} hostPeerIDPrefix={hostPeerIDPrefix} conn={conn} />}
      {(isHost == false && conn == null) && <NetworkingClientSetup setNewestConn={setNewestConn} hostPeerIDPrefix={hostPeerIDPrefix} conn={conn} />}
      <br />
      {(isHost == true && conn.length > 0) && <button onClick={sendHostMessage}>Send a message to the players</button>}
      {(isHost == true && conn.length > 0) && <button onClick={hostStartTheGame}>StartTheGame</button>}
      {(isHost == false && conn != null) && <button onClick={sendClientMessage}>Send a message to the Board</button>}
    </>
  )
}