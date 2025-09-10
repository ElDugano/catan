import { NumberOfPlayersContext } from './NumberOfPlayersContext.js';
import { useState } from 'react'

export const NumberOfPlayers123 = ({ children }) => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(3);

  return (
      <NumberOfPlayersContext.Provider value={{
          numberOfPlayers,
          setNumberOfPlayers
        }}>
        {children}
      </NumberOfPlayersContext.Provider>
  )
}