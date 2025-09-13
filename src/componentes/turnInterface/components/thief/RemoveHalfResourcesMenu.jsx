import { useContext, useState } from "react"
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext"
import { TurnStateContext } from "../../../../state/turnState/TurnStateContext";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";

export default function RemoveHalfResourcesMenu() {
  const { playerResourceCards, getAllPlayersTotalResourceCards, removeCollectionOfResourcesFromPlayer } = useContext(PlayerResourceCardsContext);
  const { setTurnStateToMoveTheThief } = useContext(TurnStateContext);
  const { numberOfPlayers, clientPlayerNumber } = useContext(CurrentPlayerTurnContext);

  const AllPlayersTotalCards = getAllPlayersTotalResourceCards();

  const [discardingResources, setDiscardingResrouces] = useState([
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0},
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0},
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0},
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0}
  ]);

  const [playersToBePillaged, setPlayersToBePillaged] = useState(() => {
    let thePlayersToBePillaged = [false, false, false, false];
    AllPlayersTotalCards.forEach((numberOfCards, playerNumber) => {
      if (numberOfCards >= 8) {
        thePlayersToBePillaged[playerNumber]=true;
      }
    })
    return thePlayersToBePillaged;
  })
  const [numberOfCardsTobePillaged/*, setNumberOfCardsTobePillaged*/] = useState(() => {
    let numberOfCardsNeededToDiscard = new Array(numberOfPlayers);
    AllPlayersTotalCards.forEach((numberOfCards, playerNumber) => {
      numberOfCardsNeededToDiscard[playerNumber] = Math.floor(numberOfCards/2)
    });
    return numberOfCardsNeededToDiscard;
  })
  //TODO, the above should be sent over by the host.
  //Clients should send back the cards they have removed.
  //When enough cards have been removed, continue to the next step.
  //These can likely be placed in PlayerResourceCards.

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
    let updatedPlayersToBePillaged = playersToBePillaged;
    updatedPlayersToBePillaged[player] = false;
    if(updatedPlayersToBePillaged.every(val => val === false))
      setTurnStateToMoveTheThief();
    else
      setPlayersToBePillaged(updatedPlayersToBePillaged);
  }

  const content=[];//This doesn't need to be an array.

  if(playersToBePillaged[clientPlayerNumber] == true) {
    let playersDiscardedCards=totalDiscardCards(clientPlayerNumber);
    content.push(
      <div key={crypto.randomUUID()}>
        <h4>Player {clientPlayerNumber} needs to discard {numberOfCardsTobePillaged[clientPlayerNumber]} in total.</h4>
        <div style={{display: "flex", textAlign: "center"}}>
          <div>
            Wool<br />
            {playerResourceCards[clientPlayerNumber].Wool}<br />
            <span style={{color: "red"}}>{discardingResources[clientPlayerNumber].Wool}</span><br />
            <button onClick={(() => {updateDiscardingResources(clientPlayerNumber, "Wool", 1)})}>+</button><br />
            <button onClick={(() => {updateDiscardingResources(clientPlayerNumber, "Wool", -1)})}>-</button>
          </div>
          <div>
            Lumber<br />
            {playerResourceCards[clientPlayerNumber].Lumber}<br />
            <span style={{color: "red"}}>{discardingResources[clientPlayerNumber].Lumber}</span><br />
            <button onClick={(() => {updateDiscardingResources(clientPlayerNumber, "Lumber", 1)})}>+</button><br />
            <button onClick={(() => {updateDiscardingResources(clientPlayerNumber, "Lumber", -1)})}>-</button>
          </div>
          <div>
            Grain<br />
            {playerResourceCards[clientPlayerNumber].Grain}<br />
            <span style={{color: "red"}}>{discardingResources[clientPlayerNumber].Grain}</span><br />
            <button onClick={(() => {updateDiscardingResources(clientPlayerNumber, "Grain", 1)})}>+</button><br />
            <button onClick={(() => {updateDiscardingResources(clientPlayerNumber, "Grain", -1)})}>-</button>
          </div>
          <div>
            Brick<br />
            {playerResourceCards[clientPlayerNumber].Brick}<br />
            <span style={{color: "red"}}>{discardingResources[clientPlayerNumber].Brick}</span><br />
            <button onClick={(() => {updateDiscardingResources(clientPlayerNumber, "Brick", 1)})}>+</button><br />
            <button onClick={(() => {updateDiscardingResources(clientPlayerNumber, "Brick", -1)})}>-</button>
          </div>
          <div>
            Ore<br />
            {playerResourceCards[clientPlayerNumber].Ore}<br />
            <span style={{color: "red"}}>{discardingResources[clientPlayerNumber].Ore}</span><br />
            <button onClick={(() => {updateDiscardingResources(clientPlayerNumber, "Ore", 1)})}>+</button><br />
            <button onClick={(() => {updateDiscardingResources(clientPlayerNumber, "Ore", -1)})}>-</button>
          </div>
          <div>
          Total Selected cards: {playersDiscardedCards}<br /><br />
          {playersDiscardedCards == numberOfCardsTobePillaged[clientPlayerNumber] && <button onClick={() => {removeCardsFromPlayer(playerNumber)}}>Discard Selected Cards</button>}
          </div>
        </div>
      </div>
    )
  }


  return (
    <>
    {content}
      <button onClick={() => setTurnStateToMoveTheThief()}>Continue your turn.</button>
    </>
  )
}