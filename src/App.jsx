import { useContext } from 'react';
import Gameboard from './componentes/gameboard/Gameboard.jsx';
import TurnInterface from './componentes/turnInterface/TurnInterface.jsx';
import HostTurnInterface from './componentes/hostTurnInterface/HostTurnInterface.jsx';
import GatherResourcesFromRoll from './helpers/turnState/GatherResourcesFromRoll.jsx';

import NetworkingSetup from './componentes/networking/NetworkingSetup.jsx';
import HostNetworkingFunctions from './componentes/networking/Host/HostNetworkingFunctions.jsx';


import { GameStateContext } from "./state/gameState/GameStateContext.js";
import { TurnStateContext } from './state/turnState/TurnStateContext.js';
import { CurrentPlayerTurnContext } from './state/currentPlayerTurn/CurrentPlayerTurnContext.js';

import { PlayerColorContext } from './state/playerColor/PlayerColorContext.js';
import { PlayerResourceCardsContext } from './state/playerResourceCards/PlayerResourceCardsContext.js';
import { NetworkingContext } from './componentes/networking/State/NetworkingContext.js';
import NetworkReconnectStateUpdate from './componentes/networking/Host/NetworkReconnectStateUpdate.jsx'

import './App.css';

import Debug from './helpers/Debug.jsx';


function App() {
  //These are really just here for debugging.
  const { isGameStateGameSetup } = useContext(GameStateContext)
  const { turnState } = useContext(TurnStateContext);
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);

  const { getAPlayersColor } = useContext(PlayerColorContext);
  const { getAPlayersResourceCards } = useContext(PlayerResourceCardsContext);
  const { isHost } = useContext(NetworkingContext);
  
  const currentPlayerResources = getAPlayersResourceCards(currentPlayerTurn);

  let displayInterface = null;
  if (isHost == true)
    displayInterface = <HostTurnInterface />;
  else if(isHost == false)
    displayInterface = <TurnInterface />

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
          {displayInterface}
          <Gameboard>
            {isGameStateGameSetup() ? <NetworkingSetup /> : null}
            <GatherResourcesFromRoll />
            <HostNetworkingFunctions />
            <NetworkReconnectStateUpdate />
          </Gameboard>
          <Debug />
          <div style={{height: "20vh"}} />
      </>
    )
}

export default App