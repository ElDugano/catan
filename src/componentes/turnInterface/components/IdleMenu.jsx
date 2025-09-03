import { useContext } from "react";

import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { DevelopmentCardsContext } from "../../../state/developmentCards/DevelopmentCardsContext.js";
import { ScoreBoardContext } from "../../../state/scoreBoard/ScoreBoardContext.js";

export default function IdleMenu() {
  const { setTurnStateToBuildMenu, setTurnStateToSelectingADevelopmentCard, setTurnStateToRollingTheDice } = useContext(TurnStateContext);
  const { gotoNextPlayerTurn } = useContext(CurrentPlayerTurnContext);
  const { makePlayerPurchasedDevelopmentAvailableToPlay, getJustPurchasedPlayerVictoryPointCards } = useContext(DevelopmentCardsContext);
  const { addPointsToPlayerHiddenPoints } = useContext(ScoreBoardContext);

  function endTurn() {
    let nextPlayer = gotoNextPlayerTurn();
    //console.log("The next player, who is Player "+nextPlayer+" has the following VP cards.")
    //console.log(getPlayerVictoryPointCards(nextPlayer));
    addPointsToPlayerHiddenPoints(nextPlayer, getJustPurchasedPlayerVictoryPointCards(nextPlayer));
    makePlayerPurchasedDevelopmentAvailableToPlay(nextPlayer);
    setTurnStateToRollingTheDice();
  } 


  return (
    <>
      <button onClick={() => setTurnStateToBuildMenu()}>Build Something</button>
      <button onClick={() => setTurnStateToSelectingADevelopmentCard()}>Play a development card</button>
      <button onClick={() => console.log("Time to trade.")}>Trade Resources</button>
      <button onClick={() => endTurn()}>End Turn</button>
    </>
  )
}