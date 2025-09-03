import { useContext } from "react";

import { TurnStateContext } from "../../../../state/turnState/TurnStateContext.js"
import { DevelopmentCardsContext } from "../../../../state/developmentCards/DevelopmentCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { ScoreBoardContext } from "../../../../state/scoreBoard/ScoreBoardContext.js";

export default function ConfirmPlayKnightDevelopmentCard() {
  const { setTurnStateToMoveTheThief, setTurnStateToSelectingADevelopmentCard } = useContext(TurnStateContext);
  const { getPlayerArmyStrength, playKnightDevelopmentCard } = useContext(DevelopmentCardsContext);
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);
  const { checkIfLargestArmy } = useContext(ScoreBoardContext)
  
  function playKnight() {
    checkIfLargestArmy(currentPlayerTurn, getPlayerArmyStrength(currentPlayerTurn)+1)
      //We check this before and add 1 because state won't be updated yet, unless we add this check elsewhere.
      //We could make this into it's own state, like I am doing with the longest road.
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