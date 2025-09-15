import { useContext } from "react";

import { TurnStateContext } from "../../../../state/turnState/TurnStateContext.js"
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { PlayerAvailableBuildingsContext } from "../../../../state/playerAvailableBuildings/PlayerAvailableBuildingsContext.js";
import { DevelopmentCardsContext } from "../../../../state/developmentCards/DevelopmentCardsContext.js";
import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext.js";


export default function BuildMenu() {
  const { canPlayerAffordRoad, canPlayerAffordSettlement, canPlayerAffordCity, canPlayerAffordDevelopmentCard } = useContext(PlayerResourceCardsContext);
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext)
  const { returnAvailableRoads, returnAvailableSettlements, returnAvailableCities } = useContext(PlayerAvailableBuildingsContext);
  const { returnAvailableDevelopmentCards } = useContext(DevelopmentCardsContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  const { setTurnStateToIdle,
    setTurnStateToBuildingARoad,
    setTurnStateToBuildingASettlement,
    setTurnStateToBuildingACity,
    setTurnStateToConfirmBuyingDevelopmentCard
  } = useContext(TurnStateContext);

  const buildRoadFunction = () => {
    //addToMessagePayloadToHost({header: "Goto Build A Road"});
    //addToMessagePayloadToHost(setTurnStateToBuildingARoad());
    //sendTheMessages();
    setTurnStateToBuildingARoad();
  }
  const buildSettlementFunction = () => {
    addToMessagePayloadToHost({header: "Goto Build A Road"});
    addToMessagePayloadToHost(setTurnStateToBuildingASettlement());
    sendTheMessages();
  }
  const buildCityFunction = () => {
    addToMessagePayloadToHost({header: "Goto Build A Road"});
    addToMessagePayloadToHost(setTurnStateToBuildingACity());
    sendTheMessages();
  }
  const BuyDevelopmentCardFunction = () => {
    addToMessagePayloadToHost({header: "Goto Build A Road"});
    addToMessagePayloadToHost(setTurnStateToConfirmBuyingDevelopmentCard());
    sendTheMessages();
  }

  const BuildRoadButton = canPlayerAffordRoad(currentPlayerTurn) && returnAvailableRoads(currentPlayerTurn) ? <button onClick={buildRoadFunction}>Build Road</button> : <button disabled>Build Road</button>;
  const BuildSettlementButton = canPlayerAffordSettlement(currentPlayerTurn) && returnAvailableSettlements(currentPlayerTurn) ? <button onClick={buildSettlementFunction}>Build Settlement</button> : <button disabled>Build Settlement</button>;
  const BuildCityButton = canPlayerAffordCity(currentPlayerTurn) && returnAvailableCities(currentPlayerTurn) ? <button onClick={buildCityFunction}>Build City</button> : <button disabled>Build City</button>;
  const BuildDevelopmentCardButton = canPlayerAffordDevelopmentCard(currentPlayerTurn) && returnAvailableDevelopmentCards() ? <button onClick={BuyDevelopmentCardFunction}>Buy Development Card</button> : <button disabled>Build Development Card</button>;



  return (
    <>
    <h3>Build Menu</h3>
      {BuildRoadButton}
      {BuildSettlementButton}
      {BuildCityButton}
      {BuildDevelopmentCardButton}
      <button onClick={() => setTurnStateToIdle()}>Go Back</button>
    </>
  )
}