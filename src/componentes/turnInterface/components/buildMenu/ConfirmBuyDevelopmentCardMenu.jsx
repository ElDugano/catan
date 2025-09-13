import { useContext } from "react";
import { TurnStateContext } from "../../../../state/turnState/TurnStateContext.js"
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { DevelopmentCardsContext } from "../../../../state/developmentCards/DevelopmentCardsContext.js";
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext.js";
import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext.js";

export default function ConfirmBuyDevelopmentCardMenu() {
  const {setTurnStateToIdle} = useContext(TurnStateContext);;
  const {currentPlayerTurn} = useContext(CurrentPlayerTurnContext);
  const {givePlayerDevelopmentCardFromDeck} = useContext(DevelopmentCardsContext);
  const {removePlayerResourcesToBuildDevelopmentCard} = useContext(PlayerResourceCardsContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  const buyDevelopmentCard = () => {
    addToMessagePayloadToHost(givePlayerDevelopmentCardFromDeck(currentPlayerTurn));     //TODO
    addToMessagePayloadToHost(removePlayerResourcesToBuildDevelopmentCard(currentPlayerTurn));
    addToMessagePayloadToHost(setTurnStateToIdle());
    sendTheMessages();
  }

  const goBackButton = () => {
    addToMessagePayloadToHost({header: "Goto Build Menu"});
    addToMessagePayloadToHost(setTurnStateToIdle());
    sendTheMessages();
  }

  return (
    <>
      <h3>Buy a Development Card</h3>
      <button onClick={() => buyDevelopmentCard()}>Buy the card</button>
      <button onClick={goBackButton}>Go Back</button>
    </>
  )
}