import { useContext } from "react";
import { LandTilesContext } from "../state/landTiles/LandTilesContext";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext";
import { ThiefLocationContext } from "../state/thiefLocation/ThiefLocationContext";

import { TileCornerNodesContext } from "../state/tileCornerNodes/TileCornerNodesContext";
import { PlayerResourceCardsContext } from "../../../state/playerResourceCards/PlayerResourceCardsContext";

export default function Tiles() {
  const { landTiles } = useContext(LandTilesContext);
  const { isTurnStateMoveTheThief, setTurnStateToPillageResourceCard } = useContext(TurnStateContext);
  const { thiefLocation, setThiefLocation } = useContext(ThiefLocationContext)

  const {isNodeValueSettlement, isNodeValueCity, getTileNodeOwner } = useContext(TileCornerNodesContext);
  const { setPlunderedResourcePlayers } = useContext(PlayerResourceCardsContext);

  let boardContent = [];

  //Thief related stuff should be moved to it's own function.
  //The below function should probably be moved to Gameboard.
  function moveTheThief(xCoordinate, yCoordinate) {
    setThiefLocation({x:xCoordinate, y:yCoordinate});
    let pillagedPlayers = new Array(false,false,false,false);

    for (let x=xCoordinate-1; x <= xCoordinate+1; x++) {
      for (let y=yCoordinate; y <= yCoordinate+1; y++) {
        if (isNodeValueSettlement(x,y) || isNodeValueCity(x,y))
          pillagedPlayers[getTileNodeOwner(x,y)] = true;
      }
    }
    setPlunderedResourcePlayers(pillagedPlayers);
    setTurnStateToPillageResourceCard();
  }

  // ** These two For Loops can likely be simply called by doing a for each from landTiles. ** //
  for (let x=0; x<= 12; x+=1) {
    for (let y=0; y<= 6; y+=1) {
      if ((x+y)%2 == 1) {
        let translateValue = "translate(" + (x*30) + "," + (y*50) + ")";
        boardContent.push(
          <polygon 
            key={crypto.randomUUID()}
            className={typeof landTiles[x] != "undefined" && typeof landTiles[x][y] != "undefined" ? "hex  " + landTiles[x][y] : "hex"}
            points="30,70 60,50 60,20 30,0 0,20 0,50"
            transform={translateValue}
          />
        )
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
              onClick={() => moveTheThief(x, y)}
            />
          )
        }
      }
    }
  }
  return boardContent;
}