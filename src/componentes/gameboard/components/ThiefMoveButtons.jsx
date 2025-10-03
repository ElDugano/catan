import { useContext, useState, useEffect } from "react";
import { LandTilesContext } from "../state/landTiles/LandTilesContext";
import { TurnStateContext } from "../../../state/turnState/TurnStateContext";
import { ThiefLocationContext } from "../state/thiefLocation/ThiefLocationContext";

import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { NetworkingMessageSenderContext } from "../../networking/Host/NetworkingMessageSenderContext";

export default function ThiefMoveButtons() {
  const { landTiles } = useContext(LandTilesContext);
  const { isTurnStateMoveTheThief } = useContext(TurnStateContext);
  const { thiefLocation } = useContext(ThiefLocationContext)

  const { isClientPlayersTurn } = useContext(CurrentPlayerTurnContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  const [recentlyTouched, setRecentlyTouched] = useState(false);
  useEffect(()=>{
    if (recentlyTouched == true) {
      setTimeout(() => {setRecentlyTouched(false)},200);
    }
  },[recentlyTouched]);

  let boardContent = [];

  function moveTheThief(x, y) {
    addToMessagePayloadToHost({header: "Move The Thief"});
    addToMessagePayloadToHost({moveTheThief:{x:x,y:y}});
    sendTheMessages();
  }

  for (let x in landTiles) {
    for (let y in landTiles[x]) {
      let translateValue = "translate(" + (x*30) + "," + (y*50) + ")";
      if( isClientPlayersTurn() &&
          isTurnStateMoveTheThief() && (
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
              onTouchStart={() => setRecentlyTouched(true)}
              onTouchEnd={() => (recentlyTouched == true) && moveTheThief(parseInt(x), parseInt(y))}
            />
          )
        }
    }
  }
  
  return boardContent;
}