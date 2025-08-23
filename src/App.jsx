import { useState } from 'react'
import './App.css'
import Dice from './componentes/dice/Dice.jsx'
import BoardDisplay from './componentes/boardDisplay/BoardDisplay.jsx'
import { CreateLandTileNumbers, CreateLandTiles, CreatePortTiles } from './helpers/stateInitializers/stateInitializers.jsx'

function FindDesert(landTiles) {
  console.log("Okay boys, let's find that desert");
  for (let xCoordinate in landTiles) {
    for (let yCoordinate in landTiles[xCoordinate]) {
      if (landTiles[xCoordinate][yCoordinate] == "Desert")
      {
        return {x: xCoordinate, y: yCoordinate};
      }
    }
  }
}

function App() {

  const [landTiles, setLandTiles] = useState(CreateLandTiles);
  FindDesert(landTiles);
  const [thiefLocation, setThiefLocation] = useState(() => FindDesert(landTiles));
    //On init, thief is always in the desert, so we can pass that in the other inits for the desert location.
  const [landTileNumbers, setLandTileNumbers] = useState(() => CreateLandTileNumbers(thiefLocation));
  const [portTiles, setPortTiles] = useState(() => CreatePortTiles(landTiles));
  const [playerResources, setPlayerResources] = useState();
  const [playerDevelopmentCards, setPlayerDevelopmentCards] = useState();
  const [playerVictoryPoints, setPlayerVictoryPoints] = useState();       //Array of score

  console.log("-The following is landTiles:");
  console.log(landTiles);
  console.log("-The following is landTilesNumbers:");
  console.log(landTileNumbers);
  console.log("-The following is portTiles:");
  console.log(portTiles);

  console.log("Hey, lets say we rolled a 6. Where are the tiles that we got?");
  console.log(landTileNumbers[6]);
  console.log("Cool, that means we will get " + landTiles[landTileNumbers[6][1].x][landTileNumbers[6][1].y] + " & " + landTiles[landTileNumbers[6][2].x][landTileNumbers[6][2].y]);

  console.log("Step");
  return (
    <>
      <Dice>
        
      </Dice>
      <br />
      <BoardDisplay landTiles={landTiles} landTileNumbers={landTileNumbers} />
    </>
  )
}

export default App
