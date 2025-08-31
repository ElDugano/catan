import { useContext, useState } from "react"
import { PlayerResourceCardsContext } from "../../../state/playerResourceCards/PlayerResourceCardsContext"
import { TurnStateContext } from "../../../state/turnState/TurnStateContext";

export default function RemoveHalfResourcesMenu() {
  const { playerResourceCards, getAllPlayersTotalResrouceCards, removeCollectionOfResourcesFromPlayer } = useContext(PlayerResourceCardsContext);
  const { setTurnStateToIdle } = useContext(TurnStateContext);

  const AllPlayersTotalCards = getAllPlayersTotalResrouceCards();

  const [discardingResources, setDiscardingResrouces] = useState([
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0},
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0},
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0},
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0}
  ]);

  function updateDiscardingResources(player, resource, changeAmount) {
    let newDiscardingResources = [...discardingResources];
    newDiscardingResources[player][resource] += changeAmount;
    setDiscardingResrouces(newDiscardingResources);
  }

  function totalDiscardCards(player) {
    let totalDiscardingCards = 0;
    for(let resourceName in discardingResources[player]) {
      totalDiscardingCards += discardingResources[player][resourceName];
    }
    return totalDiscardingCards;
  }

  function removeCardsFromPlayer(player) {
    removeCollectionOfResourcesFromPlayer(player, discardingResources[player]);
  }

  const content=[];
  AllPlayersTotalCards.forEach((numberOfCards, playerNumber) => {
    if (numberOfCards >= 8) {
      let numberOfCardsNeededToDiscard = Math.floor(numberOfCards/2)
      let playersDiscardedCards=totalDiscardCards(playerNumber);
      console.log("Player "+playerNumber+" needs to discard.");

      content.push(<div key={crypto.randomUUID()}>
        <h4>Player {playerNumber} needs to discard {numberOfCardsNeededToDiscard} in total.</h4>
        <div style={{display: "flex", textAlign: "center"}}>
          <div>
            Wool<br />{playerResourceCards[playerNumber].Wool}<br />
            <span style={{color: "red"}}>{discardingResources[playerNumber].Wool}</span><br />
            <button onClick={(() => {updateDiscardingResources(playerNumber, "Wool", 1)})}>+</button><br />
            <button onClick={(() => {updateDiscardingResources(playerNumber, "Wool", -1)})}>-</button>
          </div>
          <div>
            Lumber<br />{playerResourceCards[playerNumber].Lumber}<br />
            <span style={{color: "red"}}>{discardingResources[playerNumber].Lumber}</span><br />
            <button onClick={(() => {updateDiscardingResources(playerNumber, "Lumber", 1)})}>+</button><br />
            <button onClick={(() => {updateDiscardingResources(playerNumber, "Lumber", -1)})}>-</button>
          </div>
          <div>
            Grain<br />{playerResourceCards[playerNumber].Grain}<br />
            <span style={{color: "red"}}>{discardingResources[playerNumber].Grain}</span><br />
            <button onClick={(() => {updateDiscardingResources(playerNumber, "Grain", 1)})}>+</button><br />
            <button onClick={(() => {updateDiscardingResources(playerNumber, "Grain", -1)})}>-</button>
          </div>
          <div>
            Brick<br />{playerResourceCards[playerNumber].Brick}<br />
            <span style={{color: "red"}}>{discardingResources[playerNumber].Brick}</span><br />
            <button onClick={(() => {updateDiscardingResources(playerNumber, "Brick", 1)})}>+</button><br />
            <button onClick={(() => {updateDiscardingResources(playerNumber, "Brick", -1)})}>-</button>
          </div>
          <div>
            Ore<br />{playerResourceCards[playerNumber].Ore}<br />
            <span style={{color: "red"}}>{discardingResources[playerNumber].Ore}</span><br />
            <button onClick={(() => {updateDiscardingResources(playerNumber, "Ore", 1)})}>+</button><br />
            <button onClick={(() => {updateDiscardingResources(playerNumber, "Ore", -1)})}>-</button>
          </div>
          <div>
          Total Selected cards: {playersDiscardedCards}<br /><br />
          {playersDiscardedCards == numberOfCardsNeededToDiscard && <button onClick={() => {removeCardsFromPlayer(playerNumber)}}>Discard Selected Cards</button>}
          </div>
        </div>
      </div>)
    }
  })

  return (
    <>
    {content}
      <button onClick={() => setTurnStateToIdle()}>Continue your turn.</button>
    </>
  )
}