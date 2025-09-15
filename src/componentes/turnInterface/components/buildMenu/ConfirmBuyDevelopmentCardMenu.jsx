import { useContext } from "react";
import { TurnStateContext } from "../../../../state/turnState/TurnStateContext.js"
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { DevelopmentCardsContext } from "../../../../state/developmentCards/DevelopmentCardsContext.js";
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext.js";
import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext.js";

export default function ConfirmBuyDevelopmentCardMenu() {
  const { setTurnStateToBuildMenu } = useContext(TurnStateContext);;
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  const buyDevelopmentCard = () => {

    addToMessagePayloadToHost({header: "Buying a Development Card"});
    addToMessagePayloadToHost({buyDevelopmentCard:true});
    sendTheMessages();
  }

  const goBackButton = () => {
    setTurnStateToBuildMenu();
  }

  return (
    <>
      <h3>Buy a Development Card</h3>
      <button onClick={buyDevelopmentCard}>Buy the card</button>
      <button onClick={goBackButton}>Go Back</button>
    </>
  )
}