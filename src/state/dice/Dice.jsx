import { useState } from "react";
import { DiceContext } from "./diceContext";

export const Dice = ({ children }) => {
  const [dice, setDice] = useState([1,1]);

  const rollDice = () => {
    const diceRoll = [Math.ceil(Math.random() * 6),Math.ceil(Math.random() * 6)];
    console.log(diceRoll);
    setDice(diceRoll);
    return diceRoll[0]+diceRoll[1];
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