import { useContext } from "react";

import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { NetworkingMessageSenderContext } from "../../networking/Host/NetworkingMessageSenderContext.js";

export default function IdleMenu() {
  const { setTurnStateToBuildMenu, setTurnStateToSelectingADevelopmentCard, setTurnStateToTradingWithTheBoard } = useContext(TurnStateContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  function endTurn() {
    addToMessagePayloadToHost({header: "End Turn"});
    addToMessagePayloadToHost({endTurn:true});
    sendTheMessages();
  }
  const buildMenu = () => {
    //addToMessagePayloadToHost({header: "Goto Build Menu"});
    //addToMessagePayloadToHost(setTurnStateToBuildMenu());
    //sendTheMessages();
    setTurnStateToBuildMenu();
  }
  const playDevelopmentCardMenu = () => {
    //addToMessagePayloadToHost({header: "Goto Play Development Card Menu"});
    //addToMessagePayloadToHost(setTurnStateToSelectingADevelopmentCard());
    //sendTheMessages();
    setTurnStateToSelectingADevelopmentCard()
  }
  const tradeResourcesMenu = () => {
    //addToMessagePayloadToHost({header: "Goto Trade Resources Menu"});
    //addToMessagePayloadToHost(setTurnStateToTradingWithTheBoard());
    //sendTheMessages();
    setTurnStateToTradingWithTheBoard()
  }

  return (
    <>
      <button onClick={buildMenu}>Build Something</button>
      <button onClick={playDevelopmentCardMenu}>Play a development card</button>
      <button onClick={tradeResourcesMenu}>Trade Resources</button>
      <button onClick={endTurn}>End Turn</button>
    </>
  )
}