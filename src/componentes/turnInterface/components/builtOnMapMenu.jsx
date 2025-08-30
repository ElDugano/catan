import { useContext } from "react";

import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"

export default function BuildOnMapMenu() {
  const { setTurnStateToBuildMenu} = useContext(TurnStateContext);


  return (
    <>
      <button onClick={() => setTurnStateToBuildMenu()}>Go Back</button>
    </>
  )
}