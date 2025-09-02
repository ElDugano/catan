import { useContext } from "react";

import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { PlayerResourceCardsContext } from "../../../state/playerResourceCards/PlayerResourceCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";

export default function BuildMenu() {
  const { canPlayerAffordRoad, canPlayerAffordSettlement, canPlayerAffordCity, canPlayerAffordDevelopmentCard } = useContext(PlayerResourceCardsContext);
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext)

  const { setTurnStateToIdle,
    setTurnStateToBuildingARoad,
    setTurnStateToBuildingASettlement,
    setTurnStateToBuildingACity,
    setTurnStateToConfirmBuyingDevelopmentCard
  } = useContext(TurnStateContext);

  const BuildRoadButton = canPlayerAffordRoad(currentPlayerTurn) ? <button onClick={() => setTurnStateToBuildingARoad()}>Build Road</button> : <button disabled>Build Road</button>;
  const BuildSettlementButton = canPlayerAffordSettlement(currentPlayerTurn) ? <button onClick={() => setTurnStateToBuildingASettlement()}>Build Settlement</button> : <button disabled>Build Settlement</button>;
  const BuildCityButton = canPlayerAffordCity(currentPlayerTurn) ? <button onClick={() => setTurnStateToBuildingACity()}>Build City</button> : <button disabled>Build City</button>;
  const BuildDevelopmentCardButton = canPlayerAffordDevelopmentCard(currentPlayerTurn) ? <button onClick={() => setTurnStateToConfirmBuyingDevelopmentCard()}>Build Development Card</button> : <button disabled>Build Development Card</button>;

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