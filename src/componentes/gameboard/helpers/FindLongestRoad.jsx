
export default function findThePlayersLongestRoad(tileCornerNodes, currentPlayer, usedRoads) {
  //Find road ends first
  let roadEndPoints = [];
  for (let x=1; x<=11; x++) {
    for (let y=1; y<=6; y++) {
      let roadDirection = [];
      if("rightRoadOwner" in tileCornerNodes[x][y] && tileCornerNodes[x][y].rightRoadOwner == currentPlayer)
        roadDirection.push("right");
      if("rightRoadOwner" in tileCornerNodes[x-1][y] && tileCornerNodes[x-1][y].rightRoadOwner == currentPlayer)
        roadDirection.push("left");
      if((x+y)%2 == 0 && "bottomRoadOwner" in tileCornerNodes[x][y] && tileCornerNodes[x][y].bottomRoadOwner == currentPlayer)
        roadDirection.push("down");
      if((x+y)%2 == 1 && "bottomRoadOwner" in tileCornerNodes[x][y-1] && tileCornerNodes[x][y-1].bottomRoadOwner == currentPlayer)
        roadDirection.push("up");

      if(roadDirection.length == 1)
        roadEndPoints.push({x:x, y:y, direction:roadDirection[0]})
      if (roadDirection.length == 2 && (tileCornerNodes[x][y].owner != "none" && tileCornerNodes[x][y].owner != currentPlayer)) {
        //If an opponent splits this road with a settlement.
        roadEndPoints.push({x:x, y:y, direction:roadDirection[0]});
        roadEndPoints.push({x:x, y:y, direction:roadDirection[1]});
      }
    }
  }

  let longestRoad = [];
  roadEndPoints.forEach(endPoint => {
    //check every roadEndPoint to find the longest road.
    let testRoad = [];
    if (endPoint.direction == "right")
      testRoad = checkNode(endPoint.x+1, endPoint.y, tileCornerNodes, currentPlayer, [endPoint]);
    if (endPoint.direction == "down")
      testRoad = checkNode(endPoint.x, endPoint.y+1, tileCornerNodes, currentPlayer, [endPoint]);
    if (endPoint.direction == "left") //These need some work...
      testRoad = checkNode(endPoint.x-1, endPoint.y, tileCornerNodes, currentPlayer, [{x:endPoint.x-1, y:endPoint.y, direction:"right"}]);
    if (endPoint.direction == "up") //These need some work.... I think.
      testRoad = checkNode(endPoint.x, endPoint.y-1, tileCornerNodes, currentPlayer, [{x:endPoint.x, y:endPoint.y-1, direction:"down"}]);
    if(testRoad.length > longestRoad.length)
      longestRoad = testRoad;
  });

  foundNewLongestRoad:if(roadEndPoints.length * longestRoad.length / 2 < usedRoads) {
    //This math appears to only trigger if a looping road exists.
    //The approach below is to look through the board from every angle until we find a looping road.
    console.log("***** We need to look for a looping road. *****");
    let testRoad = [];
    outerForLoop:for (let x=1; x<=11; x++) {
      for (let y=1; y<=6; y++) {
        if("rightRoadOwner" in tileCornerNodes[x][y] && tileCornerNodes[x][y].rightRoadOwner == currentPlayer){
          testRoad = checkNode(x, y, tileCornerNodes, currentPlayer, [{x:x, y:y, direction:"right"}], true);
          if(testRoad.length > longestRoad.length){
            longestRoad = testRoad;
            break foundNewLongestRoad;}
          break outerForLoop;
        }
      }
    }
    outerForLoop:for (let x=11; x>0; x--) {
      for (let y=6; y>0; y--) {
        if("rightRoadOwner" in tileCornerNodes[x][y] && tileCornerNodes[x][y].rightRoadOwner == currentPlayer){
          testRoad = checkNode(x, y, tileCornerNodes, currentPlayer, [{x:x, y:y, direction:"right"}], true);
          if(testRoad.length > longestRoad.length){
            longestRoad = testRoad;
            break foundNewLongestRoad;}
          break outerForLoop;
        }
      }
    }
    outerForLoop:for (let y=1; y<=6; y++) {
      for (let x=1; x<=11; x++) {
        if("rightRoadOwner" in tileCornerNodes[x][y] && tileCornerNodes[x][y].rightRoadOwner == currentPlayer){
          testRoad = checkNode(x, y, tileCornerNodes, currentPlayer, [{x:x, y:y, direction:"right"}], true);
          if(testRoad.length > longestRoad.length){
            longestRoad = testRoad;
            break foundNewLongestRoad;}
          break outerForLoop;
        }
      }
    }
    outerForLoop:for (let y=6; y>0; y--) {
      for (let x=11; x>0; x--) {
        if("rightRoadOwner" in tileCornerNodes[x][y] && tileCornerNodes[x][y].rightRoadOwner == currentPlayer){
          testRoad = checkNode(x, y, tileCornerNodes, currentPlayer, [{x:x, y:y, direction:"right"}], true);
          if(testRoad.length > longestRoad.length){
            longestRoad = testRoad;
            break foundNewLongestRoad;}
          break outerForLoop;
        }
      }
    }
  }
  return longestRoad.length;
}

