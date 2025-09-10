import { useContext, useEffect } from 'react';
import Gameboard from './componentes/gameboard/Gameboard.jsx';
import TurnInterface from './componentes/turnInterface/TurnInterface.jsx';
import GatherResourcesFromRoll from './helpers/turnState/GatherResourcesFromRoll.jsx';
import LongestRoadCheck from './helpers/turnState/LongestRoadCheck.jsx';

//import Networking from './componentes/networking/Networking.jsx';
import NetworkingSetup from './componentes/networking/NetworkingSetup.jsx';
import NetworkingMessageReciever from './componentes/networking/Host/NetworkingMessageReciever.jsx';


import { GameStateContext } from "./state/gameState/GameStateContext.js";
import { TurnStateContext } from './state/turnState/TurnStateContext.js';
import { CurrentPlayerTurnContext } from './state/currentPlayerTurn/CurrentPlayerTurnContext.js';
import { DevelopmentCardsContext } from './state/developmentCards/DevelopmentCardsContext.js';
import { ScoreBoardContext } from './state/scoreBoard/ScoreBoardContext.js';
import { DiceContext } from './state/dice/DiceContext.js';

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
  const { isGameStateGameSetup,
          setGameStateToGameOver } = useContext(GameStateContext)
  const { turnState,
          isTurnStateLongestRoadCheck,
          isTurnStateStartTurn,
          setTurnStateToRollingTheDice } = useContext(TurnStateContext);
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);
  const { getJustPurchasedPlayerVictoryPointCards,
          makePlayerPurchasedDevelopmentAvailableToPlay } = useContext(DevelopmentCardsContext);
  const { addPointsToPlayerHiddenPoints, winner } = useContext(ScoreBoardContext);
  const { resetDiceRolledThisTurn } = useContext(DiceContext);

  const {getAPlayersColor} = useContext(PlayerColorContext);
  const {getAPlayersResourceCards} = useContext(PlayerResourceCardsContext)

  const currentPlayerResources = getAPlayersResourceCards(currentPlayerTurn);

  useEffect (() => {
    if(isTurnStateStartTurn()){
      addPointsToPlayerHiddenPoints(currentPlayerTurn, getJustPurchasedPlayerVictoryPointCards(currentPlayerTurn));
      makePlayerPurchasedDevelopmentAvailableToPlay(currentPlayerTurn);
      setTurnStateToRollingTheDice();
      resetDiceRolledThisTurn();
    }
    if(winner != null) {
      console.log("We have a winner, who is Player "+winner+"!");
      setGameStateToGameOver();
    }
  })

  //if (isGameStateGameSetup()){
  //  return(<>
  //      <NetworkingSetup />
  //      <NetworkingMessageReciever />
  //    </>
  //  )
  //}
  //else {
    const longestRoadCheck = isTurnStateLongestRoadCheck() ? <LongestRoadCheck /> : null;
    return (
      <>
          <TurnInterface />
          <Gameboard>
            {isGameStateGameSetup() ? <NetworkingSetup /> : null}
            <GatherResourcesFromRoll />
            {longestRoadCheck}
            <NetworkingMessageReciever />
          </Gameboard>
          <Debug />
      </>
    )
  //}
}

export default App
//This was debugging code.
/*
        it is <span style={{color: getAPlayersColor(currentPlayerTurn)}}>player {currentPlayerTurn}'s</span> turn. 
        Wool: {currentPlayerResources.Wool} | 
        Lumber: {currentPlayerResources.Lumber} | 
        Grain: {currentPlayerResources.Grain} | 
        Brick: {currentPlayerResources.Brick} | 
        Ore: {currentPlayerResources.Ore}
        <br />
        The turnState is: {turnState}<br />
*/