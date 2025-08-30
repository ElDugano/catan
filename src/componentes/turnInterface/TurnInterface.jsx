import { useContext } from "react";

import { TurnStateContext } from "../../state/turnState/TurnStateContext";

import RollDiceButton from "./components/rollDiceButton";
import GatherResroucesAcknowledgement from "./components/gatherResourcesAcknowledgement";
import Idle from "./components/idle";
import BuildMenu from "./components/buildMenu";
import BuildOnMapMenu from "./components/builtOnMapMenu";

export default function TurnInterface() {
  const {isTurnStateRollingTheDice,
    isTurnStateGatheringResourcesAcknowledgement,
    isTurnStateIdle,
    isTurnStateBuildMenu,
    isTurnStateBuildingARoad,
    isTurnStateBuildingASettlement,
    isTurnStateBuildingACity
  } = useContext(TurnStateContext);

  return(
    <>
    {isTurnStateRollingTheDice() && <RollDiceButton />}
    {isTurnStateGatheringResourcesAcknowledgement() && <GatherResroucesAcknowledgement />}
    {isTurnStateIdle() && <Idle />}
    {isTurnStateBuildMenu() && <BuildMenu />}
    {(isTurnStateBuildingARoad() || isTurnStateBuildingASettlement() || isTurnStateBuildingACity()) && <BuildOnMapMenu />}
    </>
  )
}