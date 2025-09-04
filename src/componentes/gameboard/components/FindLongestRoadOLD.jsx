import { TileCornerNodesContext } from "../state/tileCornerNodes/TileCornerNodesContext";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext";

//export default function FindLongestRoad() {

export function findLongestRoadFromRightRoad(x, y, tileCornerNodes, currentPlayer) {
  //So, we have a road going from x, y, heading to the right.
  let longestRoadArray=[{x:x, y:y, direction:"right"}];
  //if (tileCornerNodes[x+1][y].owner == currentPlayer)
  longestRoadArray=checkNodes(x+1,y,tileCornerNodes, currentPlayer, longestRoadArray, 1);//This function should likely be much better.
  return longestRoadArray.length;
}

export function findLongestRoadFromBottomRoad(x, y, tileCornerNodes, currentPlayer) {
  //So, we have a road going from x, y, heading to the right.
  let longestRoadArray=[{x:x, y:y, direction:"down"}];
  //if (tileCornerNodes[x+1][y].owner == currentPlayer)
  longestRoadArray=checkNodes(x,y+1,tileCornerNodes, currentPlayer, longestRoadArray, 1);//This function should likely be much better.
  return longestRoadArray.length;
}


function checkNodes(x,y, tileCornerNodes, currentPlayer, longestRoadArray, currentLongestRoadLength) {
  let longestDiscoveredRoad = [];
  let isNodeAnEndpoint = true;
  //If this node isn't owned by someone else.
  if (tileCornerNodes[x][y].owner == currentPlayer || tileCornerNodes[x][y].owner == "none") {
    //Now, these need to check if they are in the list already.
    if(tileCornerNodes[x][y].rightRoadOwner == currentPlayer) {
      let isSegmentInRoadArray = false;
      longestRoadArray.forEach(roadSegment => {
        if (roadSegment.x==x && roadSegment.y==y && roadSegment.direction == "right")
          isSegmentInRoadArray = true;
        })
      if(isSegmentInRoadArray == false){
        isNodeAnEndpoint = false;
        let longerRoadArray = [...longestRoadArray];
        longerRoadArray.push({x:x, y:y, direction:"right"});
        let returnedLongestRoad = checkNodes(x+1,y, tileCornerNodes, currentPlayer, longerRoadArray, currentLongestRoadLength+1);
        if (returnedLongestRoad.length > longestDiscoveredRoad.length)
          longestDiscoveredRoad = returnedLongestRoad;
      } 
    }
    if(tileCornerNodes[x-1][y].rightRoadOwner == currentPlayer) {
      let isSegmentInRoadArray = false;
      longestRoadArray.forEach(roadSegment => {
      if (roadSegment.x==x-1 && roadSegment.y==y && roadSegment.direction == "right")
        isSegmentInRoadArray = true;
      })
      if(isSegmentInRoadArray == false){
        isNodeAnEndpoint = false;
        let longerRoadArray = [...longestRoadArray];
        longerRoadArray.push({x:x-1, y:y, direction:"right"});
        let returnedLongestRoad = checkNodes(x-1,y, tileCornerNodes, currentPlayer, longerRoadArray, currentLongestRoadLength+1);
        if (returnedLongestRoad.length > longestDiscoveredRoad.length)
          longestDiscoveredRoad = returnedLongestRoad;
      }
    }
    if((x+y)%2 == 0 && tileCornerNodes[x][y].bottomRoadOwner == currentPlayer) {
      let isSegmentInRoadArray = false;
      longestRoadArray.forEach(roadSegment => {
      if (roadSegment.x==x && roadSegment.y==y && roadSegment.direction == "down")
        isSegmentInRoadArray = true;
      })
      if(isSegmentInRoadArray == false){
        isNodeAnEndpoint = false;
        let longerRoadArray = [...longestRoadArray];
        longerRoadArray.push({x:x, y:y, direction:"down"});
        let returnedLongestRoad = checkNodes(x,y+1, tileCornerNodes, currentPlayer, longerRoadArray, currentLongestRoadLength+1);
        if (returnedLongestRoad.length > longestDiscoveredRoad.length)
          longestDiscoveredRoad = returnedLongestRoad;
      }
    }
    if((x+y)%2 == 1 && tileCornerNodes[x][y-1].bottomRoadOwner == currentPlayer) {
      let isSegmentInRoadArray = false;
      longestRoadArray.forEach(roadSegment => {
      if (roadSegment.x==x && roadSegment.y==y-1 && roadSegment.direction == "down")
        isSegmentInRoadArray = true;
      })
      if(isSegmentInRoadArray == false){
        isNodeAnEndpoint = false;
        let longerRoadArray = [...longestRoadArray];
        longerRoadArray.push({x:x, y:y-1, direction:"down"});
        let returnedLongestRoad = checkNodes(x,y-1, tileCornerNodes, currentPlayer, longerRoadArray, currentLongestRoadLength+1);
        if (returnedLongestRoad.length > longestDiscoveredRoad.length)
          longestDiscoveredRoad = returnedLongestRoad;
      }
    }
  }
  if(isNodeAnEndpoint) {
      longestDiscoveredRoad = checkNodes2(longestRoadArray[0].x,longestRoadArray[0].y, tileCornerNodes, currentPlayer, longestRoadArray, currentLongestRoadLength);
    }
  return longestDiscoveredRoad;
}

