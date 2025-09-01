import { useContext } from "react";
import { LandTilesContext } from "../state/landTiles/LandTilesContext";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext";
import { ThiefLocationContext } from "../state/thiefLocation/ThiefLocationContext";

import { TileCornerNodesContext } from "../state/tileCornerNodes/TileCornerNodesContext";
import { PlayerResourceCardsContext } from "../../../state/playerResourceCards/PlayerResourceCardsContext";

export default function ThiefMoveButtons() {
  const { landTiles } = useContext(LandTilesContext);
  const { isTurnStateMoveTheThief, setTurnStateToPillageResourceCard } = useContext(TurnStateContext);
  const { thiefLocation, setThiefLocation } = useContext(ThiefLocationContext)

  const {isNodeValueSettlement, isNodeValueCity, getTileNodeOwner } = useContext(TileCornerNodesContext);
  const { setPlunderedResourcePlayers } = useContext(PlayerResourceCardsContext);

  let boardContent = [];

  function moveTheThief(xCoordinate, yCoordinate) {
    setThiefLocation({x:xCoordinate, y:yCoordinate});
    let pillagedPlayers = new Array(false,false,false,false);
    for (let x = xCoordinate - 1; x <= xCoordinate + 1; x++) {
      for (let y = yCoordinate; y <= yCoordinate + 1; y++) {
        if (isNodeValueSettlement(x,y) || isNodeValueCity(x,y))
          pillagedPlayers[getTileNodeOwner(x,y)] = true;
      }
    }
        console.log("Do we get here?");
    setPlunderedResourcePlayers(pillagedPlayers);
    setTurnStateToPillageResourceCard();
  }


  //** This does a weird thing where x and y are held as strings.**//
  //** This caused issues, which is why I have to use parseInt().**//

  //** TODO, I need to make this check if it is a thief first    **//

  for (let x in landTiles) {
    for (let y in landTiles[x]) {
      let translateValue = "translate(" + (x*30) + "," + (y*50) + ")";
      if(isTurnStateMoveTheThief() && (
            typeof landTiles[x] != "undefined" &&
            typeof landTiles[x][y] != "undefined") && !(
            x == thiefLocation.x &&
            y == thiefLocation.y)) {
          boardContent.push(
            <polygon 
              key={crypto.randomUUID()}
              className={"ThiefSelectTileButton"}
              points="30,70 60,50 60,20 30,0 0,20 0,50"
              transform={translateValue}
              onClick={() => moveTheThief(parseInt(x), parseInt(y))}
            />
          )
        }
    }
  }
  
  return boardContent;
}