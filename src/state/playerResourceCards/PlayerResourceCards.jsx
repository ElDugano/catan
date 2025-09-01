import { useState } from "react";
import { PlayerResourceCardsContext } from './PlayerResourceCardsContext.js';
import Shuffle from '../../helpers/shuffle.jsx'

export const PlayerResourceCards = ({ children }) => {
  const [playerResourceCards, setPlayerResourceCards] = useState([
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0},
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0},
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0},
    {Wool:0, Lumber:0, Grain:0, Brick:0, Ore:0}
  ]);
  const [previouslyGainedResources, setPreviouslyGainedResources] = useState(new Array(4));
  const [plunderedResourcePlayers, setPlunderedResourcePlayers] = useState(new Array(4));

  function addResourcesFromDiceRollToPlayerResourceCards(playerNewResources) {
    let newPlayerResourceCards = [...playerResourceCards];
    playerNewResources.forEach((item, index) => {
      for (let resourceName in item) {
        newPlayerResourceCards[index][resourceName] += playerNewResources[index][resourceName];
      }
    });
    setPlayerResourceCards(newPlayerResourceCards);
    setPreviouslyGainedResources(playerNewResources);
  }

  function getAPlayersResourceCards(player) {
    return playerResourceCards[player];
  }

  function getAllPlayersTotalResourceCards() {
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
    newPlayerResourceCards[player].Wool   = playerResourceCards[player].Wool   - resourceCollection.Wool;
    newPlayerResourceCards[player].Lumber = playerResourceCards[player].Lumber - resourceCollection.Lumber;
    newPlayerResourceCards[player].Grain  = playerResourceCards[player].Grain  - resourceCollection.Grain;
    newPlayerResourceCards[player].Brick  = playerResourceCards[player].Brick  - resourceCollection.Brick;
    newPlayerResourceCards[player].Ore    = playerResourceCards[player].Ore    - resourceCollection.Ore;
    setPlayerResourceCards(newPlayerResourceCards);
  }

  function stealRandomCardFromPlayer(robbingPlayer, victimPlayer) {
    let victimPlayerHand = [];
    Object.keys(playerResourceCards[victimPlayer]).forEach(resourceName => {
      for (let card = 0; card < playerResourceCards[victimPlayer][resourceName]; card++) {
        victimPlayerHand.push(resourceName);
      }
    })
    Shuffle(victimPlayerHand);
    let stolenResourceCardType = victimPlayerHand.pop();
    let newPlayerResourceCards = [...playerResourceCards];
    newPlayerResourceCards[robbingPlayer][stolenResourceCardType] +=1;
    newPlayerResourceCards[victimPlayer][stolenResourceCardType] -=1;
    setPlayerResourceCards(newPlayerResourceCards);
  }

  return (
      <PlayerResourceCardsContext.Provider value={{
        playerResourceCards,
        addResourcesFromDiceRollToPlayerResourceCards,
        getAPlayersResourceCards,
        getAllPlayersTotalResourceCards,
        removeCollectionOfResourcesFromPlayer,
        stealRandomCardFromPlayer,
        previouslyGainedResources,
        plunderedResourcePlayers,
        setPlunderedResourcePlayers
      }}>
        {children}
      </PlayerResourceCardsContext.Provider>
  )
}