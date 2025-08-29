import { useState } from 'react';
import DiceDisplay from './DiceDisplay.jsx'
import RollDice from './RollDice.jsx'
import RollDiceButton from './RollDiceButton.jsx'

function Dice(props) {
  const [dice, setDice] = useState(RollDice)

  return (
      <>
      {props.children}
        <DiceDisplay dice={dice} />
        <RollDiceButton setDice={() => {setDice(RollDice)}} />
      </>
    )
}

export default Dice;