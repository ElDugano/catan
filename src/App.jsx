import { useState } from 'react'
import './App.css'
import Dice from './componentes/dice/Dice.jsx'
import BoardDisplay from './componentes/boardDisplay/BoardDisplay.jsx'
import { CreateLandTileNumbers, CreateLandTiles, CreatePortTiles, CreateTileCornerNodes } from './helpers/stateInitializers/stateInitializers.jsx'
import FindDesert from './helpers/FindDesert.jsx'


function testFunction(x,y) {
  alert("You clicked x:"+x+" y:"+y+".");
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
  console.log("-The following is tileCornerNodes:");
  console.log(tileCornerNodes);

  console.log("Hey, lets say we rolled a 6. Where are the tiles that we got?");
  console.log(landTileNumbers[6]);
  console.log("Cool, that means we will get " + landTiles[landTileNumbers[6][1].x][landTileNumbers[6][1].y] + " & " + landTiles[landTileNumbers[6][2].x][landTileNumbers[6][2].y]);



  return (
    <>
      <Dice>
        
      </Dice>
      <br />
      <BoardDisplay
        landTiles={landTiles}
        landTileNumbers={landTileNumbers}
        thiefLocation={thiefLocation}
        tileCornerNodes={tileCornerNodes}
        //tileNodeClickFunction={() => {alert("you clicked a node")}}
        tileNodeClickFunction={testFunction}
        />
    </>
  )
}

export default App
