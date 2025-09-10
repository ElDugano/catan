import { useState } from 'react'

import { CurrentPlayerTurnContext } from './CurrentPlayerTurnContext.js'

import Shuffle from '../../helpers/Shuffle.jsx';


export const CurrentPlayerTurn = ({ children }) => {
  const [playerOrder, setPlayerOrder] = useState([]);

  const addPlayer = () => {
    let newPlayerOrder = [...playerOrder];
    const newPlayerNumber = newPlayerOrder.length;
    newPlayerOrder.push(newPlayerNumber);
    setPlayerOrder(newPlayerOrder);
    setNumberOfPlayers(newPlayerOrder.length);
    return newPlayerNumber;
  }

  const shufflePlayerOrder = () => {
    let newPlayerOrder = [...playerOrder];
    Shuffle(newPlayerOrder);
    setPlayerOrder(newPlayerOrder);
    console.log("This will be the player order for the game:");
    console.log(newPlayerOrder);
    setCurrentPlayerTurn(newPlayerOrder[0]);
  }

  const [currentPlayerTurn, setCurrentPlayerTurn] = useState(0);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

  const [playerOrderArrayPosition, setPlayerOrderArrayPosition] = useState(0)
  const gotoNextPlayerTurn = () => {
      //setCurrentPlayerTurn(currentPlayerTurn < numberOfPlayers-1 ? currentPlayerTurn+1 : 0);
      if (playerOrderArrayPosition < numberOfPlayers-1){
        setCurrentPlayerTurn(playerOrder[playerOrderArrayPosition+1]);
        setPlayerOrderArrayPosition(playerOrderArrayPosition+1);
      }
      else {
        setCurrentPlayerTurn(playerOrder[0]);
        setPlayerOrderArrayPosition(0);
      }
  }
  const gotoPreviousPlayerTurn= () => {
    //setCurrentPlayerTurn(currentPlayerTurn > 0 ? currentPlayerTurn-1 : numberOfPlayers-1);
    if(playerOrderArrayPosition > 0) {
      setCurrentPlayerTurn(playerOrder[playerOrderArrayPosition-1]);
      setPlayerOrderArrayPosition(playerOrderArrayPosition-1);
    }
    else {
      setCurrentPlayerTurn(playerOrder[numberOfPlayers-1]);
      setPlayerOrderArrayPosition(numberOfPlayers-1);
    }
  }
  const isPlayerOrderArrayPositionEnd = () => {
    return playerOrderArrayPosition == numberOfPlayers-1 ? true : false;
  }
  const isPlayerOrderArrayPositionStart = () => {
    console.log("The way I am going to answer this question is...");
    console.log(playerOrderArrayPosition);
    console.log(playerOrderArrayPosition == 0 ? true : false);
    return playerOrderArrayPosition == 0 ? true : false;
  }
  
  return (
      <CurrentPlayerTurnContext.Provider value={{
          currentPlayerTurn,
          gotoNextPlayerTurn,
          gotoPreviousPlayerTurn,
          playerOrder,
          addPlayer,
          shufflePlayerOrder,
          numberOfPlayers,
          isPlayerOrderArrayPositionEnd,
          isPlayerOrderArrayPositionStart
        }}>
        {children}
      </CurrentPlayerTurnContext.Provider>
  )
}