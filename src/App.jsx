import { useState } from 'react'
import './App.css'
import Dice from './componentes/dice/Dice.jsx'
import BoardDisplay from './componentes/boardDisplay/BoardDisplay.jsx'
import { CreateLandTileNumbers, CreateLandTiles, CreatePortTiles } from './helpers/stateInitializers/stateInitializers.jsx'

function FindDesert(landTiles) {
  console.log("*** FindDesert was called. ***");
  for (let xCoordinate in landTiles) {
    for (let yCoordinate in landTiles[xCoordinate]) {
      if (landTiles[xCoordinate][yCoordinate] == "Desert")
      {
        return {x: xCoordinate, y: yCoordinate};
      }
    }
  }
}

function CreateTileCornerNodes() {
  let cornerNodes = [];
  for (let x=0; x<=12; x++) {
    let columnNodes = [];
    for (let y=0; y<=7; y++) {
      if (y == 0 ||
          y == 7 ||
          x == 0 ||
          x == 12 ||
          (y == 1 && x <= 2) ||
          (y == 1 && x >= 10) ||
          (y == 2 && x == 1) ||
          (y == 2 && x == 11) ||
          (y == 5 && x == 1) ||
          (y == 5 && x == 11) ||
          (y == 6 && x <= 2) ||
          (y == 6 && x >= 10)) {
            columnNodes.push({value:"Ocean"});
          }
      else {
        if((x+y)%2 !== 0 || y == 6) {  //Number is odd or the bottom row.
          columnNodes.push({
            value:"Land",
            owner:"none",
            rightRoadOwner:"none"
          });
        }
        else {  //Number is even
          columnNodes.push({
            value:"Land",
            owner:"none",
            rightRoadOwner:"none",
            bottomRoadOwner:"none"
          });
        }
      }
    }
    cornerNodes.push(columnNodes);
  }
  console.log("Ended that crazy shit, did it work?");
  console.log(cornerNodes);
  return cornerNodes;
}

function App() {

  const [landTiles, setLandTiles] = useState(CreateLandTiles);
  const [thiefLocation, setThiefLocation] = useState(() => FindDesert(landTiles));
    //On init, thief is always in the desert, so we can pass that in the other inits for the desert location.
  const [landTileNumbers, setLandTileNumbers] = useState(() => CreateLandTileNumbers(thiefLocation));
  const [portTiles, setPortTiles] = useState(() => CreatePortTiles(thiefLocation));
  const [tileCornerNodes, SetTileCornerNodes] = useState(CreateTileCornerNodes);
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
