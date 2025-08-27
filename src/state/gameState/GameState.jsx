import { GameStateContext, } from './GameStateContext.js'
import { useState } from 'react'

export const GameState = ({ children }) => {
  const [gameState, setGameState] = useState("setup");
  //const [currentPlayer, setCurrentPlayer] = useState(0);
  const setNewGameState = (newGameState) => {
    setGameState(newGameState);
  }
  //const incrementCurrentPlayer = () => {
  //  setCurrentPlayer(currentPlayer+1);
  //}
  //const setCurrentPlayerTo= (playerNumber) => {
  //  setCurrentPlayer(playerNumber);
  //}
  return (
      <GameStateContext.Provider value={{gameState, setNewGameState}}>
        {children}
      </GameStateContext.Provider>
  )
}