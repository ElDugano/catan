import { DiceContext } from "./diceContext";
import { useState } from 'react'

export const Dice = ({ children }) => {
  const [dice, setDice] = useState([1,1]);



  const rollDice = () => {
    setDice([Math.ceil(Math.random() * 6),Math.ceil(Math.random() * 6)]);
  };

  const diceAdded = () => {
    return dice[0]+dice[1];
  }

  return (
      <DiceContext.Provider value={{
        dice,
        rollDice,
        diceAdded
      }}>
        {children}
      </DiceContext.Provider>
  )
}