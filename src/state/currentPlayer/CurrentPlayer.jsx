import { CurrentPlayerContext, } from './CurrentPlayerContext.js'
import { useState } from 'react'

export const CurrentPlayer = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const setCurrentPlayerTo= (playerNumber) => {
    setCurrentPlayer(playerNumber);
  }
  
  return (
      <CurrentPlayerContext.Provider value={{currentPlayer, setCurrentPlayerTo}}>
        {children}
      </CurrentPlayerContext.Provider>
  )
}