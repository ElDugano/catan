import { useContext } from 'react';
import { TurnStateContext } from '../state/turnState/TurnStateContext.js';
import { DiceContext } from '../state/dice/DiceContext.js';
import { PlayerResourceCardsContext } from '../state/playerResourceCards/PlayerResourceCardsContext.js';

import { CurrentPlayerTurnContext } from '../state/currentPlayerTurn/CurrentPlayerTurnContext.js';

export default function Debug() {
  const {isTurnStateRollingTheDice, setTurnStateToRemoveHalfResources} = useContext(TurnStateContext);
  const {setDice} = useContext(DiceContext);
  const {currentPlayerTurn} = useContext(CurrentPlayerTurnContext);
  const {addCollectionOfResourcesToPlayer} = useContext(PlayerResourceCardsContext)

  let CheatMenu = "";
  
    if (isTurnStateRollingTheDice()) {
      CheatMenu =(
        <>
        <button onClick={() => {
          setDice([3,4]);
          setTurnStateToRemoveHalfResources();
          }}>Roll 7</button>
        </>
      );
    }
  //CheatMenu = <div><button>asdf</button>Hello</div>;

  return (
    <>
    {CheatMenu}
    <button onClick={() => {addCollectionOfResourcesToPlayer(currentPlayerTurn,{Wool:5, Lumber:5, Grain:5, Brick:5, Ore:5})}}>Add 5 Resources to Current Player</button>
    </>
  )
}