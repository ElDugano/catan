import { useContext } from "react";

import { TurnStateContext } from "../../state/turnState/TurnStateContext";

import RollDiceButton from "./components/rollDiceButton";
import GatherResroucesAcknowledgement from "./components/gatherResourcesAcknowledgement";
  //---------- Thief Related ----------//
import RemoveHalfResourcesMenu from "./components/removeHalfResourcesMenu";
  //---------- Main turn ----------//
import IdleMenu from "./components/idleMenu";
import BuildMenu from "./components/buildMenu";
import BuildOnMapMenu from "./components/builtOnMapMenu";
import SelectDevelopmentCardMenu from "./components/selectDevelopmentCardMenu";

export default function TurnInterface() {
  const {isTurnStateRollingTheDice,
    isTurnStateGatheringResourcesAcknowledgement,
    isTurnStateRemoveHalfResources,
    isTurnStateIdle,
    isTurnStateBuildMenu,
    isTurnStateBuildingARoad,
    isTurnStateBuildingASettlement,
    isTurnStateBuildingACity,
    isTurnStateSelectingADevelopmentCard
  } = useContext(TurnStateContext);

  return(
    <>
    {isTurnStateRollingTheDice() && <RollDiceButton />}
    {isTurnStateGatheringResourcesAcknowledgement() && <GatherResroucesAcknowledgement />}
      {/*---------- Theif Related ----------*/}
    {isTurnStateRemoveHalfResources() && <RemoveHalfResourcesMenu />}
      {/*---------- Main Turn ----------*/}
    {isTurnStateIdle() && <IdleMenu />}
    {isTurnStateBuildMenu() && <BuildMenu />}
    {(isTurnStateBuildingARoad() || isTurnStateBuildingASettlement() || isTurnStateBuildingACity()) && <BuildOnMapMenu />}
    {isTurnStateSelectingADevelopmentCard() && <SelectDevelopmentCardMenu />}
    </>
  )
}