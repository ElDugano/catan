import { useContext } from "react";

import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { DevelopmentCardsContext } from "../../../state/developmentCards/DevelopmentCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";

export default function ConfirmPlayRoadBuildingDevelopmentCard() {
  const { setTurnStateToRoadBuilderCardFirstRoad, setTurnStateToSelectingADevelopmentCard } = useContext(TurnStateContext);
  const { playRoadBuildingDevelopmentCard } = useContext(DevelopmentCardsContext);
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);
  
  function playRoadBuilding() {
    playRoadBuildingDevelopmentCard(currentPlayerTurn);
    setTurnStateToRoadBuilderCardFirstRoad();
  }
  return(
    <>
      <h3>Play a Road Building Card</h3>
      <button onClick={() => playRoadBuilding()}>Play Road Building</button>
      <button onClick={() => setTurnStateToSelectingADevelopmentCard()}>Go Back</button>
    </>
  )
}