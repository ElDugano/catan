import { useContext } from "react";
import { CurrentPlayerTurnContext } from "../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerColorContext } from "../../state/playerColor/PlayerColorContext";
import { NetworkingMessageSenderContext } from "../networking/Host/NetworkingMessageSenderContext";

export default function GameSetupClient() {
  const { clientPlayerNumber, numberOfPlayers } = useContext(CurrentPlayerTurnContext);
  const { playerColor } = useContext(PlayerColorContext);
    const {addToMessagePayloadToHost, sendTheMessages} = useContext(NetworkingMessageSenderContext);

  const availableColors = ["Blue", "Red", "Indigo", "Gold", "Orange", "Green"];
  const selectedColors = [false, false, false, false, false, false];

  const setColor = (color) => {
    addToMessagePayloadToHost({ header:"Select a Color" });
    addToMessagePayloadToHost({ selectColor:{player:clientPlayerNumber, color:color} });
    sendTheMessages();
  }

  playerColor.forEach((color) => {
    const chosenColorIndex = availableColors.indexOf(color);
    if (chosenColorIndex !== -1) {
      selectedColors[chosenColorIndex] = true;
    }
  })

  let content = [];
  availableColors.forEach((color, index) => {
    if (selectedColors[index] == false)
      content.push(
        <button key={
          crypto.randomUUID()}
          onClick={() => setColor(color)}
          className={"playerButton"+color}
        >
          {color}
        </button>
      )
    else
      content.push(
        <button key={
          crypto.randomUUID()}
          disabled
        >
          {color}
        </button>
      )
  })

  return (
    <div>
      You are the color {playerColor[clientPlayerNumber]}
        <h3>Select a Color</h3>
      <div className={"clientMenu"}>
        <div className={"selectPlayerColorMenu"}>
          {content}
        </div>
      </div>
    </div>
  )
}