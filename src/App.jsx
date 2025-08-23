import { useState } from 'react'
import './App.css'
import Dice from './componentes/dice/Dice.jsx'
import Shuffle from './helpers/Shuffle.jsx'

function createLandTiles(){
  console.log("*** createLandTiles was called. ***");
    let availableLandTileResource = [
      "Pasture","Pasture","Pasture","Pasture",
      "Forest","Forest","Forest","Forest",
      "Fields","Fields","Fields","Fields",
      "Hills","Hills","Hills",
      "Mountains","Mountains","Mountains",
      "Desert"
    ]
    Shuffle(availableLandTileResource);
    const landTiles = {
      2:{
        3:availableLandTileResource.pop()
      },
      3:{
        2:availableLandTileResource.pop(),
        4:availableLandTileResource.pop()
      },
      4:{
        1:availableLandTileResource.pop(),
        3:availableLandTileResource.pop(),
        5:availableLandTileResource.pop()
      },
      5:{
        2:availableLandTileResource.pop(),
        4:availableLandTileResource.pop()
      },
      6:{
        1:availableLandTileResource.pop(),
        3:availableLandTileResource.pop(),
        5:availableLandTileResource.pop()
      },
      7:{
        2:availableLandTileResource.pop(),
        4:availableLandTileResource.pop()
      },
      8:{
        1:availableLandTileResource.pop(),
        3:availableLandTileResource.pop(),
        5:availableLandTileResource.pop()
      },
      9:{
        2:availableLandTileResource.pop(),
        4:availableLandTileResource.pop()
      },
      10:{
        3:availableLandTileResource.pop()
      },
    }

    return landTiles;
}

function createLandTileNumbers(landTiles){
  console.log("*** creatLandTileNumbers was called. ***");
  const availableNumbers = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12];
  let landTileNumbers={
    2:{1:{x:"",y:""}},
    3:{1:{x:"",y:""},2:{x:"",y:""}},
    4:{1:{x:"",y:""},2:{x:"",y:""}},
    5:{1:{x:"",y:""},2:{x:"",y:""}},
    6:{1:{x:"",y:""},2:{x:"",y:""}},
    8:{1:{x:"",y:""},2:{x:"",y:""}},
    9:{1:{x:"",y:""},2:{x:"",y:""}},
    10:{1:{x:"",y:""},2:{x:"",y:""}},
    11:{1:{x:"",y:""},2:{x:"",y:""}},
    12:{1:{x:"",y:""}}
  };
  const landTileCoordinates = [
    [2,3],
    [3,2],[3,4],
    [4,1],[4,3],[4,5],
    [5,2],[5,4],
    [6,1],[6,3],[6,5],
    [7,2],[7,4],
    [8,1],[8,3],[8,5],
    [9,2],[9,4],
    [10,3]];
  Shuffle(landTileCoordinates);
  while (landTileCoordinates.length > 0) {
    if(landTiles[landTileCoordinates[0][0]][landTileCoordinates[0][1]] !="Desert"){
      if (landTileNumbers[availableNumbers[0]][1]['x'] == "" ) {
        landTileNumbers[availableNumbers[0]][1]['x'] = landTileCoordinates[0][0];
        landTileNumbers[availableNumbers[0]][1]['y'] = landTileCoordinates[0][1];
      }
      else {
        landTileNumbers[availableNumbers[0]][2]['x'] = landTileCoordinates[0][0];
        landTileNumbers[availableNumbers[0]][2]['y'] = landTileCoordinates[0][1];
      }
      availableNumbers.shift();
    }
    landTileCoordinates.shift();
  }

  return landTileNumbers;
}

