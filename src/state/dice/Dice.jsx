import { useState } from "react";
import { DiceContext } from "./DiceContext.js";

export const Dice = ({ children }) => {
  const [dice, setDice] = useState([1,1]);
  const [diceRolledThisTurn, setDiceRolledThisTurn] = useState(false);

  const haveDiceBeenRolledThisTurn = () => {return diceRolledThisTurn};
  const resetDiceRolledThisTurn = () => {
    setDiceRolledThisTurn(false)
    return{diceRolledThisTurn:false}};

  const rollDice = () => {
    const diceRoll = [Math.ceil(Math.random() * 6),Math.ceil(Math.random() * 6)];
    setDice(diceRoll);
    setDiceRolledThisTurn(true);
    return diceRoll[0]+diceRoll[1];
  };

  const diceAdded = () => {
    return dice[0]+dice[1];
  }

  return (
      <DiceContext.Provider value={{
        haveDiceBeenRolledThisTurn,
        resetDiceRolledThisTurn,
        setDiceRolledThisTurn,
        rollDice,
        diceAdded,
        setDice,
        diceRolledThisTurn
      }}>
        {children}
      </DiceContext.Provider>
  )
}