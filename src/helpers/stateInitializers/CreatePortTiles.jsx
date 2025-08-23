import Shuffle from '../Shuffle.jsx'

export default function CreatePortTiles(landTiles){
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
