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

  function addResourcesFromDiceRollToPlayerResourceCards(playerNewResources) {
    let newPlayerResourceCards = [...playerResourceCards];
    playerNewResources.forEach((item, index) => {
      for (let resourceName in item) {
        newPlayerResourceCards[index][resourceName] += playerNewResources[index][resourceName];
      }
    });
    setPlayerResourceCards(newPlayerResourceCards);
    setPreviouslyGainedResources(playerNewResources);
    console.log("We just got these resources:");
    console.log(playerNewResources);
    console.log("We now have these resources in total:");
    console.log(newPlayerResourceCards);
  }

  function getPlayerResourceCards(player) {
    return playerResourceCards[player];
  }

  return (
      <PlayerResourceCardsContext.Provider value={{
        playerResourceCards,
        addResourcesFromDiceRollToPlayerResourceCards,
        getPlayerResourceCards,
        previouslyGainedResources
      }}>
        {children}
      </PlayerResourceCardsContext.Provider>
  )
}