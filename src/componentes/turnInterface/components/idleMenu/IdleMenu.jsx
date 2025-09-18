import { useContext } from "react";

import { TurnStateContext } from "../../../../state/turnState/TurnStateContext.js"
import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext.js";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { PlayerColorContext } from "../../../../state/playerColor/PlayerColorContext.js";

import "./idleMenu.css"

export default function IdleMenu() {
  const { setTurnStateToBuildMenu, setTurnStateToSelectingADevelopmentCard, setTurnStateToTradingWithTheBoard } = useContext(TurnStateContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);
  const { clientPlayerNumber } = useContext(CurrentPlayerTurnContext);
  const { playerColor } = useContext(PlayerColorContext);
  const localPlayerColor = playerColor[clientPlayerNumber];

  function endTurn() {
    addToMessagePayloadToHost({header: "End Turn"});
    addToMessagePayloadToHost({endTurn:true});
    sendTheMessages();
  }
  const buildMenu = () => {
    setTurnStateToBuildMenu();
  }
  const playDevelopmentCardMenu = () => {
    setTurnStateToSelectingADevelopmentCard()
  }
  const tradeResourcesMenu = () => {
    setTurnStateToTradingWithTheBoard()
  }

  return (
    <>
      <div className={"idleMenu idleMenuColor"+localPlayerColor}>
        <button onClick={buildMenu}>Build Something</button>
        <button onClick={playDevelopmentCardMenu}>Play a development card</button>
        <button onClick={tradeResourcesMenu}>Trade Resources</button>
        <button onClick={endTurn}>End Turn</button>
      </div>
    </>
  )
}