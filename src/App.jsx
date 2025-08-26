import { useState } from 'react'
import './App.css'
import Dice from './componentes/dice/Dice.jsx'
import BoardDisplay from './componentes/boardDisplay/BoardDisplay.jsx'
import { CreateLandTileNumbers, CreateLandTiles, CreatePortTiles, CreateTileCornerNodes } from './helpers/stateInitializers/stateInitializers.jsx'
import FindDesert from './helpers/FindDesert.jsx'
import setCurrentPlayerTurn from './helpers/setCurrentPlayerTurn.jsx'

import {GameState} from './componentes/GameState.jsx'




function App() {
  const [landTiles, setLandTiles] = useState(CreateLandTiles);
  const [thiefLocation, setThiefLocation] = useState(() => FindDesert(landTiles));
  const [landTileNumbers, setLandTileNumbers] = useState(() => CreateLandTileNumbers(thiefLocation));
  const [portTiles, setPortTiles] = useState(() => CreatePortTiles(thiefLocation));
  const [tileCornerNodes, SetTileCornerNodes] = useState(CreateTileCornerNodes);
  const [playerResourceCards, setPlayerResourceCards] = useState();             //Array of Objects showing the player's hand
  const [playerDevelopmentCards, setPlayerDevelopmentCards] = useState();       //List of development cards, shown and hidden
  const [playerVictoryPoints, setPlayerVictoryPoints] = useState();             //Array of score
  const [playerAvailableBuildings, setPlayerAvailableBuildings] = useState();   //Array of Objects of what pieces players have
  const [currentPlayer, setCurrentPlayer] = useState(0);                        //Who's turn it is
  const [numberOfPlayers, setNumberOfPlayers] = useState(3);
  const [playerColor, setPlayerColor] = useState(["blue", "red", "green"]);
  //const [gameState, setGameState] = useState("setup");
  const [turnState, setTurnState] = useState("building a settlementement");
    //rolling, trading, building a road, building a settlement, building a city

  const TileNodeClickFunction = (x,y, itemBuilt) => {
    let newTileCornerNodes = [...tileCornerNodes];
    if (itemBuilt == "Settlement") {
      newTileCornerNodes[x][y].value=itemBuilt;
      newTileCornerNodes[x][y].owner=currentPlayer;
    }
    else if(itemBuilt == "Right Road") {
      newTileCornerNodes[x][y].rightRoadOwner=currentPlayer;
    }
    else if(itemBuilt == "Bottom Road") {
      newTileCornerNodes[x][y].bottomRoadOwner=currentPlayer;
    }
    
    SetTileCornerNodes(newTileCornerNodes);
    setCurrentPlayer(setCurrentPlayerTurn(currentPlayer, numberOfPlayers));
  }

  console.log("-The following is landTiles:");
  console.log(landTiles);
  console.log("-The following is landTilesNumbers:");
  console.log(landTileNumbers);
  console.log("-The following is portTiles:");
  console.log(portTiles);
  console.log("-The following is tileCornerNodes:");
  console.log(tileCornerNodes);

  //console.log("Hey, lets say we rolled a 6. Where are the tiles that we got?");
  //console.log(landTileNumbers[6]);
  //console.log("Cool, that means we will get " + landTiles[landTileNumbers[6][1].x][landTileNumbers[6][1].y] + " & " + landTiles[landTileNumbers[6][2].x][landTileNumbers[6][2].y]);



  return (
    <>
      <Dice>
        
      </Dice>
      it is {playerColor[currentPlayer]}'s turn.
      <br />
      <GameState>
        <BoardDisplay
          landTiles={landTiles}
          landTileNumbers={landTileNumbers}
          thiefLocation={thiefLocation}
          tileCornerNodes={tileCornerNodes}
          playerColor={playerColor}
          currentPlayer={currentPlayer}
          tileNodeClickFunction={TileNodeClickFunction}
          />
        </GameState>
    </>
  )
}

export default App
