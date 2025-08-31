import { useContext } from "react";

import { TurnStateContext } from "../../../state/turnState/TurnStateContext"

export default function SelectDevelopmentCardMenu() {
  const { setTurnStateToMoveTheThief, setTurnStateToRoadBuilderCardFirstRoad, setTurnStateToIdle } = useContext(TurnStateContext);
  return (
    <>
    <h3>Select what develoment card you would like to player.</h3>
      <button onClick={() => setTurnStateToMoveTheThief()}>Knight</button>
      <button onClick={() => setTurnStateToRoadBuilderCardFirstRoad()}>Road Building</button>
      <button onClick={() => console.log("Playing a Year of Plenty card")}>Year of Plenty</button>
      <button onClick={() => console.log("Playing a Monopoly card")}>Monopoly</button>
      <button onClick={() => setTurnStateToIdle()}>Go Back</button>
    </>

  )
}