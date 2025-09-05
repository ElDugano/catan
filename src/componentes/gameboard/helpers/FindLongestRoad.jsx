
export default function findThePlayersLongestRoad(tileCornerNodes, currentPlayer, usedRoads) {
  console.log("The player has used this many roads right now: "+usedRoads);
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
    //check every roadEndPoint to find the longest road.
  roadEndPoints.forEach(endPoint => {
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

  console.log("^^^^^^^^^^^");

  foundLoop:if(roadEndPoints.length * longestRoad.length / 2 < usedRoads){ //I would like a better check than this.
    console.log("The amount of end points and the longest road found don't make sense. It is likely there might be a loop somewhere in here that we have to find.");
    //This algorithim can likely exit if it finds a single new longest road.
    let testRoad = [];
    outerLoop:for (let x=1; x<=11; x++) {
      for (let y=1; y<=6; y++) {
        if("rightRoadOwner" in tileCornerNodes[x][y] && tileCornerNodes[x][y].rightRoadOwner == currentPlayer){
          testRoad = checkNode(x, y, tileCornerNodes, currentPlayer, [{x:x, y:y, direction:"right"}], true);
          if(testRoad.length > longestRoad.length){
            longestRoad = testRoad;
            break foundLoop;}
          break outerLoop;
        }
      }
    }
    outerLoop:for (let x=11; x>0; x--) {
      for (let y=6; y>0; y--) {
        if("rightRoadOwner" in tileCornerNodes[x][y] && tileCornerNodes[x][y].rightRoadOwner == currentPlayer){
          testRoad = checkNode(x, y, tileCornerNodes, currentPlayer, [{x:x, y:y, direction:"right"}], true);
          if(testRoad.length > longestRoad.length){
            longestRoad = testRoad;
            break foundLoop;}
          break outerLoop;
        }
      }
    }
    outerLoop:for (let y=1; y<=6; y++) {
      for (let x=1; x<=11; x++) {
        if("rightRoadOwner" in tileCornerNodes[x][y] && tileCornerNodes[x][y].rightRoadOwner == currentPlayer){
          testRoad = checkNode(x, y, tileCornerNodes, currentPlayer, [{x:x, y:y, direction:"right"}], true);
          if(testRoad.length > longestRoad.length){
            longestRoad = testRoad;
            break foundLoop;}
          break outerLoop;
        }
      }
    }
    outerLoop:for (let y=6; y>0; y--) {
      for (let x=11; x>0; x--) {
        if("rightRoadOwner" in tileCornerNodes[x][y] && tileCornerNodes[x][y].rightRoadOwner == currentPlayer){
          testRoad = checkNode(x, y, tileCornerNodes, currentPlayer, [{x:x, y:y, direction:"right"}], true);
          if(testRoad.length > longestRoad.length){
            longestRoad = testRoad;
            break foundLoop;}
          break outerLoop;
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