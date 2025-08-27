import { TurnStateContext } from './TurnStateContext.js';
import { useState } from 'react'

export const TurnState = ({ children }) => {
  const [turnState, setTurnState] = useState("building a settlement");
    //rolling dice
    //idle
    //building a settlement
    //building a city
    //building a road

  const setTurnStateTo= (newTurnState) => {
    console.log("setTurnStateTo was called, we are making a "+newTurnState);
    setTurnState(newTurnState);
  }
  return (
      <TurnStateContext.Provider value={{turnState, setTurnStateTo}}>
        {children}
      </TurnStateContext.Provider>
  )
}