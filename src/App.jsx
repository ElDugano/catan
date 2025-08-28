import { useState, useContext } from 'react';
import './App.css';
import Dice from './componentes/dice/Dice.jsx';
import BoardDisplay from './componentes/boardDisplay/BoardDisplay.jsx';
import { CreateLandTileNumbers, CreateLandTiles, CreatePortTiles } from './helpers/stateInitializers/stateInitializers.jsx';
import FindDesert from './helpers/FindDesert.jsx';

import { CurrentPlayerTurnContext } from './state/currentPlayerTurn/CurrentPlayerTurnContext.js';

function App() {
  const [landTiles, setLandTiles] = useState(CreateLandTiles);
  const [thiefLocation, setThiefLocation] = useState(() => FindDesert(landTiles));
  const [landTileNumbers, setLandTileNumbers] = useState(() => CreateLandTileNumbers(thiefLocation));
  const [portTiles, setPortTiles] = useState(() => CreatePortTiles(thiefLocation));
  const [playerResourceCards, setPlayerResourceCards] = useState();             //Array of Objects showing the player's hand
  const [playerDevelopmentCards, setPlayerDevelopmentCards] = useState();       //List of development cards, shown and hidden
  const [playerVictoryPoints, setPlayerVictoryPoints] = useState();             //Array of score
  const [numberOfPlayers, setNumberOfPlayers] = useState(3);

  const {currentPlayerTurn} = useContext(CurrentPlayerTurnContext);

  //console.log("-The following is landTiles:");
  //console.log(landTiles);
  //console.log("-The following is landTilesNumbers:");
  //console.log(landTileNumbers);
  //console.log("-The following is portTiles:");
  //console.log(portTiles);
  //console.log("-The following is tileCornerNodes:");
  //console.log(tileCornerNodes);

  return (
    <>
      <Dice>
        
      </Dice>
      it is player {currentPlayerTurn}'s turn.
      <br />
        <BoardDisplay
          landTiles={landTiles}
          landTileNumbers={landTileNumbers}
          thiefLocation={thiefLocation}
          currentPlayerTurn={currentPlayerTurn}
        />
    </>
  )
}

export default App
