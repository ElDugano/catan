import { useContext } from "react";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { DiceContext } from "../../../state/dice/DiceContext.js";

export default function RollDiceButton() {
  const {setTurnStateToGatheringResources, setTurnStateToRemoveHalfResources}= useContext(TurnStateContext);
  const {rollDice, setDice} = useContext(DiceContext);

  function rollTheDice() {
    console.log("Keep rollin' rollin' rollin'");
    if (rollDice() != 7)
      setTurnStateToGatheringResources();
    else {
      console.log("!!! A 7 was rolled so we are going to steal resrouces and move the thief.");
      setTurnStateToRemoveHalfResources();
    }
  }

  return(
    <>
    <button onClick={rollTheDice}>Roll the Dice!</button>
    </>
  )
}