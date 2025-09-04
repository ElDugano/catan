import { useState, useContext } from "react";
import { PortTilesContext } from "./PortTilesContext";
import { TileCornerNodesContext } from "../tileCornerNodes/TileCornerNodesContext";
import Shuffle from "../../../../helpers/Shuffle";
//import FindDesert from "../../stateInitializers/FindDesert";
import { LandTilesContext } from "../landTiles/LandTilesContext";

export const PortTiles = ({ children }) => {
  const {desertLocation} = useContext(LandTilesContext);
  const {addPortsToNode} = useContext(TileCornerNodesContext);

  const [portTiles/*, setPortTiles*/] = useState(CreatePortTiles);




  function CreatePortTiles(){
    console.log("*** createPortTiles was called. ***")
    let availablePortTypes = [
      "Wool","Lumber","Grain","Brick","Ore",
      "Standard","Standard","Standard","Standard",
    ]
    Shuffle(availablePortTypes);

    let portTilesCoordinates;
    let portOption1 = [[0,3],[2,1],[2,5],[5,0],[5,6],[9,0],[9,6],[11,2],[11,4]];
    let portOption2 = [[1,2],[1,4],[3,0],[3,6],[7,0],[7,6],[10,1],[10,5],[12,3]];
    if ((desertLocation.x == 4 && desertLocation.y == 1) || 
        (desertLocation.x == 4 && desertLocation.y == 5) ||
        (desertLocation.x == 10 && desertLocation.y == 3))
      portTilesCoordinates = portOption1;
    else if ((desertLocation.x == 2 && desertLocation.y == 3) || 
        (desertLocation.x == 8 && desertLocation.y == 1) ||
        (desertLocation.x == 8 && desertLocation.y == 5)) 
      portTilesCoordinates = portOption2;
    else
      portTilesCoordinates = Math.random() < 0.5 ? portOption1 : portOption2;

    let portTiles = {
      0: {3:{type:"Ocean",port1:{x:1, y:3},port2:{x:1, y:4}}},
      1: {2:{type:"Ocean",port1:{x:2, y:2},port2:{x:2, y:3}},  4:{type:"Ocean",port1:{x:2, y:4},port2:{x:2 ,y:5}}},
      2: {1:{type:"Ocean",port1:{x:2, y:2},port2:{x:3, y:2}},  5:{type:"Ocean",port1:{x:2, y:5},port2:{x:3 ,y:5}}},
      3: {0:{type:"Ocean",port1:{x:3, y:1},port2:{x:4, y:1}},  6:{type:"Ocean",port1:{x:3, y:6},port2:{x:4 ,y:6}}},
      5: {0:{type:"Ocean",port1:{x:5, y:1},port2:{x:6, y:1}},  6:{type:"Ocean",port1:{x:5, y:6},port2:{x:6 ,y:6}}},
      7: {0:{type:"Ocean",port1:{x:6, y:1},port2:{x:7, y:1}},  6:{type:"Ocean",port1:{x:6, y:6},port2:{x:7 ,y:6}}},
      9: {0:{type:"Ocean",port1:{x:8, y:1},port2:{x:9, y:1}},  6:{type:"Ocean",port1:{x:8, y:6},port2:{x:9 ,y:6}}},
      10:{1:{type:"Ocean",port1:{x:9, y:1},port2:{x:9, y:2}},  5:{type:"Ocean",port1:{x:9, y:5},port2:{x:10,y:5}}},
      11:{2:{type:"Ocean",port1:{x:10,y:2},port2:{x:10,y:3}},  4:{type:"Ocean",port1:{x:10,y:4},port2:{x:10,y:5}}},
      12:{3:{type:"Ocean",port1:{x:11,y:3},port2:{x:11,y:4}}}
    };
    let portNodes=[];
    while (portTilesCoordinates.length > 0) {
      portTiles[portTilesCoordinates[0][0]][portTilesCoordinates[0][1]].type=availablePortTypes.shift();
      portNodes.push({x:portTiles[portTilesCoordinates[0][0]][portTilesCoordinates[0][1]].port1.x,
                      y:portTiles[portTilesCoordinates[0][0]][portTilesCoordinates[0][1]].port1.y,
                      type:portTiles[portTilesCoordinates[0][0]][portTilesCoordinates[0][1]].type});
      portNodes.push({x:portTiles[portTilesCoordinates[0][0]][portTilesCoordinates[0][1]].port2.x,
                      y:portTiles[portTilesCoordinates[0][0]][portTilesCoordinates[0][1]].port2.y,
                      type:portTiles[portTilesCoordinates[0][0]][portTilesCoordinates[0][1]].type});
      //Below is to make portTiles only know about the tiles and not what nodes they are attached to.
      //Ideally this would be how we handle things, but the ports.jsx reads this.
      //delete portTiles[portTilesCoordinates[0][0]][portTilesCoordinates[0][1]].port1;
      //delete portTiles[portTilesCoordinates[0][0]][portTilesCoordinates[0][1]].port2;
      portTilesCoordinates.shift();
    };
    addPortsToNode(portNodes);

    console.log("And the port tiles are");
    console.log(portTiles);
    return portTiles;
}

  return (
      <PortTilesContext.Provider value={{
        portTiles
      }}>
        {children}
      </PortTilesContext.Provider>
  )
}