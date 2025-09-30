import { useContext } from 'react';
import Gameboard from './componentes/gameboard/Gameboard.jsx';
import TurnInterface from './componentes/turnInterface/TurnInterface.jsx';
import HostTurnInterface from './componentes/hostTurnInterface/HostTurnInterface.jsx';

import GameSetup from './componentes/gameSetup/GameSetup.jsx';
import HostNetworkingFunctions from './componentes/networking/Host/HostNetworkingFunctions.jsx';
import NetworkReconnectStateUpdate from './componentes/networking/Host/NetworkReconnectStateUpdate.jsx'
import ClientHud from './componentes/turnInterface/components/clientHud/ClientHud.jsx';

import { GameStateContext } from "./state/gameState/GameStateContext.js";

import { NetworkingContext } from './componentes/networking/State/NetworkingContext.js';
import { TurnStateContext } from './state/turnState/TurnStateContext.js';



import './App.css';

import Debug from './helpers/Debug.jsx';


function App() {
  //These are really just here for debugging.
  const { isGameStateGameSetup } = useContext(GameStateContext)
  const { isHost } = useContext(NetworkingContext);
  const { isTurnStateBuildingARoad,
          isTurnStateBuildingASettlement,
          isTurnStateBuildingACity,
          isTurnStateRoadBuilderCardFirstRoad,
          isTurnStateRoadBuilderCardSecondRoad,
          isTurnStateMoveTheThief } = useContext(TurnStateContext);

    return (
      <>
        {isHost == true && <HostTurnInterface />}
        {isHost == false && <ClientHud />}
        {(isTurnStateBuildingARoad() || isTurnStateRoadBuilderCardFirstRoad() || isTurnStateRoadBuilderCardSecondRoad()) && <div className="clientMenu mapTitle"><h2>Build a Road</h2></div>}
        {(isTurnStateBuildingASettlement()) && <div className="clientMenu mapTitle"><h2>Build a Settlement</h2></div>}
        {(isTurnStateBuildingACity()) && <div className="clientMenu mapTitle"><h2>Build a City</h2></div>}
        {(isTurnStateMoveTheThief()) && <div className="clientMenu mapTitle"><h2>Move the Thief</h2></div>}
        <Gameboard>
          {isGameStateGameSetup() ? <GameSetup /> : null}
          <HostNetworkingFunctions />
          <NetworkReconnectStateUpdate />
        </Gameboard>
        {isHost == false && <TurnInterface />}
        {isGameStateGameSetup() == false && <Debug />}
        {isHost == true && <div style={{height: "20vh"}} />}
      </>
    )
}

export default App