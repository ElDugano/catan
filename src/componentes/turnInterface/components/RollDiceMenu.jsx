import { useContext } from "react";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { DiceContext } from "../../../state/dice/DiceContext.js";
import { DevelopmentCardsContext } from "../../../state/developmentCards/DevelopmentCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";

import { NetworkingMessageSenderContext } from "../../networking/Host/NetworkingMessageSenderContext.js";

export default function RollDiceMenu() {
  const {  setTurnStateToConfirmPlayKnightDevelopmentCard }= useContext(TurnStateContext);
  const { doesPlayerOwnsKnightDevelopmentCard } = useContext(DevelopmentCardsContext)
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);

  const PlayKnightButton = doesPlayerOwnsKnightDevelopmentCard(currentPlayerTurn) ? <button onClick={playKnightCard}>Knight</button> :<button disabled>Knight</button>;

  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  const playKnightCard = () => {
    addToMessagePayloadToHost(setTurnStateToConfirmPlayKnightDevelopmentCard());
    console.log("We clicked the button to play a knight card, but we haven't _really_ written this networking code.");
    console.log("We should double check what is going on, we might want the client to go to an idle state, actually.");
    sendTheMessages();
  }

  const rollTheDice = () => {
    addToMessagePayloadToHost({header: "Player Rolling the Dice"});
    addToMessagePayloadToHost({rollTheDice:true});
    sendTheMessages();
  }

  return(
    <>
    <h3>Roll the Dice</h3>
    {PlayKnightButton}
    <button onClick={rollTheDice}>Roll the Dice!</button>
    </>
  )
}