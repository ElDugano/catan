import { useContext } from "react";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { DevelopmentCardsContext } from "../../../state/developmentCards/DevelopmentCardsContext.js";
import { PlayerResourceCardsContext } from "../../../state/playerResourceCards/PlayerResourceCardsContext.js";

export default function ConfirmBuyDevelopmentCardMenu() {
  const {setTurnStateToIdle} = useContext(TurnStateContext);;
  const {currentPlayerTurn} = useContext(CurrentPlayerTurnContext);
  const {givePlayerDevelopmentCardFromDeck} = useContext(DevelopmentCardsContext);
  const {removePlayerResourcesToBuildDevelopmentCard} = useContext(PlayerResourceCardsContext);

  function buyDevelopmentCard(){
    givePlayerDevelopmentCardFromDeck(currentPlayerTurn);
    removePlayerResourcesToBuildDevelopmentCard(currentPlayerTurn);
    setTurnStateToIdle();
  }

  return (
    <>
      <h3>Buy a Development Card</h3>
      <button onClick={() => buyDevelopmentCard()}>Buy the card</button>
      <button onClick={() => setTurnStateToIdle()}>Go Back</button>
    </>
  )
}