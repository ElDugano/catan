import { useContext } from "react";

import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { DevelopmentCardsContext } from "../../../state/developmentCards/DevelopmentCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";

export default function ConfirmPlayMonopolyDevelopmentCard() {
  const { setTurnStateToMonopoly, setTurnStateToSelectingADevelopmentCard } = useContext(TurnStateContext);
  const { playMonopolyDevelopmentCard } = useContext(DevelopmentCardsContext);
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);
  
  function playMonopoly() {
    alert("Spend the card and goto the monopoly menu, once we have it.")
    //playMonopolyDevelopmentCard(currentPlayerTurn);
    //setTurnStateToMonopoly();
  }
  return(
    <>
      <h3>Play a Monopoly Card</h3>
      <button onClick={() => playMonopoly()}>Play Monopoly</button>
      <button onClick={() => setTurnStateToSelectingADevelopmentCard()}>Go Back</button>
    </>
  )
}