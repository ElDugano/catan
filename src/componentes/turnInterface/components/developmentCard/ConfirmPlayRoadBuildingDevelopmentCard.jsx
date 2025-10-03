import { useContext } from "react";

import { TurnStateContext } from "../../../../state/turnState/TurnStateContext.js"

import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext.js";

export default function ConfirmPlayRoadBuildingDevelopmentCard() {
  const { setTurnStateToRoadBuilderCardFirstRoad, setTurnStateToSelectingADevelopmentCard } = useContext(TurnStateContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);
  
  function playRoadBuilding() {
    addToMessagePayloadToHost({header: "Playing Road Builder"});
    addToMessagePayloadToHost({playRoadBuilder:true});
    sendTheMessages();
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