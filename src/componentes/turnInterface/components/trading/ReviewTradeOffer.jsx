import { useContext } from "react"
import { TurnStateContext } from "../../../../state/turnState/TurnStateContext"
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext";

import lumberIcon from "../../../../assets/lumberIcon.svg";
import brickIcon from "../../../../assets/brickIcon.svg";
import woolIcon from "../../../../assets/woolIcon.svg";
import grainIcon from "../../../../assets/grainIcon.svg";
import oreIcon from "../../../../assets/oreIcon.svg";

export default function ReviewingTradeOffer() {
   const { setTurnStateToIdle } = useContext(TurnStateContext);
   const { tradeOffer } = useContext(PlayerResourceCardsContext);

   let content = [];
   for ( let resource in tradeOffer[0].resources) {
    if (tradeOffer[0].resources[resource] != 0) {
      content.push(
        <div key={crypto.randomUUID()}>
          {tradeOffer[0].resources[resource]} {resource}.
        </div>
      )
    }
   }
   for ( let resource in tradeOffer[1].resources) {
    if (tradeOffer[1].resources[resource] != 0) {
      content.push(
        <div key={crypto.randomUUID()}>
          {tradeOffer[1].resources[resource]} {resource}.
        </div>
      )
    }
   }

   console.log(tradeOffer);
  return(
    <>
      <div>
        This is a trade between Player {tradeOffer[0].player} and Player {tradeOffer[1].player}
      </div>
      {content}
      <button onClick={setTurnStateToIdle}>Cancel Offer</button>
    </>
  )
}