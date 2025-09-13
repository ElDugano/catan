import { useContext, useState } from "react"
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext"
import { TurnStateContext } from "../../../../state/turnState/TurnStateContext";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";

import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext";

export default function RemoveHalfResourcesMenu() {
  const { playerResourceCards,
          discardHalfResourcesPlayers,
          discardHalfResourcesCardAmount } = useContext(PlayerResourceCardsContext);
  const { setTurnStateToMoveTheThief } = useContext(TurnStateContext);
  const { clientPlayerNumber } = useContext(CurrentPlayerTurnContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

    //This doesn't need to be an array anymore.
  const [discardingResources, setDiscardingResrouces] = useState({Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0});

  function updateDiscardingResources(resource, changeAmount) {
    let newDiscardingResources = {...discardingResources};
    newDiscardingResources[resource] += changeAmount;
    setDiscardingResrouces(newDiscardingResources);
  }

  function totalDiscardCards() {
    let totalDiscardingCards = 0;
    for(let resourceName in discardingResources) {
      totalDiscardingCards += discardingResources[resourceName];
    }
    return totalDiscardingCards;
  }

  const removeCardsFromPlayer = () => {
    console.log("Going to remove some resources.")
    addToMessagePayloadToHost({header: "Removing Half Resources"});
    addToMessagePayloadToHost({removeHalfResources:{player: clientPlayerNumber, discardingResources: discardingResources}});
    sendTheMessages();
  }

  //const content=[];//This doesn't need to be an array.

  if(discardHalfResourcesPlayers[clientPlayerNumber] == true) {
    let playersDiscardedCards=totalDiscardCards();
    return (
      <div key={crypto.randomUUID()}>
        <h4>Player {clientPlayerNumber} needs to discard {discardHalfResourcesCardAmount[clientPlayerNumber]} in total.</h4>
        <div style={{display: "flex", textAlign: "center"}}>
          <div>
            Wool<br />
            {playerResourceCards[clientPlayerNumber].Wool}<br />
            <span style={{color: "red"}}>{discardingResources.Wool}</span><br />
            <button onClick={(() => {updateDiscardingResources("Wool", 1)})}>+</button><br />
            <button onClick={(() => {updateDiscardingResources("Wool", -1)})}>-</button>
          </div>
          <div>
            Lumber<br />
            {playerResourceCards[clientPlayerNumber].Lumber}<br />
            <span style={{color: "red"}}>{discardingResources.Lumber}</span><br />
            <button onClick={(() => {updateDiscardingResources("Lumber", 1)})}>+</button><br />
            <button onClick={(() => {updateDiscardingResources("Lumber", -1)})}>-</button>
          </div>
          <div>
            Grain<br />
            {playerResourceCards[clientPlayerNumber].Grain}<br />
            <span style={{color: "red"}}>{discardingResources.Grain}</span><br />
            <button onClick={(() => {updateDiscardingResources("Grain", 1)})}>+</button><br />
            <button onClick={(() => {updateDiscardingResources("Grain", -1)})}>-</button>
          </div>
          <div>
            Brick<br />
            {playerResourceCards[clientPlayerNumber].Brick}<br />
            <span style={{color: "red"}}>{discardingResources.Brick}</span><br />
            <button onClick={(() => {updateDiscardingResources("Brick", 1)})}>+</button><br />
            <button onClick={(() => {updateDiscardingResources("Brick", -1)})}>-</button>
          </div>
          <div>
            Ore<br />
            {playerResourceCards[clientPlayerNumber].Ore}<br />
            <span style={{color: "red"}}>{discardingResources.Ore}</span><br />
            <button onClick={(() => {updateDiscardingResources("Ore", 1)})}>+</button><br />
            <button onClick={(() => {updateDiscardingResources("Ore", -1)})}>-</button>
          </div>
          <div>
          Total Selected cards: {playersDiscardedCards}<br /><br />
          {playersDiscardedCards == discardHalfResourcesCardAmount[clientPlayerNumber] && <button onClick={removeCardsFromPlayer}>Discard Selected Cards</button>}
          </div>
        </div>
      </div>
    )
  }
  else return (
    <>You are all good, brotha.</>
  )


 //return (
 //  <>
 //  {content}
 //    <button onClick={() => setTurnStateToMoveTheThief()}>Continue your turn.</button>
 //  </>
 //)
}