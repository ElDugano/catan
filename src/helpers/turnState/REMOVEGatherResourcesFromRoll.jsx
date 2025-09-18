import { useContext, useEffect } from 'react';

import { TurnStateContext } from '../../state/turnState/TurnStateContext.js';
import { PlayerResourceCardsContext } from '../../state/playerResourceCards/PlayerResourceCardsContext.js';

import { DiceContext } from '../../state/dice/DiceContext.js';

import { TileCornerNodesContext } from '../../componentes/gameboard/state/tileCornerNodes/TileCornerNodesContext.js';
import { LandTileNumbersContext } from '../../componentes/gameboard/state/landTileNumbers/LandTileNumbersContext.js';
import { LandTilesContext } from '../../componentes/gameboard/state/landTiles/LandTilesContext.js';

import mapTileTypeToResourceType from './MapTileTypeToResourceType.jsx';

export default function GatherResourcesFromRoll() {
  const {isTurnStateGatheringResources, setTurnStateToGatheringResourcescAknowledgement} = useContext(TurnStateContext);
  const {addResourcesFromDiceRollToPlayerResourceCards} = useContext(PlayerResourceCardsContext);

  const {diceAdded} = useContext(DiceContext);

  const {isNodeValueSettlement, isNodeValueCity, getTileNodeOwner} = useContext(TileCornerNodesContext);
  const {landTiles} = useContext(LandTilesContext);
  const {landTileNumbers} = useContext(LandTileNumbersContext);

  useEffect(() => {
    if (isTurnStateGatheringResources()) {
      console.log("&&&&&&&&&&&&&&&&&&&&& THIS DID SOMETHING &&&&&&&&&&&&&&&&&&");
      let diceNumber = diceAdded();
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
      console.log(playerResourceCardsGained);
      addResourcesFromDiceRollToPlayerResourceCards(playerResourceCardsGained);
      setTurnStateToGatheringResourcescAknowledgement();
    };
  })
  return (
    <>
    </>
  )
}