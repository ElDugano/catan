import { useState } from "react";
import { PlayerResourceCardsContext } from './PlayerResourceCardsContext.js';

export const PlayerResourceCards = ({ children }) => {
  const [playerResourceCards, setPlayerResourceCards] = useState([
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0},
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0},
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0},
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0}
  ]);
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

  function getAPlayersResourceCards(player) {
    return playerResourceCards[player];
  }

  function getAllPlayersTotalResrouceCards() {
    let allPlayersTotalCards = []
    playerResourceCards.forEach((playerResourceObject, player) => {
      let playerTotalCards = 0
      for (let resourceName in playerResourceObject) {
        playerTotalCards += playerResourceCards[player][resourceName];
      }
      allPlayersTotalCards.push(playerTotalCards);
    });
    return allPlayersTotalCards;
  }

  function removeCollectionOfResourcesFromPlayer(player, resourceCollection) {
    let newPlayerResourceCards = [...playerResourceCards];
    newPlayerResourceCards[player].Wool = playerResourceCards[player].Wool - resourceCollection.Wool;
    newPlayerResourceCards[player].Lumber = playerResourceCards[player].Lumber - resourceCollection.Lumber;
    newPlayerResourceCards[player].Grain = playerResourceCards[player].Grain - resourceCollection.Grain;
    newPlayerResourceCards[player].Brick = playerResourceCards[player].Brick - resourceCollection.Brick;
    newPlayerResourceCards[player].Ore = playerResourceCards[player].Ore - resourceCollection.Ore;
    console.log(newPlayerResourceCards[player]);
    setPlayerResourceCards(newPlayerResourceCards);
  }

  return (
      <PlayerResourceCardsContext.Provider value={{
        playerResourceCards,
        addResourcesFromDiceRollToPlayerResourceCards,
        getAPlayersResourceCards,
        getAllPlayersTotalResrouceCards,
        removeCollectionOfResourcesFromPlayer,
        previouslyGainedResources
      }}>
        {children}
      </PlayerResourceCardsContext.Provider>
  )
}