function checkNodes2(x,y, tileCornerNodes, currentPlayer, longestRoadArray, currentLongestRoadLength) {
let longestDiscoveredRoad = [];
  let isNodeAnEndpoint = true;
  //If this node isn't owned by someone else.
  if (tileCornerNodes[x][y].owner == currentPlayer || tileCornerNodes[x][y].owner == "none") {
    //Now, these need to check if they are in the list already.
    if(tileCornerNodes[x][y].rightRoadOwner == currentPlayer) {
      let isSegmentInRoadArray = false;
      longestRoadArray.forEach(roadSegment => {
        if (roadSegment.x==x && roadSegment.y==y && roadSegment.direction == "right")
          isSegmentInRoadArray = true;
        })
      if(isSegmentInRoadArray == false){
        isNodeAnEndpoint = false;
        let longerRoadArray = [...longestRoadArray];
        longerRoadArray.push({x:x, y:y, direction:"right"});
        let returnedLongestRoad = checkNodes2(x+1,y, tileCornerNodes, currentPlayer, longerRoadArray, currentLongestRoadLength+1);
        if (returnedLongestRoad.length > longestDiscoveredRoad.length)
          longestDiscoveredRoad = returnedLongestRoad;
      } 
    }
    if(tileCornerNodes[x-1][y].rightRoadOwner == currentPlayer) {
      let isSegmentInRoadArray = false;
      longestRoadArray.forEach(roadSegment => {
      if (roadSegment.x==x-1 && roadSegment.y==y && roadSegment.direction == "right")
        isSegmentInRoadArray = true;
      })
      if(isSegmentInRoadArray == false){
        isNodeAnEndpoint = false;
        let longerRoadArray = [...longestRoadArray];
        longerRoadArray.push({x:x-1, y:y, direction:"right"});
        let returnedLongestRoad = checkNodes2(x-1,y, tileCornerNodes, currentPlayer, longerRoadArray, currentLongestRoadLength+1);
        if (returnedLongestRoad.length > longestDiscoveredRoad.length)
          longestDiscoveredRoad = returnedLongestRoad;
      }
    }
    if((x+y)%2 == 0 && tileCornerNodes[x][y].bottomRoadOwner == currentPlayer) {
      let isSegmentInRoadArray = false;
      longestRoadArray.forEach(roadSegment => {
      if (roadSegment.x==x && roadSegment.y==y && roadSegment.direction == "down")
        isSegmentInRoadArray = true;
      })
      if(isSegmentInRoadArray == false){
        isNodeAnEndpoint = false;
        let longerRoadArray = [...longestRoadArray];
        longerRoadArray.push({x:x, y:y, direction:"down"});
        let returnedLongestRoad = checkNodes2(x,y+1, tileCornerNodes, currentPlayer, longerRoadArray, currentLongestRoadLength+1);
        if (returnedLongestRoad.length > longestDiscoveredRoad.length)
          longestDiscoveredRoad = returnedLongestRoad;
      }
    }
    if((x+y)%2 == 1 && tileCornerNodes[x][y-1].bottomRoadOwner == currentPlayer) {
      let isSegmentInRoadArray = false;
      longestRoadArray.forEach(roadSegment => {
      if (roadSegment.x==x && roadSegment.y==y-1 && roadSegment.direction == "down")
        isSegmentInRoadArray = true;
      })
      if(isSegmentInRoadArray == false){
        isNodeAnEndpoint = false;
        let longerRoadArray = [...longestRoadArray];
        longerRoadArray.push({x:x, y:y-1, direction:"down"});
        let returnedLongestRoad = checkNodes2(x,y-1, tileCornerNodes, currentPlayer, longerRoadArray, currentLongestRoadLength+1);
        if (returnedLongestRoad.length > longestDiscoveredRoad.length)
          longestDiscoveredRoad = returnedLongestRoad;
      }
    }
    
    if(isNodeAnEndpoint) {
      return longestRoadArray;
    }
  }
  return longestDiscoveredRoad;
}

//}

