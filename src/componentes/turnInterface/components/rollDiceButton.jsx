import { useContext } from "react";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"

export default function RollDiceButton() {
  const {setTurnStateToGatheringResources}= useContext(TurnStateContext);

  function rollDice() {
    console.log("We rolled some dice");
    setTurnStateToGatheringResources();
  }
  
  console.log("WE SHOULD BE ROLLING THE DICE!")
  return(
    <button onClick={rollDice}>Roll the Dice!</button>
  )
}