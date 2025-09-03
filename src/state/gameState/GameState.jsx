import { GameStateContext } from './GameStateContext.js'
import { useState } from 'react'

export const GameState = ({ children }) => {
  const [gameState, setGameState] = useState("Board Setup");

  const isGameStateBoardSetup = () => {return (gameState == "Board Setup") ? true : false};
  const isGameStateMainGame = () => {return (gameState == "Main Game") ? true : false};
  const setGameStateToMainGame = () => {setGameState("Main Game")};
  const isGameStateGameOver = () => {return (gameState == "Game Over") ? true : false};
  const setGameStateToGameOver = () => {setGameState("Game Over")};

  return (
      <GameStateContext.Provider value={{
        isGameStateBoardSetup,
        isGameStateMainGame,
        setGameStateToMainGame,
        isGameStateGameOver,
        setGameStateToGameOver
      }}>
        {children}
      </GameStateContext.Provider>
  )
}