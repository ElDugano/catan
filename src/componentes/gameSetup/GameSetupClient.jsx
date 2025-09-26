import { useContext, useState } from "react";
import { CurrentPlayerTurnContext } from "../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerInformationContext } from "../../state/playerInformation/PlayerInformationContext";
import { NetworkingMessageSenderContext } from "../networking/Host/NetworkingMessageSenderContext";

export default function GameSetupClient() {
  const { clientPlayerNumber, numberOfPlayers } = useContext(CurrentPlayerTurnContext);
  const { playerColor, playerName } = useContext(PlayerInformationContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  const availableColors = ["Blue", "Red", "Indigo", "Yellow", "Orange", "Green"];
  const selectedColors = [false, false, false, false, false, false];
  const [localPlayerName, setLocalPlayerName] = useState("");
  const [menuOpen, setMenuOpen] = useState(true);

  const setColor = (color) => {
    addToMessagePayloadToHost({ header:"Select Player Color" });
    addToMessagePayloadToHost({ selectColor:{player:clientPlayerNumber, color:color} });
    sendTheMessages();
  }

  const setPlayerInformation = () => {
    addToMessagePayloadToHost({ header:"Select Player Name" });
    addToMessagePayloadToHost({ setPlayerName:{player:clientPlayerNumber, name:localPlayerName} });
    sendTheMessages();
    setMenuOpen(false);
  }

  const clientStartTheGame = () => {
    addToMessagePayloadToHost({ startGame:true });
    sendTheMessages();
  }

  playerColor.forEach((color) => {
    const chosenColorIndex = availableColors.indexOf(color);
    if (chosenColorIndex !== -1) {
      selectedColors[chosenColorIndex] = true;
    }
  })
  
  let colorButtons = [];
  availableColors.forEach((color, index) => {
    if (playerColor[clientPlayerNumber] == color)
      colorButtons.push(
      <button key={
          crypto.randomUUID()}
          onClick={() => setColor(color)}
          className={"playerButton"+color+" selected"}
        >
          {color}
        </button>
      )
    else if (selectedColors[index] == false)
      colorButtons.push(
        <button key={
          crypto.randomUUID()}
          onClick={() => setColor(color)}
          className={"playerButton"+color}
        >
          {color}
        </button>
      )
    else
      colorButtons.push(
        <button key={
          crypto.randomUUID()}
          disabled
        >
          {color}
        </button>
      )
  })

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
    if ( colorsSelected == numberOfPlayers && namesSelected == numberOfPlayers )
      colorsSelected = true;
    else
      colorsSelected = false;

  if(menuOpen == true) {
    return (
      <div className={"setupMenu clientMenu clientMenuColor"+playerColor[clientPlayerNumber]}>
        <h3>Enter your name</h3>
        <input
          value={localPlayerName}
          name="localPlayerName"
          maxlength="12"
          onChange={e => setLocalPlayerName(e.target.value)} />
        <br />
        <div>
          <h3>Select a Color</h3>
          <div className={"selectPlayerColorMenu"}>
            {colorButtons}
          </div>
        </div>
        {localPlayerName != "" && playerColor[clientPlayerNumber] != "" ? <button onClick={setPlayerInformation}>Join the Game</button> : <button disabled>Join the Game</button>}
      </div>
    )
  }
  else {
    return (
      <div className={"setupMenu clientMenu clientMenuColor"+playerColor[clientPlayerNumber]}>
        {(clientPlayerNumber == 0 && colorsSelected) && <button onClick={clientStartTheGame}>Start the game</button>}
        <button onClick={() => setMenuOpen(true)}>Change Your Options</button>
      </div>
    )
  }


}