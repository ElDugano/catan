import Shuffle from '../Shuffle.jsx'

export default function CreatePortTiles(thiefLocation){
  console.log("*** createPortTiles was called. ***")
    let availablePortTypes = [
      "Wool","Lumber","Grain","Brick","Ore",
      "Standard","Standard","Standard","Standard",
    ]
    Shuffle(availablePortTypes);

    let portTilesCoordinates;
    let portOption1 = [[0,3],[2,1],[2,5],[5,0],[5,6],[9,0],[9,6],[11,2],[11,4]];
    let portOption2 = [[1,2],[1,4],[3,0],[3,6],[7,0],[7,6],[10,1],[10,5],[12,3]];
    if ((thiefLocation.x == 4 && thiefLocation.y == 1) || 
        (thiefLocation.x == 4 && thiefLocation.y == 5) ||
        (thiefLocation.x == 10 && thiefLocation.y == 3))
      portTilesCoordinates = portOption1;
    else if ((thiefLocation.x == 2 && thiefLocation.y == 3) || 
        (thiefLocation.x == 8 && thiefLocation.y == 1) ||
        (thiefLocation.x == 8 && thiefLocation.y == 5)) 
      portTilesCoordinates = portOption2;
    else
      portTilesCoordinates = Math.random() < 0.5 ? portOption1 : portOption2;

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
