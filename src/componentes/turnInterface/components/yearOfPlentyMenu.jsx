import { useContext, useState } from "react"
import { PlayerResourceCardsContext } from "../../../state/playerResourceCards/PlayerResourceCardsContext";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext"
import { TurnStateContext } from "../../../state/turnState/TurnStateContext";

export default function YearOfPlentyMenu() {
  const { playerResourceCards, addCollectionOfResourcesToPlayer } = useContext(PlayerResourceCardsContext);
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);
  const { setTurnStateToIdle } = useContext(TurnStateContext);

  const [receivingResources, setReceivingResources] = useState({Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0});

  function updateReceivingResources(resource, changeAmount) {
    let newReceivingResources = {...receivingResources};
    newReceivingResources[resource] += changeAmount;
    setReceivingResources(newReceivingResources);
  }

    function totalReceivedCards() {
    let totalReceivedCards = 0;
    for(let resourceName in receivingResources) {
      totalReceivedCards += receivingResources[resourceName];
    }
    return totalReceivedCards;
  }

  function addCardsToPlayer() {
    addCollectionOfResourcesToPlayer(currentPlayerTurn, receivingResources);
    setTurnStateToIdle();
  }

  return (
    <>
    <h4>Player {currentPlayerTurn} gets to select 2 free cards.</h4>
    <div style={{display: "flex", textAlign: "center"}}>
      <div>
        Wool<br />
        {playerResourceCards.Wool}<br />
        <span style={{color: "red"}}>{receivingResources.Wool}</span><br />
        <button onClick={(() => {updateReceivingResources("Wool", 1)})}>+</button><br />
        <button onClick={(() => {updateReceivingResources("Wool", -1)})}>-</button>
      </div>
      <div>
        Lumber<br />
        {playerResourceCards.Lumber}<br />
        <span style={{color: "red"}}>{receivingResources.Lumber}</span><br />
        <button onClick={(() => {updateReceivingResources("Lumber", 1)})}>+</button><br />
        <button onClick={(() => {updateReceivingResources("Lumber", -1)})}>-</button>
      </div>
      <div>
        Grain<br />
        {playerResourceCards.Grain}<br />
        <span style={{color: "red"}}>{receivingResources.Grain}</span><br />
        <button onClick={(() => {updateReceivingResources("Grain", 1)})}>+</button><br />
        <button onClick={(() => {updateReceivingResources("Grain", -1)})}>-</button>
      </div>
      <div>
        Brick<br />
        {playerResourceCards.Brick}<br />
        <span style={{color: "red"}}>{receivingResources.Brick}</span><br />
        <button onClick={(() => {updateReceivingResources("Brick", 1)})}>+</button><br />
        <button onClick={(() => {updateReceivingResources("Brick", -1)})}>-</button>
      </div>
      <div>
        Ore<br />
        {playerResourceCards.Ore}<br />
        <span style={{color: "red"}}>{receivingResources.Ore}</span><br />
        <button onClick={(() => {updateReceivingResources("Ore", 1)})}>+</button><br />
        <button onClick={(() => {updateReceivingResources("Ore", -1)})}>-</button>
      </div>
      <div>
      Total Selected cards: {totalReceivedCards()}<br /><br />
      {totalReceivedCards() == 2 && <button onClick={() => {addCardsToPlayer()}}>Recieve Selected Cards</button>}
      </div>
    </div>
    </>
  )
}