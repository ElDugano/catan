import { useContext } from "react";

import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { DevelopmentCardsContext } from "../../../state/developmentCards/DevelopmentCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";

export default function ConfirmPlayYearOfPlentyDevelopmentCard() {
  const { setTurnStateToYearOfPlenty, setTurnStateToSelectingADevelopmentCard } = useContext(TurnStateContext);
  const { playYearOfPlentyDevelopmentCard } = useContext(DevelopmentCardsContext);
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);
  
  function playYearOfPlenty() {
    playYearOfPlentyDevelopmentCard(currentPlayerTurn);
    setTurnStateToYearOfPlenty();
  }
  return(
    <>
      <h3>Play a Year of Plenty Card</h3>
      <button onClick={() => playYearOfPlenty()}>Play Year of Plenty</button>
      <button onClick={() => setTurnStateToSelectingADevelopmentCard()}>Go Back</button>
    </>
  )
}