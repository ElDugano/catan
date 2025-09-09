import { GameStateContext } from './GameStateContext.js'
import { useState } from 'react'

export const GameState = ({ children }) => {
  const [gameState, setGameState] = useState("Game Setup");

  const isGameStateGameSetup = () => {return (gameState == "Game Setup") ? true : false};
  const setGameStateToBoardSetup = () => {setGameState("Board Setup")};
  const isGameStateBoardSetup = () => {return (gameState == "Board Setup") ? true : false};
  const setGameStateToMainGame = () => {setGameState("Main Game")};
  const isGameStateMainGame = () => {return (gameState == "Main Game") ? true : false};
  const setGameStateToGameOver = () => {setGameState("Game Over")};
  const isGameStateGameOver = () => {return (gameState == "Game Over") ? true : false};
  

  return (
      <GameStateContext.Provider value={{
        isGameStateGameSetup,
        setGameStateToBoardSetup,
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