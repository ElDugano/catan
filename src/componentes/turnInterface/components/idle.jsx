import { useContext } from "react";

import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";

export default function Idle() {
  const { setTurnStateToBuildMenu, setTurnStateToRollingTheDice } = useContext(TurnStateContext);
  const  {gotoNextPlayerTurn } = useContext(CurrentPlayerTurnContext);

  function endTurn() {
    gotoNextPlayerTurn();
    setTurnStateToRollingTheDice();
  } 


  return (
    <>
      <button onClick={() => setTurnStateToBuildMenu()}>Build stuff?</button>
      <button onClick={() => console.log("Time to play a development card.")}>Play a development card</button>
      <button onClick={() => console.log("Time to trade.")}>Trade stuff?</button>
      <button onClick={() => endTurn()}>End Turn</button>
    </>
  )
}