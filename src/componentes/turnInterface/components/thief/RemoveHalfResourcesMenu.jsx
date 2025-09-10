import { useContext, useState } from "react"
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext"
import { TurnStateContext } from "../../../../state/turnState/TurnStateContext";
import { NumberOfPlayersContext } from "../../../../state/REMOVEMEnumberOfPlayers/NumberOfPlayersContext";

export default function RemoveHalfResourcesMenu() {
  const { playerResourceCards, getAllPlayersTotalResourceCards, removeCollectionOfResourcesFromPlayer } = useContext(PlayerResourceCardsContext);
  const { setTurnStateToMoveTheThief } = useContext(TurnStateContext);
  const { numberOfPlayers } = useContext(NumberOfPlayersContext);

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

  const content=[];

  for (let playerNumber = 0; playerNumber < numberOfPlayers; playerNumber++) {
    if(playersToBePillaged[playerNumber] == true) {
      let playersDiscardedCards=totalDiscardCards(playerNumber);
      content.push(
        <div key={crypto.randomUUID()}>
          <h4>Player {playerNumber} needs to discard {numberOfCardsTobePillaged[playerNumber]} in total.</h4>
          <div style={{display: "flex", textAlign: "center"}}>
            <div>
              Wool<br />
              {playerResourceCards[playerNumber].Wool}<br />
              <span style={{color: "red"}}>{discardingResources[playerNumber].Wool}</span><br />
              <button onClick={(() => {updateDiscardingResources(playerNumber, "Wool", 1)})}>+</button><br />
              <button onClick={(() => {updateDiscardingResources(playerNumber, "Wool", -1)})}>-</button>
            </div>
            <div>
              Lumber<br />
              {playerResourceCards[playerNumber].Lumber}<br />
              <span style={{color: "red"}}>{discardingResources[playerNumber].Lumber}</span><br />
              <button onClick={(() => {updateDiscardingResources(playerNumber, "Lumber", 1)})}>+</button><br />
              <button onClick={(() => {updateDiscardingResources(playerNumber, "Lumber", -1)})}>-</button>
            </div>
            <div>
              Grain<br />
              {playerResourceCards[playerNumber].Grain}<br />
              <span style={{color: "red"}}>{discardingResources[playerNumber].Grain}</span><br />
              <button onClick={(() => {updateDiscardingResources(playerNumber, "Grain", 1)})}>+</button><br />
              <button onClick={(() => {updateDiscardingResources(playerNumber, "Grain", -1)})}>-</button>
            </div>
            <div>
              Brick<br />
              {playerResourceCards[playerNumber].Brick}<br />
              <span style={{color: "red"}}>{discardingResources[playerNumber].Brick}</span><br />
              <button onClick={(() => {updateDiscardingResources(playerNumber, "Brick", 1)})}>+</button><br />
              <button onClick={(() => {updateDiscardingResources(playerNumber, "Brick", -1)})}>-</button>
            </div>
            <div>
              Ore<br />
              {playerResourceCards[playerNumber].Ore}<br />
              <span style={{color: "red"}}>{discardingResources[playerNumber].Ore}</span><br />
              <button onClick={(() => {updateDiscardingResources(playerNumber, "Ore", 1)})}>+</button><br />
              <button onClick={(() => {updateDiscardingResources(playerNumber, "Ore", -1)})}>-</button>
            </div>
            <div>
            Total Selected cards: {playersDiscardedCards}<br /><br />
            {playersDiscardedCards == numberOfCardsTobePillaged[playerNumber] && <button onClick={() => {removeCardsFromPlayer(playerNumber)}}>Discard Selected Cards</button>}
            </div>
          </div>
        </div>
      )
    }
  }


  return (
    <>
    {content}
      <button onClick={() => setTurnStateToMoveTheThief()}>Continue your turn.</button>
    </>
  )
}