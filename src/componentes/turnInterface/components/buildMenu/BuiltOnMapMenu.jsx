import { useContext } from "react";

import { TurnStateContext } from "../../../../state/turnState/TurnStateContext.js"
import { GameStateContext } from "../../../../state/gameState/GameStateContext.js";

export default function BuildOnMapMenu() {
  const { setTurnStateToBuildMenu} = useContext(TurnStateContext);
  const { isGameStateMainGame } = useContext(GameStateContext)

  if(isGameStateMainGame())
    return (
      <>
        <button onClick={() => setTurnStateToBuildMenu()}>Go Back</button>
      </>
    )
  else
    return
}