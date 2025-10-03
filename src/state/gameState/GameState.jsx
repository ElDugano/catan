import { GameStateContext } from './GameStateContext.js'
import { useState } from 'react'

export const GameState = ({ children }) => {
  const [gameState, setGameState] = useState("Game Setup");

  const isGameStateGameSetup = () => {return (gameState == "Game Setup") ? true : false};
  const setGameStateameSetup = () =>         {setGameState("Game Setup");
                                          return{gameState:"Game Setup"};};
  const isGameStateBoardSetup    = () => {return (gameState == "Board Setup") ? true : false};
  const setGameStateToBoardSetup = () =>         {setGameState("Board Setup");
                                              return{gameState:"Board Setup"};};
  const isGameStateMainGame    = () => {return (gameState == "Main Game") ? true : false};
  const setGameStateToMainGame = () =>         {setGameState("Main Game");
                                            return{gameState:"Main Game"};};
  const isGameStateGameOver    = () => {return (gameState == "Game Over") ? true : false};
  const setGameStateToGameOver = () =>         {setGameState("Game Over");
                                            return{gameState:"Game Over"};};

  return (
      <GameStateContext.Provider value={{
        isGameStateGameSetup,
        setGameStateameSetup,
        isGameStateBoardSetup,
        setGameStateToBoardSetup,
        isGameStateMainGame,
        setGameStateToMainGame,
        isGameStateGameOver,
        setGameStateToGameOver,
        setGameState,
        gameState
      }}>
        {children}
      </GameStateContext.Provider>
  )
}