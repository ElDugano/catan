import { useContext } from "react";

import { GameStateContext } from "../../state/gameState/GameStateContext";
import { TurnStateContext } from "../../state/turnState/TurnStateContext";

import RollDiceButton from "./components/rollDiceButton";
import GatherResrouces from "./components/gatherResources";

export default function TurnInterface() {
  const {isTurnStateRollingTheDice, isTurnStateGatheringResources,}= useContext(TurnStateContext);

  return(
    <>
    {isTurnStateRollingTheDice() && <RollDiceButton />}
    {isTurnStateGatheringResources() && <GatherResrouces />}
    </>
  )
}