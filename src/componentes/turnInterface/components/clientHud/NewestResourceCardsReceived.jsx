import { useContext, useState, useEffect } from "react";
import { DevelopmentCardsContext } from "../../../../state/developmentCards/DevelopmentCardsContext.js";
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";

import brickCard from "../../../../assets/resourceCards/brickResourceCard.svg"
import lumberCard from "../../../../assets/resourceCards/lumberResourceCard.svg"
import woolCard from "../../../../assets/resourceCards/woolResourceCard.svg"
import grainCard from "../../../../assets/resourceCards/grainResourceCard.svg"
import oreCard from "../../../../assets/resourceCards/oreResourceCard.svg"


export default function NewestResourceCardsReceived() {
  const { previouslyGainedResourcesClient, setPreviouslyGainedResourcesClient } = useContext(PlayerResourceCardsContext);
  const { clientPlayerNumber } = useContext(CurrentPlayerTurnContext);

  const [ gainedResources, setGainedResources ] = useState({Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0});
  const [ robbedItem, setRobbeditem ] = useState(null)

  useEffect(() => {
    let newGainedResources = {...gainedResources};
    let needToUpdate = false;
    for (let resourceName in previouslyGainedResourcesClient) {
      newGainedResources[resourceName] += previouslyGainedResourcesClient[resourceName];
      if (previouslyGainedResourcesClient[resourceName] != 0)
        needToUpdate = true;
    }
    if (needToUpdate) {
      setGainedResources(newGainedResources);
      setPreviouslyGainedResourcesClient({Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0});
    }
    if (robbedItem == null) {
      for (let resourceName in newGainedResources) {
        if (newGainedResources[resourceName] < 0)
          setRobbeditem(resourceName);
      }
    }

  }, [clientPlayerNumber, gainedResources, previouslyGainedResourcesClient, robbedItem, setPreviouslyGainedResourcesClient])

  
  let displayMenu = 0;

  for (let resourceName in gainedResources) {
    if (gainedResources[resourceName] != 0)
      displayMenu++;
  }

  let cardSizeClass = "fullSizeCard";
  if (displayMenu == 2 || displayMenu == 4)
    cardSizeClass = "halfSizeCard";
  if (displayMenu == 3 || displayMenu == 5)
    cardSizeClass = "thirdSizeCard";

  if (robbedItem != null) {
    let robbedCardImage = null;
    switch (robbedItem) {
      case "Lumber":
        robbedCardImage = <img src={lumberCard} />
      break;
      case "Brick":
        robbedCardImage = <img src={brickCard} />
      break;
      case "Wool":
        robbedCardImage = <img src={woolCard} />
      break;
      case "Grain":
        robbedCardImage = <img src={grainCard} />
      break;
      case "Ore":
        robbedCardImage = <img src={oreCard} />
      break;
    }
    const acknowledgeRobbery = () => {
      let newGainedResources = {...gainedResources};
      newGainedResources[robbedItem] += 1;
      let newRobbedItem = null;
      for (let resourceName in newGainedResources) {
        if (newGainedResources[resourceName] < 0)
          newRobbedItem = resourceName;
      }
      setGainedResources(newGainedResources);
      setRobbeditem(newRobbedItem);
    }
    return (
      <div className={"fadeMainInterfaceRecieveCard"}>
        <div className={"recieveCardInterface"}>
          <h3>Shit man, you got robbed, that sucks</h3>
          <div className="resourceCardHolder">
            <div className={"resourceCard fullSizeCard"}>
              {robbedCardImage}
              <div className="negativeNumber">
                -1
              </div>
            </div>
          </div>
          <button className={"acknowledgeButton"} onClick={acknowledgeRobbery}>Dang Dawg!</button>
        </div>
      </div>
    )
  }
  else if (displayMenu != 0)
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
            {/*<img src={brickCard} />*/}
          </div>
          <button className={"acknowledgeButton"} onClick={() => setGainedResources({Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0})}>Thanks!</button>
        </div>
      </div>
    )
  else
    return(<></>);
}