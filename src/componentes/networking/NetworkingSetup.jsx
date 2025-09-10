import { useContext } from "react"
import { NetworkingContext } from "./State/NetworkingContext";
import { NetworkingMessageSenderContext } from "./Host/NetworkingMessageSenderContext";
import { GameStateContext } from "../../state/gameState/GameStateContext";

import NetworkingHostSetup from "./NetworkingHostSetup";
import NetworkingClientSetup from "./NetworkingClientSetup";

export const NetworkingSetup = () => {
  const {conn, setConn, setNewestConn, isHost, setIsHost, hostPeerIDPrefix} = useContext(NetworkingContext);
  const {addToMessagePayloadToHost, addToMessagePayloadToAllPlayers, sendTheMessages} = useContext(NetworkingMessageSenderContext);
  const {setGameStateToBoardSetup} = useContext(GameStateContext);

  const sendHostMessage = () => {
    //conn.forEach((player, index) => {
    //  player.send("Hey, you are player "+index+". I hope you are ready to play!");
    //})
    addToMessagePayloadToAllPlayers("Hey, are you ready to play?");
    addToMessagePayloadToAllPlayers("No, really, are you?");
    sendTheMessages();
  }
  //----------TESTING CODE -----------//
  const hostStartTheGame = () => {
    console.log("This should be handled elsewhere, but we are testing the functionality.")
    addToMessagePayloadToAllPlayers({gameState:"setGameStateToBoardSetup"});
    sendTheMessages();
    setGameStateToBoardSetup();
  }
  //----------End testing code -----------//
  const sendClientMessage = () => {
    addToMessagePayloadToHost("I am in the message payload");
    randomOtherfunction();
    sendTheMessages();
  }
  const makeHost= () => {
    setIsHost(true);
    setConn([]);
  }
  const makePlayer = () => {
    setIsHost(false)
    setConn(null);
  }

  const randomOtherfunction = () => {
    addToMessagePayloadToHost("I am some other message over here.");
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




export default NetworkingSetup