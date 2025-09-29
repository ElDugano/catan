import { useContext, useState, useEffect } from "react";
import { DevelopmentCardsContext } from "../../../../state/developmentCards/DevelopmentCardsContext.js";
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";

import yearOfPlentyCard from "../../../../assets/developmentCards/yearOfPlentyCard.svg"


export default function NewestResourceCardsReceived() {
  const [ gainedResources, setGainedResources ] = useState({Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0});
  const { previouslyGainedResourcesClient, setPreviouslyGainedResourcesClient } = useContext(PlayerResourceCardsContext);
  const { clientPlayerNumber } = useContext(CurrentPlayerTurnContext);

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
  }, [clientPlayerNumber, gainedResources, previouslyGainedResourcesClient, setPreviouslyGainedResourcesClient])
  
  
  let displayMenu = false;

  for (let resourceName in gainedResources) {
      if (gainedResources[resourceName] != 0)
        displayMenu = true;
    }
  if (displayMenu)
    return(
  <div className={"fadeMainInterfaceRecieveCard"}>
    <div className={"recieveCardInterface"}>
      <h3>Resource Cards Recieved</h3>
        Lumber: {gainedResources.Lumber}<br />
        Brick: {gainedResources.Brick}<br />
        Wool: {gainedResources.Wool}<br />
        Grain: {gainedResources.Grain}<br />
        Ore: {gainedResources.Ore}<br />
      {/*<img src={yearOfPlentyCard} />*/}
      <button className={"acknowledgeButton"} onClick={() => setGainedResources({Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0})}>Thanks!</button>
    </div>
  </div>
  )
  else
    return(<></>);
}