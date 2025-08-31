import { useContext, useEffect } from "react";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"
import { PlayerResourceCardsContext } from "../../../state/playerResourceCards/PlayerResourceCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";

export default function GatherResroucesAcknowledgement() {
  const {setTurnStateToIdle} = useContext(TurnStateContext);
  const {previouslyGainedResources} = useContext(PlayerResourceCardsContext);
  const {currentPlayerTurn} = useContext(CurrentPlayerTurnContext);

  function gotoIdleState() {
    setTurnStateToIdle();
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('Auto Skip this');
      setTurnStateToIdle();
    }, 5000); // Delay of 5000 milliseconds (2 seconds)

    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, [setTurnStateToIdle]); // Empty dependency array ensures this runs once

  console.log(previouslyGainedResources[currentPlayerTurn]);
  const resourcesGained = [];
  for (let resourceName in previouslyGainedResources[currentPlayerTurn]) {
    resourcesGained.push(previouslyGainedResources[currentPlayerTurn][resourceName]+" "+resourceName+". ")
  }

  return (
    <>
      {resourcesGained.length != 0 ? "You recieved "+resourcesGained : "You didn't recieve any resources."}
      <button onClick={gotoIdleState}>Thanks!</button>
    </>
  )
}
