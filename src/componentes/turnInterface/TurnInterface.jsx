import { useContext } from "react";

import { GameStateContext } from "../../state/gameState/GameStateContext";
import { TurnStateContext } from "../../state/turnState/TurnStateContext";

import RollDiceButton from "./components/rollDiceButton";
import GatherResroucesAcknowledgement from "./components/gatherResourcesAcknowledgement";
import Idle from "./components/idle";

export default function TurnInterface() {
  const {isTurnStateRollingTheDice, isTurnStateGatheringResourcesAcknowledgement, isTurnStateIdle}= useContext(TurnStateContext);

  return(
    <>
    {isTurnStateRollingTheDice() && <RollDiceButton />}
    {isTurnStateGatheringResourcesAcknowledgement() && <GatherResroucesAcknowledgement />}
    {isTurnStateIdle() && <Idle />}
    </>
  )
}