function checkNode(x,y, tileCornerNodes, currentPlayer, longestRoadArray, checkingLoopRoad) {
  let longestDiscoveredRoad = [];
  let isNodeAnEndpoint = true;
  if (tileCornerNodes[x][y].owner == currentPlayer || tileCornerNodes[x][y].owner == "none") {
    if(tileCornerNodes[x][y].rightRoadOwner == currentPlayer) {
      let roadBanch = getRoadBranch(x,y,"right",longestRoadArray, checkNode, x+1, y, tileCornerNodes, currentPlayer, checkingLoopRoad);
      if (roadBanch.isNodeAnEndpoint  == false)
        isNodeAnEndpoint = roadBanch.isNodeAnEndpoint;
      if (roadBanch.returnedLongestRoad.length > longestDiscoveredRoad.length)
        longestDiscoveredRoad = roadBanch.returnedLongestRoad;
    }
    if(tileCornerNodes[x-1][y].rightRoadOwner == currentPlayer) {
      let roadBanch = getRoadBranch(x-1,y,"right",longestRoadArray, checkNode, x-1, y, tileCornerNodes, currentPlayer, checkingLoopRoad);
      if (roadBanch.isNodeAnEndpoint  == false)
        isNodeAnEndpoint = roadBanch.isNodeAnEndpoint;
      if (roadBanch.returnedLongestRoad.length > longestDiscoveredRoad.length)
        longestDiscoveredRoad = roadBanch.returnedLongestRoad;
    }
    if((x+y)%2 == 0 && tileCornerNodes[x][y].bottomRoadOwner == currentPlayer) {
      let roadBanch = getRoadBranch(x,y,"down",longestRoadArray, checkNode, x, y+1, tileCornerNodes, currentPlayer, checkingLoopRoad);
      if (roadBanch.isNodeAnEndpoint  == false)
        isNodeAnEndpoint = roadBanch.isNodeAnEndpoint;
      if (roadBanch.returnedLongestRoad.length > longestDiscoveredRoad.length)
        longestDiscoveredRoad = roadBanch.returnedLongestRoad;
    }
    if((x+y)%2 == 1 && tileCornerNodes[x][y-1].bottomRoadOwner == currentPlayer) {
      let roadBanch = getRoadBranch(x,y-1,"down",longestRoadArray, checkNode, x, y-1, tileCornerNodes, currentPlayer, checkingLoopRoad);
      if (roadBanch.isNodeAnEndpoint  == false)
        isNodeAnEndpoint = roadBanch.isNodeAnEndpoint;
      if (roadBanch.returnedLongestRoad.length > longestDiscoveredRoad.length)
        longestDiscoveredRoad = roadBanch.returnedLongestRoad;
    }
  }
  if(isNodeAnEndpoint) {
    if(checkingLoopRoad !== undefined)
      longestDiscoveredRoad = checkNode(longestRoadArray[0].x,longestRoadArray[0].y, tileCornerNodes, currentPlayer, longestRoadArray);
    else
      return longestRoadArray;
  }
  return longestDiscoveredRoad;
}

function getRoadBranch(x, y, direction, longestRoadArray, nextCheckNodeFunction, nextX, nextY, tileCornerNodes, currentPlayer){
  let isSegmentInRoadArray = false;
  let returnedLongestRoad = [];
  longestRoadArray.forEach(roadSegment => {
    if (roadSegment.x==x && roadSegment.y==y && roadSegment.direction == direction)
      isSegmentInRoadArray = true;
  })
  let isNodeAnEndpoint = true
  if(isSegmentInRoadArray == false){
    isNodeAnEndpoint = false;
    let longerRoadArray = [...longestRoadArray];
    longerRoadArray.push({x:x, y:y, direction:direction});
    returnedLongestRoad = nextCheckNodeFunction(nextX, nextY, tileCornerNodes, currentPlayer, longerRoadArray);
  }
  return {isNodeAnEndpoint:isNodeAnEndpoint, returnedLongestRoad:returnedLongestRoad }
}