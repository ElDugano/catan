import { useContext } from "react";

import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { NetworkingMessageSenderContext } from "../../networking/Host/NetworkingMessageSenderContext.js";

export default function IdleMenu() {
  const { setTurnStateToBuildMenu, setTurnStateToSelectingADevelopmentCard, setTurnStateToTradingWithTheBoard } = useContext(TurnStateContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  function endTurn() {
    addToMessagePayloadToHost({header: "End Turn"});
    addToMessagePayloadToHost({endTurn:true});
    sendTheMessages();
  }

  return (
    <>
      <button onClick={setTurnStateToBuildMenu}>Build Something</button>
      <button onClick={setTurnStateToSelectingADevelopmentCard}>Play a development card</button>
      <button onClick={setTurnStateToTradingWithTheBoard}>Trade Resources</button>
      <button onClick={endTurn}>End Turn</button>
    </>
  )
}