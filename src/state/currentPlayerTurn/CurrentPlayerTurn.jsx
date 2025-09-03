import { CurrentPlayerTurnContext } from './CurrentPlayerTurnContext.js'
import { NumberOfPlayersContext } from '../numberOfPlayers/NumberOfPlayersContext.js';
import { useState, useContext } from 'react'


export const CurrentPlayerTurn = ({ children }) => {
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState(0);

  const {numberOfPlayers} = useContext(NumberOfPlayersContext);

  const gotoNextPlayerTurn = () => {
      setCurrentPlayerTurn(currentPlayerTurn < numberOfPlayers-1 ? currentPlayerTurn+1 : 0);
      return currentPlayerTurn < numberOfPlayers-1 ? currentPlayerTurn+1 : 0;
  }
  const gotoPreviousPlayerTurn= () => {
    setCurrentPlayerTurn(currentPlayerTurn > 0 ? currentPlayerTurn-1 : numberOfPlayers-1);
    return currentPlayerTurn > 0 ? currentPlayerTurn-1 : numberOfPlayers-1
  }
  
  return (
      <CurrentPlayerTurnContext.Provider value={{
          currentPlayerTurn,
          gotoNextPlayerTurn,
          gotoPreviousPlayerTurn
        }}>
        {children}
      </CurrentPlayerTurnContext.Provider>
  )
}