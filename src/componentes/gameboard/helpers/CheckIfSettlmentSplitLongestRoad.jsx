import findThePlayersLongestRoad from "./FindLongestRoad";

export default function checkIfSettlmentSplitLongestRoad(tileCornerNodes, x, y, longestRoadOwner, numberOfPlayers, setLongestRoad) {
  let outterRoads = 0;
  //If current player isn't the longest road owner, which the parent already checks.
  if (tileCornerNodes[x][y].rightRoadOwner == longestRoadOwner) {outterRoads++;}
  if ("rightRoadOwner" in tileCornerNodes[x-1][y] && tileCornerNodes[x-1][y].rightRoadOwner == longestRoadOwner) {outterRoads++;}
  if ((x+y)%2 == 0 && tileCornerNodes[x][y].bottomRoadOwner == longestRoadOwner) {outterRoads++;}
  if ((x+y)%2 == 1 && "bottomRoadOwner" in tileCornerNodes[x][y-1] && tileCornerNodes[x][y-1].bottomRoadOwner == longestRoadOwner) {outterRoads++;}

  if (outterRoads == 2) {
    let newLongestRoadPlayer = null;
    let newLongestRoadLength = 4;
    for (let player = 0; player < numberOfPlayers; player++){
      const testRoad = findThePlayersLongestRoad(tileCornerNodes, player)
      if (testRoad > newLongestRoadLength){
        newLongestRoadLength = testRoad;
        newLongestRoadPlayer = player;
      }
    }
    setLongestRoad(newLongestRoadLength, newLongestRoadPlayer);
  }
}