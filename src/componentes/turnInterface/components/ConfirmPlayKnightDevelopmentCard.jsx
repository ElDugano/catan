import { useContext } from "react";

import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { DevelopmentCardsContext } from "../../../state/developmentCards/DevelopmentCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";

export default function ConfirmPlayKnightDevelopmentCard() {
  const { setTurnStateToMoveTheThief, setTurnStateToSelectingADevelopmentCard } = useContext(TurnStateContext);
  const { playKnightDevelopmentCard } = useContext(DevelopmentCardsContext);
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);
  
  function playKnight() {
    playKnightDevelopmentCard(currentPlayerTurn);
    setTurnStateToMoveTheThief();
  }
  return(
    <>
    <h3>Play a Knight Card</h3>
      <button onClick={() => playKnight()}>Play Knight Card</button>
      <button onClick={() => setTurnStateToSelectingADevelopmentCard()}>Go Back</button>
    </>
  )
}