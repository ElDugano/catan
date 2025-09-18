import { useContext } from "react";

import { TurnStateContext } from "../../../../state/turnState/TurnStateContext.js"
import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext.js";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { PlayerColorContext } from "../../../../state/playerColor/PlayerColorContext.js";
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext.js";
import { DevelopmentCardsContext } from "../../../../state/developmentCards/DevelopmentCardsContext.js";

import "./idleMenu.css"

export default function IdleMenu() {
  const { setTurnStateToBuildMenu, setTurnStateToSelectingADevelopmentCard, setTurnStateToTradingWithTheBoard } = useContext(TurnStateContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);
  const { clientPlayerNumber } = useContext(CurrentPlayerTurnContext);
  const { playerColor } = useContext(PlayerColorContext);
  const { canPlayerAffordRoad,
          canPlayerAffordSettlement,
          canPlayerAffordCity,
          canPlayerAffordDevelopmentCard,
          getPlayerTotalResourceCards } = useContext(PlayerResourceCardsContext);
  const { totalPlayerDevelopmentCardHand } = useContext(DevelopmentCardsContext);
  const localPlayerColor = playerColor[clientPlayerNumber];

  function endTurn() {
    addToMessagePayloadToHost({header: "End Turn"});
    addToMessagePayloadToHost({endTurn:true});
    sendTheMessages();
  }
  const buildMenu = () => {
    setTurnStateToBuildMenu();
  }
  const playDevelopmentCardMenu = () => {
    setTurnStateToSelectingADevelopmentCard()
  }
  const tradeResourcesMenu = () => {
    setTurnStateToTradingWithTheBoard()
  }

  const buildButton = (
    canPlayerAffordRoad(clientPlayerNumber) != false ||
    canPlayerAffordDevelopmentCard(clientPlayerNumber) != false ||
    canPlayerAffordSettlement(clientPlayerNumber) != false ||
    canPlayerAffordCity(clientPlayerNumber) != false ?
    <button onClick={buildMenu}>Build Something</button> :
    <button disabled onClick={buildMenu}>Build Something</button>
  );
  const developmentCardButton = (
    totalPlayerDevelopmentCardHand[clientPlayerNumber] != 0 ?
    <button onClick={playDevelopmentCardMenu}>Play a development card</button> :
    <button disabled onClick={playDevelopmentCardMenu}>Play a development card</button>
  );
  const tradeResourcesButton = (
    getPlayerTotalResourceCards(clientPlayerNumber) != 0 ?
    <button onClick={tradeResourcesMenu}>Trade Resources</button> :
    <button disabled onClick={tradeResourcesMenu}>Trade Resources</button>
  );

  return (
    <>
      <div className={"clientMenu clientMenuColor"+localPlayerColor}>
        {buildButton}
        {developmentCardButton}
        {tradeResourcesButton}
        <button onClick={endTurn}>End Turn</button>
      </div>
    </>
  )
}