import { useContext } from "react";

import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";

export default function IdleMenu() {
  const { setTurnStateToBuildMenu, setTurnStateToSelectingADevelopmentCard, setTurnStateToTradingWithTheBoard, setTurnStateToStartTurn } = useContext(TurnStateContext);
  const { gotoNextPlayerTurn } = useContext(CurrentPlayerTurnContext);

  function endTurn() {
    console.log("Ending the turn");
    gotoNextPlayerTurn();
    setTurnStateToStartTurn();
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