import { NumberOfPlayersContext } from './NumberOfPlayersContext.js';
import { useState } from 'react'

export const NumberOfPlayers = ({ children }) => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(3);

  const setNumberOfPlayersTo = (newNumberOfPlayers) => {
    setNumberOfPlayers(newNumberOfPlayers);
  }
  return (
      <NumberOfPlayersContext.Provider value={{numberOfPlayers, setNumberOfPlayersTo}}>
        {children}
      </NumberOfPlayersContext.Provider>
  )
}