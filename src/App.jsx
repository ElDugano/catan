import { useContext } from 'react';
import Gameboard from './componentes/gameboard/Gameboard.jsx';
import TurnInterface from './componentes/turnInterface/TurnInterface.jsx';
import GetResourcesFromRoll from './helpers/GetResourcesFromRoll.jsx';

import { GameStateContext } from "./state/gameState/GameStateContext.js";
import { TurnStateContext } from './state/turnState/TurnStateContext.js';
import { CurrentPlayerTurnContext } from './state/currentPlayerTurn/CurrentPlayerTurnContext.js';

import './App.css';

function App() {
  //const [playerResourceCards, setPlayerResourceCards] = useState();             //Array of Objects showing the player's hand
  //const [playerDevelopmentCards, setPlayerDevelopmentCards] = useState();       //List of development cards, shown and hidden
  //const [playerVictoryPoints, setPlayerVictoryPoints] = useState();             //Array of score
  //const [numberOfPlayers, setNumberOfPlayers] = useState(3);


  //These are really just here for debugging.
  const {isGameStateBoardSetup} = useContext(GameStateContext);
  const {turnState} = useContext(TurnStateContext);
  const {currentPlayerTurn} = useContext(CurrentPlayerTurnContext);


  return (
    <>
      it is player {currentPlayerTurn}'s turn.
      <br />
      Hey, Are we in the Baord Setup phase? {isGameStateBoardSetup() == true ? "yes" : "no"}! The turnState is: {turnState}<br />
        <TurnInterface />
        <Gameboard>
          <GetResourcesFromRoll /*ref={childRef}*/ />
        </Gameboard>
    </>
  )
}

export default App
