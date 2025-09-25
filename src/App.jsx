import { useContext } from 'react';
import Gameboard from './componentes/gameboard/Gameboard.jsx';
import TurnInterface from './componentes/turnInterface/TurnInterface.jsx';
import HostTurnInterface from './componentes/hostTurnInterface/HostTurnInterface.jsx';

import GameSetup from './componentes/gameSetup/GameSetup.jsx';
import HostNetworkingFunctions from './componentes/networking/Host/HostNetworkingFunctions.jsx';

import { GameStateContext } from "./state/gameState/GameStateContext.js";

import { NetworkingContext } from './componentes/networking/State/NetworkingContext.js';
import NetworkReconnectStateUpdate from './componentes/networking/Host/NetworkReconnectStateUpdate.jsx'

import './App.css';

import Debug from './helpers/Debug.jsx';


function App() {
  //These are really just here for debugging.
  const { isGameStateGameSetup } = useContext(GameStateContext)
  const { isHost } = useContext(NetworkingContext);

    return (
      <>
          {isHost == true && <HostTurnInterface />}
          {isHost == false && <TurnInterface />}
          <Gameboard>
            {isGameStateGameSetup() ? <GameSetup /> : null}
            <HostNetworkingFunctions />
            <NetworkReconnectStateUpdate />
          </Gameboard>
          {isGameStateGameSetup() == false && <Debug />}
          {isHost == true && <div style={{height: "20vh"}} />}
      </>
    )
}

export default App