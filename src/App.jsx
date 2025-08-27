import { useState, useContext } from 'react';
import './App.css';
import Dice from './componentes/dice/Dice.jsx';
import BoardDisplay from './componentes/boardDisplay/BoardDisplay.jsx';
import { CreateLandTileNumbers, CreateLandTiles, CreatePortTiles, CreateTileCornerNodes } from './helpers/stateInitializers/stateInitializers.jsx';
import FindDesert from './helpers/FindDesert.jsx';
import SetCurrentPlayerTurn from './helpers/SetCurrentPlayerTurn.jsx';

import { CurrentPlayerContext } from './state/currentPlayer/CurrentPlayerContext.js';
import { GameStateContext } from "./state/gameState/GameStateContext.js";
import { TurnStateContext } from './state/turnState/TurnStateContext.js';
import { PlayerAvailableBuildingsContext } from './state/playerAvailableBuildings/PlayerAvailableBuildingsContext.js';
//import { PlayerAvailableBuildings } from './state/playerAvailableBuildings/PlayerAvailableBuildings.jsx';

function App() {
  const [landTiles, setLandTiles] = useState(CreateLandTiles);
  const [thiefLocation, setThiefLocation] = useState(() => FindDesert(landTiles));
  const [landTileNumbers, setLandTileNumbers] = useState(() => CreateLandTileNumbers(thiefLocation));
  const [portTiles, setPortTiles] = useState(() => CreatePortTiles(thiefLocation));
  const [tileCornerNodes, SetTileCornerNodes] = useState(CreateTileCornerNodes);
  const [playerResourceCards, setPlayerResourceCards] = useState();             //Array of Objects showing the player's hand
  const [playerDevelopmentCards, setPlayerDevelopmentCards] = useState();       //List of development cards, shown and hidden
  const [playerVictoryPoints, setPlayerVictoryPoints] = useState();             //Array of score
  //const [playerAvailableBuildings, setPlayerAvailableBuildings] = useState();   //Array of Objects of what pieces players have
  //const [currentPlayer, setCurrentPlayer] = useState(0);                        //Who's turn it is
  const [numberOfPlayers, setNumberOfPlayers] = useState(3);

  const {gameState} = useContext(GameStateContext);
  const {turnState, setTurnStateTo} = useContext(TurnStateContext);
  const {currentPlayer, setCurrentPlayerTo} = useContext(CurrentPlayerContext);
  const {playerAvailableBuildings, removeRoadFromAvailableBuildings, removeSettlementFromAvailableBuildings, removeCityFromAvailableBuildings} =useContext(PlayerAvailableBuildingsContext);


  const TileNodeClickFunction = (x,y, itemBuilt) => {
    console.log("Got here");
    let newTileCornerNodes = [...tileCornerNodes];
    if (itemBuilt == "Settlement") {
      newTileCornerNodes[x][y].value=itemBuilt;
      newTileCornerNodes[x][y].owner=currentPlayer;
      removeSettlementFromAvailableBuildings(currentPlayer);
    }
    else if(itemBuilt == "Right Road") {
      newTileCornerNodes[x][y].rightRoadOwner=currentPlayer;
      removeRoadFromAvailableBuildings(currentPlayer);
    }
    else if(itemBuilt == "Bottom Road") {
      newTileCornerNodes[x][y].bottomRoadOwner=currentPlayer;
      removeRoadFromAvailableBuildings(currentPlayer);
    }
    SetTileCornerNodes(newTileCornerNodes);
    //Set the turn, this should probably be it's own function
    if(gameState == "setup") {
      if(turnState == "building a settlement") {
        console.log("We are in the setup stage.");
        setTurnStateTo("building a road");
      }
      else
      {
        console.log("We need to move onto the next player")
        if(currentPlayer == numberOfPlayers-1) {
          console.log("We did the 3rd player, time to check stuff");
          console.log(playerAvailableBuildings);
          if(playerAvailableBuildings[currentPlayer].settlements == 4)
            console.log("Well, that worked.");
        }
        setCurrentPlayerTo(() => SetCurrentPlayerTurn(currentPlayer, numberOfPlayers));
        setTurnStateTo("building a settlement");
      } 
    }
    else {
      setCurrentPlayerTo(() => SetCurrentPlayerTurn(currentPlayer, numberOfPlayers));
    }
  }

  console.log("-The following is landTiles:");
  console.log(landTiles);
  console.log("-The following is landTilesNumbers:");
  console.log(landTileNumbers);
  console.log("-The following is portTiles:");
  console.log(portTiles);
  console.log("-The following is tileCornerNodes:");
  console.log(tileCornerNodes);

  return (
    <>
      <Dice>
        
      </Dice>
      it is player {currentPlayer}'s turn.
      <br />
        <BoardDisplay
          landTiles={landTiles}
          landTileNumbers={landTileNumbers}
          thiefLocation={thiefLocation}
          tileCornerNodes={tileCornerNodes}
          currentPlayer={currentPlayer}
          tileNodeClickFunction={TileNodeClickFunction}
        />
    </>
  )
}

export default App
