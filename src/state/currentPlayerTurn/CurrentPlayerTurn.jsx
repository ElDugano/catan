import { useState } from 'react'

import { CurrentPlayerTurnContext } from './CurrentPlayerTurnContext.js'

import Shuffle from '../../helpers/Shuffle.jsx';


export const CurrentPlayerTurn = ({ children }) => {
  const [playerOrder, setPlayerOrder] = useState([]);
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState(0);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [playerOrderArrayPosition, setPlayerOrderArrayPosition] = useState(0);
  const [clientPlayerNumber, setClientPlayerNumber] = useState(null);           //This is used on the client level only.

  const addPlayer = () => {
    let newPlayerOrder = [...playerOrder];
    const newPlayerNumber = newPlayerOrder.length;
    newPlayerOrder.push(newPlayerNumber);
    Shuffle(newPlayerOrder);
    setPlayerOrder(newPlayerOrder);
    setCurrentPlayerTurn(newPlayerOrder[0]);
    setNumberOfPlayers(newPlayerOrder.length);
    return newPlayerNumber;
  }
  const setupClientPlayerOrder = (newPlayerOrder) => {
    console.log("The player order is:");
    console.log(newPlayerOrder);
    console.log("lets check this against clinetPlayerNumber:");
    console.log(clientPlayerNumber);
    setCurrentPlayerTurn(newPlayerOrder[0]);
    setPlayerOrder(newPlayerOrder);
    setNumberOfPlayers(newPlayerOrder.length);
  }

  const isClientPlayersTurn = () => {
    return clientPlayerNumber == currentPlayerTurn ? true : false;
  }




  const gotoNextPlayerTurn = () => {
      if (playerOrderArrayPosition < numberOfPlayers-1){
        setCurrentPlayerTurn(playerOrder[playerOrderArrayPosition+1]);
        setPlayerOrderArrayPosition(playerOrderArrayPosition+1);
        return {currentPlayerTurn:playerOrder[playerOrderArrayPosition+1]};
      }
      else {
        setCurrentPlayerTurn(playerOrder[0]);
        setPlayerOrderArrayPosition(0);
        return {currentPlayerTurn:0};
      }
  }
  const gotoPreviousPlayerTurn= () => {
    if(playerOrderArrayPosition > 0) {
      setCurrentPlayerTurn(playerOrder[playerOrderArrayPosition-1]);
      setPlayerOrderArrayPosition(playerOrderArrayPosition-1);
      return {currentPlayerTurn:playerOrder[playerOrderArrayPosition-1]};
    }
    else {
      setCurrentPlayerTurn(playerOrder[numberOfPlayers-1]);
      setPlayerOrderArrayPosition(numberOfPlayers-1);
      return {currentPlayerTurn:playerOrder[numberOfPlayers-1]};
    }
  }


  const isPlayerOrderArrayPositionEnd = () => {
    return playerOrderArrayPosition == numberOfPlayers-1 ? true : false;
  }
  const isPlayerOrderArrayPositionStart = () => {
    return playerOrderArrayPosition == 0 ? true : false;
  }
  
  return (
      <CurrentPlayerTurnContext.Provider value={{
          currentPlayerTurn,
          gotoNextPlayerTurn,
          gotoPreviousPlayerTurn,
          playerOrder,
          addPlayer,
          numberOfPlayers,
          isPlayerOrderArrayPositionEnd,
          isPlayerOrderArrayPositionStart,
          clientPlayerNumber,
          setClientPlayerNumber,
          setCurrentPlayerTurn,
          setupClientPlayerOrder,
          isClientPlayersTurn
        }}>
        {children}
      </CurrentPlayerTurnContext.Provider>
  )
}