import { useContext } from "react"
import { NetworkingContext } from "./State/NetworkingContext";
import { NetworkingMessageSenderContext } from "./Host/NetworkingMessageSenderContext";
import { GameStateContext } from "../../state/gameState/GameStateContext";

import NetworkingHostSetup from "./NetworkingHostSetup";
import NetworkingClientSetup from "./NetworkingClientSetup";

//This will be in gamesetup.
import { LandTileNumbersContext } from "../gameboard/state/landTileNumbers/LandTileNumbersContext";
import { LandTilesContext } from "../gameboard/state/landTiles/LandTilesContext";
import { PortTilesContext } from "../gameboard/state/portTiles/PortTilesContext";
import { ThiefLocationContext } from "../gameboard/state/thiefLocation/ThiefLocationContext";
import { TileCornerNodesContext } from "../gameboard/state/tileCornerNodes/TileCornerNodesContext";

import { CurrentPlayerTurnContext } from "../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerInformationContext } from "../../state/playerInformation/PlayerInformationContext";
import { TurnStateContext } from "../../state/turnState/TurnStateContext";

export const NetworkingSetup = () => {
  const {conn, setConn, setNewestConn, isHost, setIsHost, hostPeerIDPrefix} = useContext(NetworkingContext);
  const {addToMessagePayloadToHost, addToMessagePayloadToPlayer, addToMessagePayloadToAllPlayers, sendTheMessages} = useContext(NetworkingMessageSenderContext);
  const {setClientTurnStateToBuildingASettlement } = useContext(TurnStateContext)
  const {setGameStateToBoardSetup} = useContext(GameStateContext);

  //This should ultimately be split into two, networking setup, and gameSetup.
  const { landTileNumbers } = useContext(LandTileNumbersContext);
  const { landTiles, desertLocation} = useContext(LandTilesContext);
  const { portTiles } = useContext(PortTilesContext);
  const { thiefLocation } = useContext(ThiefLocationContext);
  const { tileCornerNodes } = useContext(TileCornerNodesContext);

  const { playerOrder, currentPlayerTurn, clientPlayerNumber, numberOfPlayers } = useContext(CurrentPlayerTurnContext);
  const { playerColor, playerName } = useContext(PlayerInformationContext);

  const sendHostMessage = () => {
    addToMessagePayloadToAllPlayers({message: "Hey, are you ready to play?"});
    sendTheMessages();
  }
  //---------- Should be moved into GameSetup -----------//
  const hostStartTheGame = () => {
    console.log("This should be handled elsewhere, but we are testing the functionality.");
    addToMessagePayloadToAllPlayers({ header:"Board Setup" });
    addToMessagePayloadToAllPlayers(setGameStateToBoardSetup());
    addToMessagePayloadToPlayer(setClientTurnStateToBuildingASettlement(), currentPlayerTurn);
    addToMessagePayloadToAllPlayers({ landTileNumbers:landTileNumbers });
    addToMessagePayloadToAllPlayers({ landTiles:landTiles });
    addToMessagePayloadToAllPlayers({ desertLocation:desertLocation });
    addToMessagePayloadToAllPlayers({ portTiles:portTiles });
    addToMessagePayloadToAllPlayers({ thiefLocation:thiefLocation });
    addToMessagePayloadToAllPlayers({ tileCornerNodes:tileCornerNodes });
    addToMessagePayloadToAllPlayers({ setupClientPlayerOrder:playerOrder });
    sendTheMessages();
    //setGameStateToBoardSetup();
  }
  const clientStartTheGame = () => {
    addToMessagePayloadToHost({ startGame:true });
    sendTheMessages();
  }
  //---------- Should be moved into GameSetup -----------//
  //const sendClientMessage = () => {
  //  addToMessagePayloadToHost({message: "I am in the message payload"});
  //  sendTheMessages();
  //}
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
      {/*(isHost == true && conn.length > 0) && <button onClick={sendHostMessage}>Send a message to the players</button>*/}
      {/*(isHost == true && conn.length > 0) && <button onClick={hostStartTheGame}>StartTheGame</button>*/}
      {/*(isHost == false && conn != null) && <button onClick={sendClientMessage}>Send a message to the Board</button>*/}
      {(isHost == false && clientPlayerNumber == 0 && colorsSelected) && <button onClick={clientStartTheGame}>Start the game</button>}
    </>
  )
}




export default NetworkingSetup