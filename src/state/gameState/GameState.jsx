import { GameStateContext } from './GameStateContext.js'
import { useState } from 'react'

export const GameState = ({ children }) => {
  const [gameState, setGameState] = useState("Setup");

  const isGameStateSetup = () => {return (gameState == "Setup") ? true : false};
  const isGameStateMainGame = () => {return (gameState == "Main Game") ? true : false};
  const setGameStateToMainGame = () => {setGameState("Main Game")};

  return (
      <GameStateContext.Provider value={{
        isGameStateSetup,
        isGameStateMainGame,
        setGameStateToMainGame
      }}>
        {children}
      </GameStateContext.Provider>
  )
}