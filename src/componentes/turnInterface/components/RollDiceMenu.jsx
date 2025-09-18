import { useContext } from "react";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { DevelopmentCardsContext } from "../../../state/developmentCards/DevelopmentCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";

import { NetworkingMessageSenderContext } from "../../networking/Host/NetworkingMessageSenderContext.js";

export default function RollDiceMenu() {
  const { setTurnStateToConfirmPlayKnightDevelopmentCard }= useContext(TurnStateContext);
  const { doesPlayerOwnsKnightDevelopmentCard } = useContext(DevelopmentCardsContext)
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  const playKnightCard = () => {
    setTurnStateToConfirmPlayKnightDevelopmentCard();
  }
  const PlayKnightButton = doesPlayerOwnsKnightDevelopmentCard(currentPlayerTurn) ? <button onClick={playKnightCard}>Play Knight Card</button> :<button disabled>Play Knight Card</button>;

  const rollTheDice = () => {
    addToMessagePayloadToHost({header: "Player Rolling the Dice"});
    addToMessagePayloadToHost({rollTheDice:true});
    sendTheMessages();
  }

  return(
    <>
    <h2>It is Your Turn</h2>
    <button onClick={rollTheDice}>Roll the Dice</button>
    {PlayKnightButton}
    </>
  )
}