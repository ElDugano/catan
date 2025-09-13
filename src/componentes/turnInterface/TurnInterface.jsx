import { useContext } from "react";

import { TurnStateContext } from "../../state/turnState/TurnStateContext";
import { CurrentPlayerTurnContext } from "../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";

import RollDiceMenu from "./components/RollDiceMenu.jsx";
import GatherResroucesAcknowledgement from "./components/GatherResourcesAcknowledgement";
  //---------- Thief Related ----------//
import RemoveHalfResourcesMenu from "./components/thief/RemoveHalfResourcesMenu";
import RobAPlayerMenu from "./components/thief/RobAPlayerMenu.jsx";
  //---------- Main turn ----------//
import IdleMenu from "./components/IdleMenu";
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
import TradeWithBoardMenu from "./components/trading/TradeWithBoardMenu.jsx";

export default function TurnInterface() {
  const {isClientPlayersTurn} = useContext(CurrentPlayerTurnContext);

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
    isTurnStateTradingWithTheBoard
  } = useContext(TurnStateContext);

  if (isClientPlayersTurn()) {
    return (
      <>
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
      {isTurnStateTradingWithTheBoard() && <TradeWithBoardMenu />}
      </>
    )}
  else {
    return (
      <>
        {isTurnStateGatheringResourcesAcknowledgement() && <GatherResroucesAcknowledgement />}
        {isTurnStateRemoveHalfResources() && <RemoveHalfResourcesMenu />}
      </>
    )
    
  }
}