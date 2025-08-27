import { useState, useContext } from 'react';
import './App.css';
import Dice from './componentes/dice/Dice.jsx';
import BoardDisplay from './componentes/boardDisplay/BoardDisplay.jsx';
import { CreateLandTileNumbers, CreateLandTiles, CreatePortTiles } from './helpers/stateInitializers/stateInitializers.jsx';
import FindDesert from './helpers/FindDesert.jsx';

import { CurrentPlayerTurnContext } from './state/currentPlayerTurn/CurrentPlayerTurnContext.js';
import { GameStateContext } from "./state/gameState/GameStateContext.js";
import { TurnStateContext } from './state/turnState/TurnStateContext.js';
import { PlayerAvailableBuildingsContext } from './state/playerAvailableBuildings/PlayerAvailableBuildingsContext.js';
import { TileCornerNodesContext } from './state/tileCornerNodes/TileCornerNodesContext.jsx';

function App() {
  const [landTiles, setLandTiles] = useState(CreateLandTiles);
  const [thiefLocation, setThiefLocation] = useState(() => FindDesert(landTiles));
  const [landTileNumbers, setLandTileNumbers] = useState(() => CreateLandTileNumbers(thiefLocation));
  const [portTiles, setPortTiles] = useState(() => CreatePortTiles(thiefLocation));
  const [playerResourceCards, setPlayerResourceCards] = useState();             //Array of Objects showing the player's hand
  const [playerDevelopmentCards, setPlayerDevelopmentCards] = useState();       //List of development cards, shown and hidden
  const [playerVictoryPoints, setPlayerVictoryPoints] = useState();             //Array of score
  const [numberOfPlayers, setNumberOfPlayers] = useState(3);

  const {gameState, setGameState} = useContext(GameStateContext);
  const {setTurnStateToBuildingASettlement, setTurnStateToBuildingARoad, isTurnStateBuildingASettlement} = useContext(TurnStateContext);
  const {currentPlayerTurn, gotoNextPlayerTurn, gotoPreviousPlayerTurn} = useContext(CurrentPlayerTurnContext);
  const {playerAvailableBuildings, removeRoadFromAvailableBuildings, removeSettlementFromAvailableBuildings, removeCityFromAvailableBuildings} = useContext(PlayerAvailableBuildingsContext);
  const {tileCornerNodes, setNodeValueToSettlement, setNodeRightRoadOwner, setNodeBottomRoadOwner} = useContext(TileCornerNodesContext);

  const TileNodeClickFunction = (x,y, itemBuilt) => {
    if (itemBuilt == "settlement") {
      setNodeValueToSettlement(x,y,currentPlayerTurn);
      removeSettlementFromAvailableBuildings(currentPlayerTurn);
    }
    else if(itemBuilt == "rightRoad") {
      setNodeRightRoadOwner(x, y, currentPlayerTurn)
      removeRoadFromAvailableBuildings(currentPlayerTurn);
    }
    else if(itemBuilt == "bottomRoad") {
      setNodeBottomRoadOwner(x, y, currentPlayerTurn)
      removeRoadFromAvailableBuildings(currentPlayerTurn);
    }
    
    
    //Set the turn, this should probably be it's own function
    if(gameState == "setup") {
      if(isTurnStateBuildingASettlement()) {
        setTurnStateToBuildingARoad();
      }
      else
      {
        setTurnStateToBuildingASettlement();
        if(playerAvailableBuildings[currentPlayerTurn].settlements == 4 && currentPlayerTurn < numberOfPlayers-1) {
          gotoNextPlayerTurn();
          console.log("moving forward");
        }
        else if(playerAvailableBuildings[currentPlayerTurn].settlements == 4 && currentPlayerTurn == numberOfPlayers-1) {
          console.log("Time to reverse course");
        }
        else if(playerAvailableBuildings[currentPlayerTurn].settlements == 3 && currentPlayerTurn > 0) {
          gotoPreviousPlayerTurn();
          console.log("moving backwards");
        }
        else {
          console.log("^^^^START THE GAME^^^^");
          setGameState("main game");
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
          currentPlayerTurn={currentPlayerTurn}
          tileNodeClickFunction={TileNodeClickFunction}
        />
    </>
  )
}

export default App
