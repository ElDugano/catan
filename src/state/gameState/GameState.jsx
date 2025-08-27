import { GameStateContext } from './GameStateContext.js'
import { useState } from 'react'

export const GameState = ({ children }) => {
  const [gameState, setGameState] = useState("setup");
  return (
      <GameStateContext.Provider value={{gameState, setGameState}}>
        {children}
      </GameStateContext.Provider>
  )
}