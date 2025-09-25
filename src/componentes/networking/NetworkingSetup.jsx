import { useContext } from "react"
import { NetworkingContext } from "./State/NetworkingContext";
import { NetworkingMessageSenderContext } from "./Host/NetworkingMessageSenderContext";

import NetworkingHostSetup from "./NetworkingHostSetup";
import NetworkingClientSetup from "./NetworkingClientSetup";

import { CurrentPlayerTurnContext } from "../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerInformationContext } from "../../state/playerInformation/PlayerInformationContext";

export const NetworkingSetup = () => {
  const {conn, setConn, setNewestConn, isHost, setIsHost, hostPeerIDPrefix} = useContext(NetworkingContext);
  const {addToMessagePayloadToHost, sendTheMessages} = useContext(NetworkingMessageSenderContext);


  const { clientPlayerNumber, numberOfPlayers } = useContext(CurrentPlayerTurnContext);
  const { playerColor, playerName } = useContext(PlayerInformationContext);


  const clientStartTheGame = () => {
    addToMessagePayloadToHost({ startGame:true });
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
    let colorsSelected = 0;
    playerColor.forEach(color => {
      if ( color != "" )
        colorsSelected++;
    })
    let namesSelected = 0;
    playerName.forEach(name => {
      if ( name != "" )
        namesSelected++;
    })
    console.log("There are this many colors, ",colorsSelected);
    console.log("There are this many names, ",namesSelected);
    if ( colorsSelected == numberOfPlayers && namesSelected == numberOfPlayers )
      colorsSelected = true;
    else
      colorsSelected = false;


  return (
    <>
      {conn == null && <button onClick={makeHost}>Boardgame Display</button>}
      {conn == null && <button onClick={makePlayer}>Be a player</button>}
      {isHost == true && <NetworkingHostSetup setNewestConn={setNewestConn} hostPeerIDPrefix={hostPeerIDPrefix} conn={conn} />}
      {(isHost == false && conn == null) && <NetworkingClientSetup setNewestConn={setNewestConn} hostPeerIDPrefix={hostPeerIDPrefix} conn={conn} />}
      {(isHost == false && clientPlayerNumber == 0 && colorsSelected) && <button onClick={clientStartTheGame}>Start the game</button>}
    </>
  )
}




export default NetworkingSetup