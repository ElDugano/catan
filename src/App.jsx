import { useState, useContext } from 'react';
import './App.css';
import Dice from './componentes/dice/Dice.jsx';
import BoardDisplay from './componentes/boardDisplay/BoardDisplay.jsx';
import { CreateLandTileNumbers, CreateLandTiles, CreatePortTiles, CreateTileCornerNodes } from './helpers/stateInitializers/stateInitializers.jsx';
import FindDesert from './helpers/FindDesert.jsx';
import SetCurrentPlayerTurn from './helpers/SetCurrentPlayerTurn.jsx';

import { CurrentPlayerTurnContext } from './state/currentPlayerTurn/CurrentPlayerTurnContext.js';
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

  const {gameState, setGameState} = useContext(GameStateContext);
  const {turnState, setTurnState} = useContext(TurnStateContext);
  const {currentPlayerTurn, gotoNextPlayerTurn, gotoPreviousPlayerTurn} = useContext(CurrentPlayerTurnContext);
  const {playerAvailableBuildings, removeRoadFromAvailableBuildings, removeSettlementFromAvailableBuildings, removeCityFromAvailableBuildings} =useContext(PlayerAvailableBuildingsContext);


  const TileNodeClickFunction = (x,y, itemBuilt) => {
    let newTileCornerNodes = [...tileCornerNodes];
    if (itemBuilt == "Settlement") {
      newTileCornerNodes[x][y].value=itemBuilt;
      newTileCornerNodes[x][y].owner=currentPlayerTurn;
      removeSettlementFromAvailableBuildings(currentPlayerTurn);
    }
    else if(itemBuilt == "Right Road") {
      newTileCornerNodes[x][y].rightRoadOwner=currentPlayerTurn;
      removeRoadFromAvailableBuildings(currentPlayerTurn);
    }
    else if(itemBuilt == "Bottom Road") {
      newTileCornerNodes[x][y].bottomRoadOwner=currentPlayerTurn;
      removeRoadFromAvailableBuildings(currentPlayerTurn);
    }
    SetTileCornerNodes(newTileCornerNodes);
    //Set the turn, this should probably be it's own function
    if(gameState == "setup") {
      if(turnState == "building a settlement") {
        setTurnState("building a road");
      }
      else
      {
        console.log("First got here");
        if(playerAvailableBuildings[currentPlayerTurn].settlements == 4 && currentPlayerTurn < numberOfPlayers-1) {
          gotoNextPlayerTurn();
          setTurnState("building a settlement");
          console.log("moving forward");
        }
        else if(playerAvailableBuildings[currentPlayerTurn].settlements == 4 && currentPlayerTurn == numberOfPlayers-1) {
          setTurnState("building a settlement");
          console.log("Time to reverse course");
        }
        else if(playerAvailableBuildings[currentPlayerTurn].settlements == 3 && currentPlayerTurn > 0) {
          gotoPreviousPlayerTurn();
          setTurnState("building a settlement");
          console.log("moving backwards");
        }
        else {
          console.log("^^^^START THE GAME^^^^");
          setGameState("main game");
          setTurnState("building a settlement");
          //setTurnState("rolling dice"); //When we get to that point
        }
      } 
    }
    else {
      gotoNextPlayerTurn();
    }
    
  }

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
          tileCornerNodes={tileCornerNodes}
          currentPlayerTurn={currentPlayerTurn}
          tileNodeClickFunction={TileNodeClickFunction}
        />
    </>
  )
}

export default App
