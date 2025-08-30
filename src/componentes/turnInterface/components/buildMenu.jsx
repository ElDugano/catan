import { useContext } from "react";

import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"

export default function BuildMenu() {
  const { setTurnStateToIdle,
    setTurnStateToBuildingARoad,
    setTurnStateToBuildingASettlement,
    setTurnStateToBuildingACity,
    setTurnStateToBuyingDevelopmentCard
  } = useContext(TurnStateContext);


  return (
    <>
      <button onClick={() => setTurnStateToBuildingARoad()}>Build Road</button>
      <button onClick={() => setTurnStateToBuildingASettlement()}>Build Settlement</button>
      <button onClick={() => setTurnStateToBuildingACity()}>Build City</button>
      <button onClick={() => setTurnStateToBuyingDevelopmentCard()}>Buy Development Card</button>
      <button onClick={() => setTurnStateToIdle()}>Go Back</button>
    </>
  )
}