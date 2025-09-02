import { useContext } from "react";

import { TurnStateContext } from "../../state/turnState/TurnStateContext";

import RollDiceButton from "./components/RollDiceButton";
import GatherResroucesAcknowledgement from "./components/GatherResourcesAcknowledgement";
  //---------- Thief Related ----------//
import RemoveHalfResourcesMenu from "./components/RemoveHalfResourcesMenu";
import PillageResourceCardMenu from "./components/PillageResourceCardMenu";
  //---------- Main turn ----------//
import IdleMenu from "./components/IdleMenu";
import BuildMenu from "./components/BuildMenu";
import BuildOnMapMenu from "./components/BuiltOnMapMenu";
import ConfirmBuyDevelopmentCardMenu from "./components/ConfirmBuyDevelopmentCardMenu";
  //-----Play Development Card Related
  import SelectDevelopmentCardMenu from "./components/SelectDevelopmentCardMenu";
  import ConfirmPlayKnightDevelopmentCard from "./components/ConfirmPlayKnightDevelopmentCard";
  import ConfirmPlayRoadBuildingDevelopmentCard from "./components/ConfirmPlayRoadBuildingDevelopmentCard";
  import ConfirmPlayYearOfPlentyDevelopmentCard from "./components/ConfirmPlayYearOfPlentyDevelopmentCard";
  import YearOfPlentyMenu from "./components/YearOfPlentyMenu";
  import ConfirmPlayMonopolyDevelopmentCard from "./components/ConfirmPlayerMonopolyDevelopmentCard";

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
    isTurnStateYearOfPlenty
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
    {isTurnStateConfirmPlayMonopolyDevelopmentCard() && <ConfirmPlayMonopolyDevelopmentCard />}

    {isTurnStateYearOfPlenty() && <YearOfPlentyMenu />}
    </>
  )
}