import { useState } from "react";
import { PlayerResourceCardsContext } from './PlayerResourceCardsContext.js';

export const PlayerResourceCards = ({ children }) => {
  const emptyPlayerResourceCards = [
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0},
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0},
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0},
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0}
  ]
  const [playerResourceCards, setPlayerResourceCards] = useState(emptyPlayerResourceCards);
  const [previouslyGainedResources, setPreviouslyGainedResources] = useState(new Array(4));


  function addResourcesOnDiceRoll(playerNewResources) {
    let newPlayerResourceCards = [...playerResourceCards];
    playerNewResources.forEach((item, index) => {
      for (let resourceName in item) {
        newPlayerResourceCards[index][resourceName] += playerNewResources[index][resourceName];
      }
    });
    setPlayerResourceCards(newPlayerResourceCards);
    setPreviouslyGainedResources(playerNewResources);
  }


  return (
      <PlayerResourceCardsContext.Provider value={{
        playerResourceCards,
        addResourcesOnDiceRoll,
        previouslyGainedResources
      }}>
        {children}
      </PlayerResourceCardsContext.Provider>
  )
}