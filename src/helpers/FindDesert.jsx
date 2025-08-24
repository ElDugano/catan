export default function FindDesert(landTiles) {
  console.log("*** FindDesert was called. ***");
  for (let xCoordinate in landTiles) {
    for (let yCoordinate in landTiles[xCoordinate]) {
      if (landTiles[xCoordinate][yCoordinate] == "Desert")
      {
        return {x: xCoordinate, y: yCoordinate};
      }
    }
  }
}