import { TurnStateContext } from './TurnStateContext.js';
import { useState } from 'react'

export const TurnState = ({ children }) => {
  const [turnState, setTurnState] = useState("building a settlement");
    //rolling dice
    //idle
    //building a settlement
    //building a city
    //building a road
  return (
      <TurnStateContext.Provider value={{turnState, setTurnState}}>
        {children}
      </TurnStateContext.Provider>
  )
}