function createPortTiles(landTiles){
  console.log("*** createPortTiles was called. ***")
    let availablePortTypes = [
      "Wool","Lumber","Grain","Brick","Ore",
      "Standard","Standard","Standard","Standard",
    ]
    Shuffle(availablePortTypes);

    let portTilesCoordinates = [[1,2],[1,4],[3,0],[3,6],[7,0],[7,6],[10,1],[10,5],[12,3]];
    let seaTilesCoordinates = [[0,3],[2,1],[2,5],[5,0],[5,6],[9,0],[9,6],[11,2],[11,4]];
    if (landTiles[4][1] == "Desert" || landTiles[4][5] == "Desert" || landTiles[10][3] == "Desert") {
      let tmpCoordinates = portTilesCoordinates;
      portTilesCoordinates = seaTilesCoordinates;
      seaTilesCoordinates = tmpCoordinates;
    }
    //TODO: This could be more interesting, where it would make a random choice between the two options if the desert isn' on an outside corner.

    let portTiles = {
      0:{3:"Ocean"},
      1:{2:"Ocean",4:"Ocean"},
      2:{1:"Ocean",5:"Ocean"},
      3:{0:"Ocean",6:"Ocean"},
      5:{0:"Ocean",6:"Ocean"},
      7:{0:"Ocean",6:"Ocean"},
      9:{0:"Ocean",6:"Ocean"},
      10:{1:"Ocean",5:"Ocean"},
      11:{2:"Ocean",4:"Ocean"},
      12:{3:"Ocean"}
    };
    while (portTilesCoordinates.length > 0) {
      portTiles[portTilesCoordinates[0][0]][portTilesCoordinates[0][1]]=availablePortTypes.shift();
      portTilesCoordinates.shift();
    };
    return portTiles;
}

function BoardDisplay({landTiles, landTileNumbers}) {
  const defaultX = 10;
  const defaultY = 10;
  let boardContent = [];
  console.log("here we go again");
  console.log(landTileNumbers);
  for (let x=0; x<= 12; x+=2) {
    for (let y=1; y<= 5; y+=2) {
      let translateValue = "translate(" + (defaultX + 30*x) + "," + (defaultY + 50 * y) + ")";
      boardContent.push(
        <polygon 
          key={Math.random()}
          id={"tile-x"+x+"-y"+y}
          className={typeof landTiles[x] != "undefined" && typeof landTiles[x][y] != "undefined" ? "hex  " + landTiles[x][y] : "hex"}
          points="30,70 60,50 60,20 30,0 0,20 0,50"
          transform={translateValue}
        />
      )
    }
  }

  for (let x=1; x<= 11; x+=2) {
    for (let y=0; y<= 6; y+=2) {
      let translateValue = "translate(" + (defaultX + 30*x) + "," + (defaultY + 50 * y) + ")";
      boardContent.push(
        <polygon
          key={Math.random()}
          id={"tile-x"+x+"-y"+y}
          className={typeof landTiles[x] != "undefined" && typeof landTiles[x][y] != "undefined" ? "hex  " + landTiles[x][y] : "hex"}
          points="30,70 60,50 60,20 30,0 0,20 0,50"
          transform={translateValue}
        />
      )
    }
  }

  //Display the numbers
  for (let tileNumber in landTileNumbers) {
    for (let key in landTileNumbers[tileNumber]) {
      let x =landTileNumbers[tileNumber][key]["x"];
      let y = landTileNumbers[tileNumber][key]["y"];
      let className="";
      if(tileNumber == 6 || tileNumber == 8) {
        className="bigNumber"
      }
      boardContent.push(
        <text key={Math.random()} x={defaultX + 30*x + 30}  y={defaultY + 50 * y + 40} className={className} textAnchor="middle">{tileNumber}</text>
      ) 
    }
  }

  return (
    <svg className="hex-grid" viewBox="0 0 440 440">
      {boardContent}
    </svg>
  )
}

function App() {

  const [landTiles, setLandTiles] = useState(createLandTiles);
  //should find the desert and pass it into the next ones.
  const [landTileNumbers, setLandTileNumbers] = useState(() => createLandTileNumbers(landTiles));
  const [thiefLocation, setThiefLocation] = useState();
  const [portTiles, setPortTiles] = useState(() => createPortTiles(landTiles));

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
