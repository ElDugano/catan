import { TurnStateContext } from "../../../state/turnState/TurnStateContext.js"

export default function Idle() {

  return (
    <>
      <button onClick={console.log("Time to build.")}>Build stuff?</button>
      <button onClick={console.log("Time to play a development card.")}>Play a development card</button>
      <button onClick={console.log("Time to trade.")}>Trade stuff?</button>
      <button onClick={console.log("Your turn has ended.")}>End Turn</button>
    </>
  )
}