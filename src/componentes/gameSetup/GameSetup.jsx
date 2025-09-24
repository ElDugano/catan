import { useContext } from "react";
import NetworkingSetup from "../networking/NetworkingSetup"
import { NetworkingContext } from "../networking/State/NetworkingContext";
import { CurrentPlayerTurnContext } from "../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerColorContext } from "../../state/playerColor/PlayerColorContext";
import { NetworkingMessageSenderContext } from "../networking/Host/NetworkingMessageSenderContext";

export default function GameSetup() {
  const { isHost, conn } = useContext(NetworkingContext);
  const { clientPlayerNumber, numberOfPlayers } = useContext(CurrentPlayerTurnContext);
  const { playerColor, setPlayerColor } = useContext(PlayerColorContext);
    const {addToMessagePayloadToHost, sendTheMessages} = useContext(NetworkingMessageSenderContext);

  const availableColors = ["Blue", "Red", "Indigo", "Gold", "Orange", "Green"];

  const setColor = (color) => {
    //setPlayerColor(clientPlayerNumber, color);
    addToMessagePayloadToHost({ header:"Select a Color" });
    addToMessagePayloadToHost({ selectColor:{player:clientPlayerNumber, color:color} });
    sendTheMessages();
  }
  console.log(playerColor);
  playerColor.forEach((color) => {
    console.log("Number of Players", numberOfPlayers);
    const chosenColorIndex = availableColors.indexOf(color);
    if (chosenColorIndex !== -1)
      availableColors.splice(chosenColorIndex, 1);
  })

  let content = [];
  availableColors.forEach(color => {
    content.push(<button onClick={() => setColor(color)}>{color}</button>)
  })

  let selectColor = null;
  if (isHost == false && conn != null) {
    selectColor = (
      <div>
        You are the color {playerColor[clientPlayerNumber]}
        <h3>Select a Color</h3>
        {content}
      </div>
    )
  }

  return (
    <>
    <h1>Welcome to catan</h1>
     <NetworkingSetup /> 
      {selectColor}
    </>
  )
}