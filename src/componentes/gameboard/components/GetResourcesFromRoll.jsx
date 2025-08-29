import { useImperativeHandle, useContext, forwardRef } from 'react';
import { TileCornerNodesContext } from '../state/tileCornerNodes/TileCornerNodesContext';
import { LandTileNumbersContext } from '../state/landTileNumbers/landTileNumbersContext.js';
import { LandTilesContext } from '../state/landTiles/LandTilesContext.js';

function GetResourcesFromRoll({ref}) {

  const {tileCornerNodes, isNodeValueSettlement, isNodeValueCity, getTileNodeOwner} = useContext(TileCornerNodesContext);
  const {landTiles} = useContext(LandTilesContext);
  const {landTileNumbers} = useContext(LandTileNumbersContext);

  useImperativeHandle(ref, () => ({
    getResourcesFromRoll
  }));

  function getResourcesFromRoll(diceNumber) {
    //THIS NEEDS A CHECK IF THE DICE NUMBER IS SEVEN
    let playerResourceCardsGained= [{},{},{},{}];
    for (let key in landTileNumbers[diceNumber]) {
      const landTileX = landTileNumbers[diceNumber][key].x;
      const landTileY = landTileNumbers[diceNumber][key].y;
      let landType = landTiles[landTileX][landTileY];
      let resource = mapTileTypeToResourceType(landType);
      for (let x=landTileX-1; x <= landTileX+1; x++) {
        for (let y=landTileY; y <= landTileY+1; y++) {
          if (isNodeValueSettlement(x,y)) {
            if (playerResourceCardsGained[getTileNodeOwner(x, y)][resource])
              playerResourceCardsGained[getTileNodeOwner(x, y)][resource] = playerResourceCardsGained[getTileNodeOwner(x, y)][resource] + 1;
            else
              playerResourceCardsGained[getTileNodeOwner(x, y)][resource] = 1;
          }
          if (isNodeValueCity(x,y)) {
            if (playerResourceCardsGained[getTileNodeOwner(x, y)][resource])
              playerResourceCardsGained[getTileNodeOwner(x, y)][resource] = playerResourceCardsGained[getTileNodeOwner(x, y)][resource] + 2;
            else
              playerResourceCardsGained[getTileNodeOwner(x, y)][resource] = 2;
          }
        }
      }
    }
    return playerResourceCardsGained;
  };

  function mapTileTypeToResourceType(landValue) {
    switch(landValue) {
      case "Pasture":
        return "Wool";
      case "Forest":
        return "Lumber";
      case "Fields":
        return "Grain";
      case "Hills":
        return "Brick";
      case "Mountains":
        return "Ore";
      case "Desert":
        return null;
    };
  };



  return (
    <>
    </>
  )
}

export default GetResourcesFromRoll