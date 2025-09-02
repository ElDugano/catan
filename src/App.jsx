import { useContext } from 'react';
import Gameboard from './componentes/gameboard/Gameboard.jsx';
import TurnInterface from './componentes/turnInterface/TurnInterface.jsx';
import GatherResourcesFromRoll from './helpers/GatherResourcesFromRoll.jsx';

import { GameStateContext } from "./state/gameState/GameStateContext.js";
import { TurnStateContext } from './state/turnState/TurnStateContext.js';
import { CurrentPlayerTurnContext } from './state/currentPlayerTurn/CurrentPlayerTurnContext.js';
import { PlayerColorContext } from './state/playerColor/PlayerColorContext.js';
import { PlayerResourceCardsContext } from './state/playerResourceCards/PlayerResourceCardsContext.js';

import './App.css';

import Debug from './helpers/Debug.jsx';

function App() {
  //const [playerResourceCards, setPlayerResourceCards] = useState();             //Array of Objects showing the player's hand
  //const [playerDevelopmentCards, setPlayerDevelopmentCards] = useState();       //List of development cards, shown and hidden
  //const [playerVictoryPoints, setPlayerVictoryPoints] = useState();             //Array of score
  //const [numberOfPlayers, setNumberOfPlayers] = useState(3);


  //These are really just here for debugging.
  const {turnState} = useContext(TurnStateContext);
  const {currentPlayerTurn} = useContext(CurrentPlayerTurnContext);
  const {getAPlayersColor} = useContext(PlayerColorContext);
  const {getAPlayersResourceCards} = useContext(PlayerResourceCardsContext)

  const currentPlayerResources = getAPlayersResourceCards(currentPlayerTurn);
  return (
    <>
      it is <span style={{color: getAPlayersColor(currentPlayerTurn)}}>player {currentPlayerTurn}'s</span> turn. 
      Wool: {currentPlayerResources.Wool} | 
      Lumber: {currentPlayerResources.Lumber} | 
      Grain: {currentPlayerResources.Grain} | 
      Brick: {currentPlayerResources.Brick} | 
      Ore: {currentPlayerResources.Ore}
      <br />
      The turnState is: {turnState}<br />
        <TurnInterface />
        <Gameboard>
          <GatherResourcesFromRoll />
        </Gameboard>
        <Debug />
    </>
  )
}

export default App
