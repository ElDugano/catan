import { GameStateContext } from './GameStateContext.js'
import { useState } from 'react'

export const GameState = ({ children }) => {
  const [gameState, setGameState] = useState("Board Setup");

  const isGameStateBoardSetup = () => {return (gameState == "Board Setup") ? true : false};
  const isGameStateMainGame = () => {return (gameState == "Main Game") ? true : false};
  const setGameStateToMainGame = () => {setGameState("Main Game")};

  return (
      <GameStateContext.Provider value={{
        isGameStateBoardSetup,
        isGameStateMainGame,
        setGameStateToMainGame
      }}>
        {children}
      </GameStateContext.Provider>
  )
}