import { useState, useContext, useRef } from 'react';
import './App.css';
import Gameboard from './componentes/gameboard/Gameboard.jsx';
import GetResourcesFromRoll from './componentes/gameboard/components/GetResourcesFromRoll.jsx';

import { GameStateContext } from "./state/gameState/GameStateContext.js";
import { TurnStateContext } from './state/turnState/TurnStateContext.js';

import { CurrentPlayerTurnContext } from './state/currentPlayerTurn/CurrentPlayerTurnContext.js';
import { Dice } from './state/dice/dice.jsx';
import { DiceContext } from './state/dice/diceContext.js';

function App() {
  //const [playerResourceCards, setPlayerResourceCards] = useState();             //Array of Objects showing the player's hand
  //const [playerDevelopmentCards, setPlayerDevelopmentCards] = useState();       //List of development cards, shown and hidden
  //const [playerVictoryPoints, setPlayerVictoryPoints] = useState();             //Array of score
  //const [numberOfPlayers, setNumberOfPlayers] = useState(3);

  const {isGameStateBoardSetup} = useContext(GameStateContext);
  const {turnState, setTurnStateToGatheringResources} = useContext(TurnStateContext);

  const {currentPlayerTurn} = useContext(CurrentPlayerTurnContext);
  const {rollDice, diceAdded} = useContext(DiceContext);






  const childRef = useRef(null);

  const getTileCornerNodes = () => {
    const childelement = childRef.current;
    if (childelement) {
      let diceResourcesGained = childelement.getResourcesFromRoll(6);
      console.log("Players just gained some resrouces");
      console.log(diceResourcesGained);
      return childelement.tileCornerNodes;
    }
  }

  //const testRef = useRef(null);
  //const callfunction = () => testRef.current?test();

  function rollTheDice() {
    rollDice();
    //Note, diceAdded is NaN on the first click.
    //console.log(diceAdded());
    setTurnStateToGatheringResources();
      //Somewhere, we will be seeing what TurnState we are in to define what we are doing.
  }

  return (
    <>
      <button onClick={() => rollTheDice()}>Roll the Dice</button>
      it is player {currentPlayerTurn}'s turn. <button onClick={getTileCornerNodes}>Get TileCornerNodes</button>
      <br />
      Hey, Are we in the Baord Setup phase? {isGameStateBoardSetup() == true ? "yes" : "no"}! the turnstate is {turnState}<br />
        <Gameboard>
          <GetResourcesFromRoll ref={childRef} />
        </Gameboard>
    </>
  )
}

export default App
