import { useContext, useState } from "react"
import { TurnStateContext } from "../../../../state/turnState/TurnStateContext";

import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext.js";

import lumberIcon from "../../../../assets/lumberIcon.svg";
import brickIcon from "../../../../assets/brickIcon.svg";
import woolIcon from "../../../../assets/woolIcon.svg";
import grainIcon from "../../../../assets/grainIcon.svg";
import oreIcon from "../../../../assets/oreIcon.svg";

export default function YearOfPlentyMenu() {
  const { setTurnStateToIdle } = useContext(TurnStateContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  const [receivingResources, setReceivingResources] = useState({Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0});

    const oneLumberIcon = <img src={lumberIcon} />;
    const oneBrickIcon = <img src={brickIcon} />;
    const oneWoolIcon = <img src={woolIcon} />;
    const oneGrainIcon = <img src={grainIcon} />;
    const oneOreIcon = <img src={oreIcon} />;

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
    addToMessagePayloadToHost({header: "Playing Year Of Plenty"});
    addToMessagePayloadToHost({playYearOfPlenty:receivingResources});
    sendTheMessages();
    setTurnStateToIdle();
  }

  return (
    <>
    <h4>Select {2-totalReceivedCards()} Resources to Gain</h4>
    <div className="resourceButtonSwitcher">
      <div>
        {oneLumberIcon}<br />
        {receivingResources.Lumber > 0 ? <span className='positiveNumber outlineTextShadow'>+{receivingResources.Lumber}</span> : 0}
        {totalReceivedCards() == 2 ? <button disabled>+</button> : <button onClick={() => {updateReceivingResources("Lumber", 1)}}>+</button>}
        {receivingResources.Lumber == 0 ? <button disabled>+</button> : <button onClick={() => {updateReceivingResources("Lumber", -1)}}>-</button>}
      </div>
      <div>
        {oneBrickIcon}<br />
        {receivingResources.Brick > 0 ? <span className='positiveNumber outlineTextShadow'>+{receivingResources.Brick}</span> : 0}
        {totalReceivedCards() == 2 ? <button disabled>+</button> : <button onClick={() => {updateReceivingResources("Brick", 1)}}>+</button>}
        {receivingResources.Brick == 0 ? <button disabled>+</button> : <button onClick={() => {updateReceivingResources("Brick", -1)}}>-</button>}
      </div>
      <div>
        {oneWoolIcon}<br />
        {receivingResources.Wool > 0 ? <span className='positiveNumber outlineTextShadow'>+{receivingResources.Wool}</span> : 0}
        {totalReceivedCards() == 2 ? <button disabled>+</button> : <button onClick={() => {updateReceivingResources("Wool", 1)}}>+</button>}
        {receivingResources.Wool == 0 ? <button disabled>+</button> : <button onClick={() => {updateReceivingResources("Wool", -1)}}>-</button>}
      </div>
      <div>
        {oneGrainIcon}<br />
        {receivingResources.Grain > 0 ? <span className='positiveNumber outlineTextShadow'>+{receivingResources.Grain}</span> : 0}
        {totalReceivedCards() == 2 ? <button disabled>+</button> : <button onClick={() => {updateReceivingResources("Grain", 1)}}>+</button>}
        {receivingResources.Grain == 0 ? <button disabled>+</button> : <button onClick={() => {updateReceivingResources("Grain", -1)}}>-</button>}
      </div>
      <div>
        {oneOreIcon}<br />
        {receivingResources.Ore > 0 ? <span className='positiveNumber outlineTextShadow'>+{receivingResources.Ore}</span> : 0}
        {totalReceivedCards() == 2 ? <button disabled>+</button> : <button onClick={() => {updateReceivingResources("Ore", 1)}}>+</button>}
        {receivingResources.Ore == 0 ? <button disabled>+</button> : <button onClick={() => {updateReceivingResources("Ore", -1)}}>-</button>}
      </div>
    </div>
      <div>
        {totalReceivedCards() == 2 ? <button onClick={() => {addCardsToPlayer()}}>Recieve Selected Cards</button>: <button disabled>Select additonal cards</button>}
      </div>
    </>
  )
}