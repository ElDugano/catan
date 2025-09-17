import { useContext } from "react";

import { TurnStateContext } from "../../../../state/turnState/TurnStateContext.js"
import { DiceContext } from "../../../../state/dice/DiceContext.js";

import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext.js";

export default function ConfirmPlayKnightDevelopmentCard() {
  const { setTurnStateToMoveTheThief, setTurnStateToSelectingADevelopmentCard, setTurnStateToRollingTheDice } = useContext(TurnStateContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);
  const { diceRolledThisTurn } = useContext(DiceContext);
  
  function playKnight() {
    setTurnStateToMoveTheThief();
    addToMessagePayloadToHost({header: "Playing a Knight Card"});
    addToMessagePayloadToHost({playKnight:true});
    sendTheMessages();
  }
  return(
    <>
    <h3>Play a Knight Card</h3>
      <button onClick={() => playKnight()}>Play Knight Card</button>
      <button onClick={() => (diceRolledThisTurn == true ? setTurnStateToSelectingADevelopmentCard() : setTurnStateToRollingTheDice())}>Go Back</button>
    </>
  )
}