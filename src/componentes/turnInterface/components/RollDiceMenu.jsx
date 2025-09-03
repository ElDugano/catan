import { useContext } from "react";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { DiceContext } from "../../../state/dice/DiceContext.js";
import { DevelopmentCardsContext } from "../../../state/developmentCards/DevelopmentCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";

export default function RollDiceButton() {
  const { setTurnStateToGatheringResources, setTurnStateToRemoveHalfResources, setTurnStateToConfirmPlayKnightDevelopmentCard }= useContext(TurnStateContext);
  const { rollDice } = useContext(DiceContext);
  const { doesPlayerOwnsKnightDevelopmentCard } = useContext(DevelopmentCardsContext)
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);

  const PlayKnightButton = doesPlayerOwnsKnightDevelopmentCard(currentPlayerTurn) ? <button onClick={() => setTurnStateToConfirmPlayKnightDevelopmentCard()}>Knight</button> :<button disabled>Knight</button>;

  function rollTheDice() {
    if (rollDice() != 7)
      setTurnStateToGatheringResources();
    else {
      console.log("!!! A 7 was rolled so we are going to steal resrouces and move the thief.");
      setTurnStateToRemoveHalfResources();
    }
  }

  return(
    <>
    <h3>Roll the Dice</h3>
    {PlayKnightButton}
    <button onClick={rollTheDice}>Roll the Dice!</button>
    </>
  )
}