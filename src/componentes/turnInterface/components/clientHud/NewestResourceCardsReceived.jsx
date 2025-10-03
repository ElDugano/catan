import { useContext, useState, useEffect } from "react";
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { PlayerInformationContext } from "../../../../state/playerInformation/PlayerInformationContext.js";

import brickCard from "../../../../assets/resourceCards/brickResourceCard.svg"
import lumberCard from "../../../../assets/resourceCards/lumberResourceCard.svg"
import woolCard from "../../../../assets/resourceCards/woolResourceCard.svg"
import grainCard from "../../../../assets/resourceCards/grainResourceCard.svg"
import oreCard from "../../../../assets/resourceCards/oreResourceCard.svg"


export default function NewestResourceCardsReceived() {
  const { previouslyGainedResourcesClient, setPreviouslyGainedResourcesClient } = useContext(PlayerResourceCardsContext);
  const { clientPlayerNumber } = useContext(CurrentPlayerTurnContext);
  const { playerColor } = useContext(PlayerInformationContext);

  const [ gainedResources, setGainedResources ] = useState({Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0});
  const [ robbedResources, setRobbedResources ] = useState({Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0});
  const [ robbedItem, setRobbeditem ] = useState(false)

  useEffect(() => {
    let newGainedResources = {...gainedResources};
    let newRobbedResources = {...robbedResources};
    let needToUpdate = false;
    for (let resourceName in previouslyGainedResourcesClient) {
      if (previouslyGainedResourcesClient[resourceName] > 0) {
        newGainedResources[resourceName] += previouslyGainedResourcesClient[resourceName];
        needToUpdate = true;
      }
      if (previouslyGainedResourcesClient[resourceName] < 0) {
        newRobbedResources[resourceName] += previouslyGainedResourcesClient[resourceName];
        needToUpdate = true;
        if(robbedItem == false)
          setRobbeditem(true);
      }
    }
    if (needToUpdate) {
      setGainedResources(newGainedResources);
      setRobbedResources(newRobbedResources);
      setPreviouslyGainedResourcesClient({Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0});
    }
  }, [clientPlayerNumber, gainedResources, previouslyGainedResourcesClient, robbedItem, robbedResources, setPreviouslyGainedResourcesClient])

  
  
  if (robbedItem == true) {
    let displayMenu = 0;
    for (let resourceName in robbedResources) {
      if (robbedResources[resourceName] != 0)
        displayMenu++;
    }
    if (displayMenu != 0) {
      let cardSizeClass = "fullSizeCard";
      if (displayMenu == 2 || displayMenu == 4)
        cardSizeClass = "halfSizeCard";
      if (displayMenu == 3 || displayMenu == 5)
        cardSizeClass = "thirdSizeCard";

      const acknowledgeRobbery = () => {
        setRobbedResources({Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0});
        setRobbeditem(false);
      }

      return(
        <div className={"fadeMainInterfaceRecieveCard"}>
          <div className={"recieveCardInterface"}>
            <h3>Resource Cards<br />Robbed From You</h3>
            <div className="resourceCardHolder">
              {robbedResources.Brick != 0 && <div className={"resourceCard "+cardSizeClass}><img src={brickCard} /><div className="negativeNumber">{robbedResources.Brick}</div></div>}
              {robbedResources.Lumber != 0 && <div className={"resourceCard "+cardSizeClass}><img src={lumberCard} /><div className="negativeNumber">{robbedResources.Lumber}</div></div>}
              {robbedResources.Wool != 0 && <div className={"resourceCard "+cardSizeClass}><img src={woolCard} /><div className="negativeNumber">{robbedResources.Wool}</div></div>}
              {robbedResources.Grain != 0 && <div className={"resourceCard "+cardSizeClass}><img src={grainCard} /><div className="negativeNumber">{robbedResources.Grain}</div></div>}
              {robbedResources.Ore != 0 && <div className={"resourceCard "+cardSizeClass}><img src={oreCard} /><div className="negativeNumber">{robbedResources.Ore}</div></div>}
            </div>
            <button className={"acknowledgeButton playerButton"+playerColor[clientPlayerNumber]} onClick={acknowledgeRobbery}>Unfortunate</button>
          </div>
        </div>
      )
    }
  }
  let displayMenu = 0;
  for (let resourceName in gainedResources) {
    if (gainedResources[resourceName] != 0)
      displayMenu++;
  }
  if (displayMenu != 0) {
    let cardSizeClass = "fullSizeCard";
    if (displayMenu == 2 || displayMenu == 4)
      cardSizeClass = "halfSizeCard";
    if (displayMenu == 3 || displayMenu == 5)
      cardSizeClass = "thirdSizeCard";
    return(
      <div className={"fadeMainInterfaceRecieveCard"}>
        <div className={"recieveCardInterface"}>
          <h3>Resource Cards<br />You Recieved</h3>
          <div className="resourceCardHolder">
            {gainedResources.Brick != 0 && <div className={"resourceCard "+cardSizeClass}><img src={brickCard} /><div className="positiveNumber">+{gainedResources.Brick}</div></div>}
            {gainedResources.Lumber != 0 && <div className={"resourceCard "+cardSizeClass}><img src={lumberCard} /><div className="positiveNumber">+{gainedResources.Lumber}</div></div>}
            {gainedResources.Wool != 0 && <div className={"resourceCard "+cardSizeClass}><img src={woolCard} /><div className="positiveNumber">+{gainedResources.Wool}</div></div>}
            {gainedResources.Grain != 0 && <div className={"resourceCard "+cardSizeClass}><img src={grainCard} /><div className="positiveNumber">+{gainedResources.Grain}</div></div>}
            {gainedResources.Ore != 0 && <div className={"resourceCard "+cardSizeClass}><img src={oreCard} /><div className="positiveNumber">+{gainedResources.Ore}</div></div>}
          </div>
          <button className={"acknowledgeButton playerButton"+playerColor[clientPlayerNumber]} onClick={() => setGainedResources({Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0})}>Thanks!</button>
        </div>
      </div>
    )
  }
  else
    return(<></>);
}