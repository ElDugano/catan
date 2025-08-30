import { useContext } from "react";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { DiceContext } from "../../../state/dice/diceContext.js";

export default function RollDiceButton() {
  const {setTurnStateToGatheringResources, setTurnStateToRemoveHalfResources}= useContext(TurnStateContext);
  const {rollDice} = useContext(DiceContext);

  function rollTheDice() {
    console.log("Keep rollin' rollin' rollin'");
    if (rollDice() != 7)
      setTurnStateToGatheringResources();
    else {
      console.log("!!! A 7 was rolled so we are going to thief. Called from Dice.jsx");
      setTurnStateToRemoveHalfResources();
    }
  }
  
  return(
    <button onClick={rollTheDice}>Roll the Dice!</button>
  )
}