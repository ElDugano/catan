export function FindThePlayersLongestRoad(tileCornerNodes, currentPlayer) {
  //Find road ends first
  let roadEndPoints = [];
  for (let x=1; x<=11; x++) {
    for (let y=1; y<=6; y++) {
      let roadDirection = [];
      if("rightRoadOwner" in tileCornerNodes[x][y] && tileCornerNodes[x][y].rightRoadOwner == currentPlayer){
        roadDirection.push("right");
      }
      if("rightRoadOwner" in tileCornerNodes[x-1][y] && tileCornerNodes[x-1][y].rightRoadOwner == currentPlayer){
        roadDirection.push("left");
      }
      if((x+y)%2 == 0 && "bottomRoadOwner" in tileCornerNodes[x][y] && tileCornerNodes[x][y].bottomRoadOwner == currentPlayer){
        roadDirection.push("down");
      }
      if((x+y)%2 == 1 && "bottomRoadOwner" in tileCornerNodes[x][y-1] && tileCornerNodes[x][y-1].bottomRoadOwner == currentPlayer){
        roadDirection.push("up");
      }
      if(roadDirection.length == 1){
        roadEndPoints.push({x:x, y:y, direction:roadDirection[0]})
      }
      if (roadDirection.length == 2 && (tileCornerNodes[x][y].owner != "none" && tileCornerNodes[x][y].owner != currentPlayer)) {
        roadEndPoints.push({x:x, y:y, direction:roadDirection[0]});
        roadEndPoints.push({x:x, y:y, direction:roadDirection[1]});
      }
    }
  }

  //check each node's longest road
  let longestRoad = [];
  if (roadEndPoints.length == 0)
  {
    console.log("Snap, we have ourselves a loop!");
      //Finding the first node like this doesn't work for a figure 8 loop.
    for (let x=1; x<=11; x++) {
      for (let y=1; y<=6; y++) {
        if("rightRoadOwner" in tileCornerNodes[x][y] && tileCornerNodes[x][y].rightRoadOwner == currentPlayer){
          //roadEndPoints.push({x:x, y:y, direction:"right"})
          longestRoad = checkLoop(x, y, tileCornerNodes, currentPlayer, [{x:x, y:y, direction:"right"}]);
          return longestRoad.length;
        }
      }
    }
  }
  roadEndPoints.forEach(endPoint => {
    let testRoad = [];
    if (endPoint.direction == "right")
      testRoad = checkNodes(endPoint.x+1, endPoint.y, tileCornerNodes, currentPlayer, new Array(endPoint));
    if (endPoint.direction == "down")
      testRoad = checkNodes(endPoint.x, endPoint.y+1, tileCornerNodes, currentPlayer, new Array(endPoint));
    if (endPoint.direction == "left") //These need some work...
      testRoad = checkNodes(endPoint.x-1, endPoint.y, tileCornerNodes, currentPlayer, [{x:endPoint.x-1, y:endPoint.y, direction:"right"}]);
    if (endPoint.direction == "up") //These need some work.... I think.
      testRoad = checkNodes(endPoint.x, endPoint.y-1, tileCornerNodes, currentPlayer, [{x:endPoint.x, y:endPoint.y-1, direction:"down"}]);
    if(testRoad.length > longestRoad.length)
      longestRoad = testRoad;
  });
  return longestRoad.length;
}

function checkNodes(x,y, tileCornerNodes, currentPlayer, longestRoadArray) {
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
        let returnedLongestRoad = checkNodes(x+1,y, tileCornerNodes, currentPlayer, longerRoadArray);
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
        let returnedLongestRoad = checkNodes(x-1,y, tileCornerNodes, currentPlayer, longerRoadArray);
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
        let returnedLongestRoad = checkNodes(x,y+1, tileCornerNodes, currentPlayer, longerRoadArray);
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
        let returnedLongestRoad = checkNodes(x,y-1, tileCornerNodes, currentPlayer, longerRoadArray);
        if (returnedLongestRoad.length > longestDiscoveredRoad.length)
          longestDiscoveredRoad = returnedLongestRoad;
      }
    }
  }
  if(isNodeAnEndpoint) {
      return longestRoadArray;
    }
  return longestDiscoveredRoad;
}

function checkLoop(x,y, tileCornerNodes, currentPlayer, longestRoadArray, currentLongestRoadLength) {
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
        let returnedLongestRoad = checkLoop(x+1,y, tileCornerNodes, currentPlayer, longerRoadArray, currentLongestRoadLength+1);
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
        let returnedLongestRoad = checkLoop(x-1,y, tileCornerNodes, currentPlayer, longerRoadArray, currentLongestRoadLength+1);
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
        let returnedLongestRoad = checkLoop(x,y+1, tileCornerNodes, currentPlayer, longerRoadArray, currentLongestRoadLength+1);
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
        let returnedLongestRoad = checkLoop(x,y-1, tileCornerNodes, currentPlayer, longerRoadArray, currentLongestRoadLength+1);
        if (returnedLongestRoad.length > longestDiscoveredRoad.length)
          longestDiscoveredRoad = returnedLongestRoad;
      }
    }
  }
  if(isNodeAnEndpoint) {
      longestDiscoveredRoad = checkNodes(longestRoadArray[0].x,longestRoadArray[0].y, tileCornerNodes, currentPlayer, longestRoadArray, currentLongestRoadLength);
    }
  return longestDiscoveredRoad;
}