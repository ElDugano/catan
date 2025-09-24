import { useContext } from "react";

import { GameStateContext } from "../../state/gameState/GameStateContext.js";
import { TurnStateContext } from "../../state/turnState/TurnStateContext";
import { CurrentPlayerTurnContext } from "../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { PlayerColorContext } from "../../state/playerColor/PlayerColorContext.js";

import ClientHud from "./components/clientHud/ClientHud.jsx";

import RollDiceMenu from "./components/RollDiceMenu.jsx";
import GatherResroucesAcknowledgement from "./components/GatherResourcesAcknowledgement";
  //---------- Thief Related ----------//
import RemoveHalfResourcesMenu from "./components/thief/RemoveHalfResourcesMenu";
import RobAPlayerMenu from "./components/thief/RobAPlayerMenu.jsx";
  //---------- Main turn ----------//
import IdleMenu from "./components/idleMenu/IdleMenu.jsx";
import BuildMenu from "./components/buildMenu/BuildMenu";
import BuildOnMapMenu from "./components/buildMenu/BuiltOnMapMenu";
import ConfirmBuyDevelopmentCardMenu from "./components/buildMenu/ConfirmBuyDevelopmentCardMenu";
  //-----Play Development Card Related
  import SelectDevelopmentCardMenu from "./components/developmentCard/SelectDevelopmentCardMenu";
  import ConfirmPlayKnightDevelopmentCard from "./components/developmentCard/ConfirmPlayKnightDevelopmentCard";
  import ConfirmPlayRoadBuildingDevelopmentCard from "./components/developmentCard/ConfirmPlayRoadBuildingDevelopmentCard";
  import ConfirmPlayYearOfPlentyDevelopmentCard from "./components/developmentCard/ConfirmPlayYearOfPlentyDevelopmentCard";
  import YearOfPlentyMenu from "./components/developmentCard/YearOfPlentyMenu";
  import ConfirmPlayMonopolyDevelopmentCard from "./components/developmentCard/ConfirmPlayMonopolyDevelopmentCard";
  import MonopolyMenu from "./components/developmentCard/MonopolyMenu";
  //-----Trading Related
import TradeMenu from "./components/trading/TradeMenu.jsx";
import ReviewingTradeOffer from "./components/trading/ReviewTradeOffer.jsx";

export default function TurnInterface() {
  const { isGameStateMainGame } = useContext(GameStateContext);
  const { isClientPlayersTurn, clientPlayerNumber } = useContext(CurrentPlayerTurnContext);
  const { playerColor } = useContext(PlayerColorContext);
  const localPlayerColor = playerColor[clientPlayerNumber];

  const {isTurnStateRollingTheDice,
    isTurnStateGatheringResourcesAcknowledgement,
    isTurnStateRemoveHalfResources,
    isTurnStateRobAPlayer,
    isTurnStateIdle,
    isTurnStateBuildMenu,
    isTurnStateBuildingARoad,
    isTurnStateBuildingASettlement,
    isTurnStateBuildingACity,
    isTurnStateConfirmBuyingDevelopmentCard,
    //----- Play Development Card -----//
    isTurnStateSelectingADevelopmentCard,
    isTurnStateConfirmPlayKnightDevelopmentCard,
    isTurnStateConfirmPlayRoadBuilderDevelopmentCard,
    isTurnStateConfirmPlayYearOfPlentyDevelopmentCard,
    isTurnStateConfirmPlayMonopolyDevelopmentCard,
    isTurnStateYearOfPlenty,
    isTurnStateMonopoly,
    //----- Trading -----//
    isTurnStateTrading,
    isTurnStateReviewingTradeOffer
  } = useContext(TurnStateContext);
  

  if (isClientPlayersTurn() && isGameStateMainGame()) {
    return (
      <div className={"clientMenu clientMenuColor"+localPlayerColor}>
      <ClientHud />
      {isTurnStateRollingTheDice() && <RollDiceMenu />}
      {isTurnStateGatheringResourcesAcknowledgement() && <GatherResroucesAcknowledgement />}
        {/*---------- Theif Related ----------*/}
      {isTurnStateRemoveHalfResources() && <RemoveHalfResourcesMenu />}
      {isTurnStateRobAPlayer() && <RobAPlayerMenu />}
        {/*---------- Main Turn ----------*/}
      {isTurnStateIdle() && <IdleMenu />}
        {/*---------- Build Menu ----------*/}
      {isTurnStateBuildMenu() && <BuildMenu />}
        {(isTurnStateBuildingARoad() || isTurnStateBuildingASettlement() || isTurnStateBuildingACity()) && <BuildOnMapMenu />}
        {isTurnStateConfirmBuyingDevelopmentCard() && <ConfirmBuyDevelopmentCardMenu />}
        {/*---------- Select & Playing Development Card ----------*/}
      {isTurnStateSelectingADevelopmentCard() && <SelectDevelopmentCardMenu />}
      {isTurnStateConfirmPlayKnightDevelopmentCard() && <ConfirmPlayKnightDevelopmentCard />}
      {isTurnStateConfirmPlayRoadBuilderDevelopmentCard() && <ConfirmPlayRoadBuildingDevelopmentCard />}
      {isTurnStateConfirmPlayYearOfPlentyDevelopmentCard() && <ConfirmPlayYearOfPlentyDevelopmentCard />}
        {isTurnStateYearOfPlenty() && <YearOfPlentyMenu />}
      {isTurnStateConfirmPlayMonopolyDevelopmentCard() && <ConfirmPlayMonopolyDevelopmentCard />}
        {isTurnStateMonopoly() && <MonopolyMenu />}
      {/*---------- Trading With the Board ----------*/}
      {isTurnStateTrading() && <TradeMenu />}
      {isTurnStateReviewingTradeOffer() && <ReviewingTradeOffer />}
      </div>
    )}
  else {
    return (
      <div className={"clientMenu clientMenuColor"+localPlayerColor}>
        <ClientHud />
        {isTurnStateGatheringResourcesAcknowledgement() && <GatherResroucesAcknowledgement />}
        {isTurnStateRemoveHalfResources() && <RemoveHalfResourcesMenu />}
        {isTurnStateReviewingTradeOffer() && <ReviewingTradeOffer />}
      </div>
    )
    
  }
}