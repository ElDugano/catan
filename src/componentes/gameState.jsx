import { GameStateContext, } from './GameStateContext.js'
import { useState } from 'react'

export const GameState = ({ children }) => {
  const [gameState, setGameState] = useState("setup");
  const setNewGameState = (newGameState) => {
    setGameState(newGameState);
  }
  return (
      <GameStateContext.Provider value={{gameState, setNewGameState}}>
        {children}
      </GameStateContext.Provider>
  )
}