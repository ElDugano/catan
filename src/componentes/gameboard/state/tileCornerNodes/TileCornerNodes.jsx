import { useState } from "react";
import { TileCornerNodesContext } from "./TileCornerNodesContext.js";

export const TileCornerNodes = ({ children }) => {
  const [tileCornerNodes, setTileCornerNodes] = useState(CreateTileCornerNodes);

  const isNodeValueSettlement = (x, y) => { return tileCornerNodes[x][y].value == "settlement" ? true : false};
  const isNodeValueCity = (x, y) => { return tileCornerNodes[x][y].value == "city" ? true : false};
  const isNodeValueOcean = (x, y) => { return tileCornerNodes[x][y].value == "Ocean" ? true : false};
  const isNodeValueLand = (x, y) => { return tileCornerNodes[x][y].value == "Land" ? true : false};

  const getTileNodeOwner = (x, y) => { return tileCornerNodes[x][y].owner};

  const setNodeValueToSettlement = (x, y, newOwner) => {
    let newTileCornerNodes = [...tileCornerNodes];
    newTileCornerNodes[x][y].value="settlement";
    newTileCornerNodes[x][y].owner=newOwner;
    setTileCornerNodes(newTileCornerNodes);
  }
  const setNodeValueToCity = (x, y) => {
    let newTileCornerNodes = [...tileCornerNodes];
    newTileCornerNodes[x][y].value="city";
    setTileCornerNodes(newTileCornerNodes);
  }

  const setNodeRightRoadOwner = (x, y, newOwner) => {
    let newTileCornerNodes = [...tileCornerNodes];
    newTileCornerNodes[x][y].rightRoadOwner=newOwner;
    setTileCornerNodes(newTileCornerNodes);
  }
  const setNodeBottomRoadOwner = (x, y, newOwner) => {
    let newTileCornerNodes = [...tileCornerNodes];
    newTileCornerNodes[x][y].bottomRoadOwner=newOwner;
    setTileCornerNodes(newTileCornerNodes);
  }

  //const addPortsToNode = (port1, port2) => {
  //  let newTileCornerNodes = [...tileCornerNodes];
  //  newTileCornerNodes[port1.x][port1.y].port = port1.type;
  //  newTileCornerNodes[port2.x][port2.y].port = port2.type;
  //  setTileCornerNodes(newTileCornerNodes);
  //}
  
  const addPortsToNode = (portArray) => {
    let newTileCornerNodes = [...tileCornerNodes];
    portArray.forEach(port => {
      newTileCornerNodes[port.x][port.y].port = port.type;
    })
    setTileCornerNodes(newTileCornerNodes);
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
              columnNodes.push({value:"Ocean",owner:"none",});
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
    return cornerNodes;
  }

  return (
      <TileCornerNodesContext.Provider value={{
        tileCornerNodes,
        isNodeValueSettlement,
        isNodeValueCity,
        isNodeValueOcean,
        isNodeValueLand,
        getTileNodeOwner,
        setNodeValueToSettlement,
        setNodeValueToCity,
        setNodeRightRoadOwner,
        setNodeBottomRoadOwner,
        addPortsToNode
      }}>
        {children}
      </TileCornerNodesContext.Provider>
  )
}