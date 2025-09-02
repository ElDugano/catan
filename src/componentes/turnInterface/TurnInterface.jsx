import { useContext } from "react";

import { TurnStateContext } from "../../state/turnState/TurnStateContext";

import RollDiceButton from "./components/RollDiceButton";
import GatherResroucesAcknowledgement from "./components/GatherResourcesAcknowledgement";
  //---------- Thief Related ----------//
import RemoveHalfResourcesMenu from "./components/thief/RemoveHalfResourcesMenu";
import PillageResourceCardMenu from "./components/thief/PillageResourceCardMenu";
  //---------- Main turn ----------//
import IdleMenu from "./components/IdleMenu";
import BuildMenu from "./components/BuildMenu/BuildMenu";
import BuildOnMapMenu from "./components/BuildMenu/BuiltOnMapMenu";
import ConfirmBuyDevelopmentCardMenu from "./components/BuildMenu/ConfirmBuyDevelopmentCardMenu";
  //-----Play Development Card Related
  import SelectDevelopmentCardMenu from "./components/developmentCard/SelectDevelopmentCardMenu";
  import ConfirmPlayKnightDevelopmentCard from "./components/developmentCard/ConfirmPlayKnightDevelopmentCard";
  import ConfirmPlayRoadBuildingDevelopmentCard from "./components/developmentCard/ConfirmPlayRoadBuildingDevelopmentCard";
  import ConfirmPlayYearOfPlentyDevelopmentCard from "./components/developmentCard/ConfirmPlayYearOfPlentyDevelopmentCard";
  import YearOfPlentyMenu from "./components/developmentCard/YearOfPlentyMenu";
  import ConfirmPlayMonopolyDevelopmentCard from "./components/developmentCard/ConfirmPlayMonopolyDevelopmentCard";
  import MonopolyMenu from "./components/developmentCard/MonopolyMenu";

export default function TurnInterface() {
  const {isTurnStateRollingTheDice,
    isTurnStateGatheringResourcesAcknowledgement,
    isTurnStateRemoveHalfResources,
    isTurnStatePillageResourceCard,
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
    isTurnStateMonopoly
  } = useContext(TurnStateContext);

  return(
    <>
    {isTurnStateRollingTheDice() && <RollDiceButton />}
    {isTurnStateGatheringResourcesAcknowledgement() && <GatherResroucesAcknowledgement />}
      {/*---------- Theif Related ----------*/}
    {isTurnStateRemoveHalfResources() && <RemoveHalfResourcesMenu />}
    {isTurnStatePillageResourceCard() && <PillageResourceCardMenu />}
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
    </>
  )
}