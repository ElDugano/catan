import { useContext, useEffect } from "react";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"

export default function GatherResrouces() {
  const {setTurnStateToIdle}= useContext(TurnStateContext);

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

  return (
    <>
      Shit, we need to give you some resources.
      <button onClick={gotoIdleState}>Thanks!</button>
    </>
  )
}
