import { useContext, useState } from "react"
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext"
//import { TurnStateContext } from "../../../../state/turnState/TurnStateContext";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";

import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext";

import lumberIcon from "../../../../assets/lumberIcon.svg";
import brickIcon from "../../../../assets/brickIcon.svg";
import woolIcon from "../../../../assets/woolIcon.svg";
import grainIcon from "../../../../assets/grainIcon.svg";
import oreIcon from "../../../../assets/oreIcon.svg";
import "./removeHalfResources.css";

export default function RemoveHalfResourcesMenu() {
  const { playerResourceCards,
          discardHalfResourcesPlayers,
          discardHalfResourcesCardAmount } = useContext(PlayerResourceCardsContext);
  const { clientPlayerNumber } = useContext(CurrentPlayerTurnContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  const [discardingResources, setDiscardingResrouces] = useState({Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0});

    const oneLumberIcon = playerResourceCards[clientPlayerNumber].Lumber >= 1 ? <img src={lumberIcon} /> : <img className="notEnoughResources" src={lumberIcon} />;
    const oneBrickIcon = playerResourceCards[clientPlayerNumber].Brick >= 1 ? <img src={brickIcon} /> : <img className="notEnoughResources" src={brickIcon} />;
    const oneWoolIcon = playerResourceCards[clientPlayerNumber].Wool >= 1 ? <img src={woolIcon} /> : <img className="notEnoughResources" src={woolIcon} />;
    const oneGrainIcon = playerResourceCards[clientPlayerNumber].Grain >= 1 ? <img src={grainIcon} /> : <img className="notEnoughResources" src={grainIcon} />;
    const oneOreIcon = playerResourceCards[clientPlayerNumber].Ore >= 1 ? <img src={oreIcon} /> : <img className="notEnoughResources" src={oreIcon} />;

  function updateDiscardingResources(resource, changeAmount) {
    let newDiscardingResources = {...discardingResources};
    newDiscardingResources[resource] += changeAmount;
    setDiscardingResrouces(newDiscardingResources);
  }

  //function totalDiscardCards() {
  //  let totalDiscardingCards = 0;
  //  for(let resourceName in discardingResources) {
  //    totalDiscardingCards += discardingResources[resourceName];
  //  }
  //  return totalDiscardingCards;
  //}

  const removeCardsFromPlayer = () => {
    console.log("Going to remove some resources.")
    addToMessagePayloadToHost({header: "Removing Half Resources"});
    addToMessagePayloadToHost({removeHalfResources:{player: clientPlayerNumber, discardingResources: discardingResources}});
    sendTheMessages();
  }

  const totalCardsToDiscardLeft = discardHalfResourcesCardAmount[clientPlayerNumber] - discardingResources.Lumber - discardingResources.Brick - discardingResources.Wool - discardingResources.Grain - discardingResources.Ore

  if(discardHalfResourcesPlayers[clientPlayerNumber] == true) {
    return (
      <div>
        <div className="discardHalfResourcesMenuHeader">
          {totalCardsToDiscardLeft == 0 ? <button onClick={removeCardsFromPlayer}>Discard Selected Cards</button> : <h4>Select { totalCardsToDiscardLeft } Resources<br />to discard</h4>}
        </div>
        <div className="discardHalfResourcesMenu">
          <div className="resourceHolder">
            <div>{oneLumberIcon}<br />{playerResourceCards[clientPlayerNumber].Lumber - discardingResources.Lumber}</div>
            {discardingResources.Lumber == 0 ?
              <button disabled onClick={(() => {updateDiscardingResources("Lumber", -1)})}>-</button> :
              <button onClick={(() => {updateDiscardingResources("Lumber", -1)})}>-</button>}
            {discardingResources.Lumber == playerResourceCards[clientPlayerNumber].Lumber || totalCardsToDiscardLeft == 0 ?
              <button disabled onClick={(() => {updateDiscardingResources("Lumber", 1)})}>Remove {discardingResources.Lumber}</button> :
              <button onClick={(() => {updateDiscardingResources("Lumber", 1)})}>Remove {discardingResources.Lumber}</button>}
          </div>

          <div className="resourceHolder">
            <div>{oneBrickIcon}<br />{playerResourceCards[clientPlayerNumber].Brick - discardingResources.Brick}</div>
            {discardingResources.Brick == 0 ?
              <button disabled onClick={(() => {updateDiscardingResources("Brick", -1)})}>-</button> :
              <button onClick={(() => {updateDiscardingResources("Brick", -1)})}>-</button>}
            {discardingResources.Brick == playerResourceCards[clientPlayerNumber].Brick || totalCardsToDiscardLeft == 0 ?
              <button disabled onClick={(() => {updateDiscardingResources("Brick", 1)})}>Remove {discardingResources.Brick}</button> :
              <button onClick={(() => {updateDiscardingResources("Brick", 1)})}>Remove {discardingResources.Brick}</button>}
          </div>

          <div className="resourceHolder">
            <div>{oneWoolIcon}<br />{playerResourceCards[clientPlayerNumber].Wool - discardingResources.Wool}</div>
            {discardingResources.Wool == 0 ?
              <button disabled onClick={(() => {updateDiscardingResources("Wool", -1)})}>-</button> :
              <button onClick={(() => {updateDiscardingResources("Wool", -1)})}>-</button>}
            {discardingResources.Wool == playerResourceCards[clientPlayerNumber].Wool || totalCardsToDiscardLeft == 0 ?
              <button disabled onClick={(() => {updateDiscardingResources("Wool", 1)})}>Remove {discardingResources.Wool}</button> :
              <button onClick={(() => {updateDiscardingResources("Wool", 1)})}>Remove {discardingResources.Wool}</button>}
          </div>

          <div className="resourceHolder">
            <div>{oneGrainIcon}<br />{playerResourceCards[clientPlayerNumber].Grain - discardingResources.Grain}</div>
            {discardingResources.Grain == 0 ?
              <button disabled onClick={(() => {updateDiscardingResources("Grain", -1)})}>-</button> :
              <button onClick={(() => {updateDiscardingResources("Grain", -1)})}>-</button>}
            {discardingResources.Grain == playerResourceCards[clientPlayerNumber].Grain || totalCardsToDiscardLeft == 0 ?
              <button disabled onClick={(() => {updateDiscardingResources("Grain", 1)})}>Remove {discardingResources.Grain}</button> :
              <button onClick={(() => {updateDiscardingResources("Grain", 1)})}>Remove {discardingResources.Grain}</button>}
          </div>

          <div className="resourceHolder">
            <div>{oneOreIcon}<br />{playerResourceCards[clientPlayerNumber].Ore - discardingResources.Ore}</div>
            {discardingResources.Ore == 0 ?
              <button disabled onClick={(() => {updateDiscardingResources("Ore", -1)})}>-</button> :
              <button onClick={(() => {updateDiscardingResources("Ore", -1)})}>-</button>}
            {discardingResources.Ore == playerResourceCards[clientPlayerNumber].Ore || totalCardsToDiscardLeft == 0 ?
              <button disabled onClick={(() => {updateDiscardingResources("Ore", 1)})}>Remove {discardingResources.Ore}</button> :
              <button onClick={(() => {updateDiscardingResources("Ore", 1)})}>Remove {discardingResources.Ore}</button>}
          </div>
        </div>
    </div>
    )
  }
  else return (
    <>You are all good, brotha.</>
  )
}