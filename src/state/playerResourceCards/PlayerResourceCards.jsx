import { useState } from "react";
import { PlayerResourceCardsContext } from './PlayerResourceCardsContext.js';
import Shuffle from '../../helpers/Shuffle.jsx'

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

  function addCollectionOfResourcesToPlayer(player, resourceCollection) {
    let newPlayerResourceCards = [...playerResourceCards];
    newPlayerResourceCards[player].Wool   = playerResourceCards[player].Wool   + resourceCollection.Wool;
    newPlayerResourceCards[player].Lumber = playerResourceCards[player].Lumber + resourceCollection.Lumber;
    newPlayerResourceCards[player].Grain  = playerResourceCards[player].Grain  + resourceCollection.Grain;
    newPlayerResourceCards[player].Brick  = playerResourceCards[player].Brick  + resourceCollection.Brick;
    newPlayerResourceCards[player].Ore    = playerResourceCards[player].Ore    + resourceCollection.Ore;
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



  //---------- Build Menu Check ----------//
  function canPlayerAffordRoad(player) {
    return (playerResourceCards[player].Brick >= 1 &&
            playerResourceCards[player].Lumber >= 1) ? true : false}
  
  function canPlayerAffordSettlement(player) {
    return (playerResourceCards[player].Brick >= 1 &&
            playerResourceCards[player].Lumber >= 1 &&
            playerResourceCards[player].Wool >= 1 &&
            playerResourceCards[player].Grain >= 1) ? true : false}

  function canPlayerAffordCity(player) {
    return (playerResourceCards[player].Grain >= 2 &&
            playerResourceCards[player].Ore >= 3) ? true : false}

  function canPlayerAffordDevelopmentCard(player) {
    return (playerResourceCards[player].Grain >= 1 &&
            playerResourceCards[player].Wool &&
            playerResourceCards[player].Ore >= 1 >= 1) ? true : false}

            //********** THESE SHOULD BE DOUBLE CHECKED BEFORE REMOVING, JUST TO BE SAFE. */
  function removePlayerResourcesToBuildRoad(player) {
    let newPlayerResourceCards = [...playerResourceCards];
    newPlayerResourceCards[player].Brick--;
    newPlayerResourceCards[player].Lumber--;
    setPlayerResourceCards(newPlayerResourceCards);
  }

  function removePlayerResourcesToBuildSettlement(player) {
    let newPlayerResourceCards = [...playerResourceCards];
    newPlayerResourceCards[player].Brick--;
    newPlayerResourceCards[player].Lumber--;
    newPlayerResourceCards[player].Wool--;
    newPlayerResourceCards[player].Grain--;
    setPlayerResourceCards(newPlayerResourceCards);
  }

  function removePlayerResourcesToBuildCity(player) {
    let newPlayerResourceCards = [...playerResourceCards];
    newPlayerResourceCards[player].Grain-=2;
    newPlayerResourceCards[player].Ore-=3;
    setPlayerResourceCards(newPlayerResourceCards);
  }

  function removePlayerResourcesToBuildDevelopmentCard(player) {
    let newPlayerResourceCards = [...playerResourceCards];
    newPlayerResourceCards[player].Grain--;
    newPlayerResourceCards[player].Ore--;
    newPlayerResourceCards[player].Wool--;
    setPlayerResourceCards(newPlayerResourceCards);
  }

  return (
      <PlayerResourceCardsContext.Provider value={{
        playerResourceCards,
        addResourcesFromDiceRollToPlayerResourceCards,
        getAPlayersResourceCards,
        getAllPlayersTotalResourceCards,
        removeCollectionOfResourcesFromPlayer,
        addCollectionOfResourcesToPlayer,
        stealRandomCardFromPlayer,
        previouslyGainedResources,
        plunderedResourcePlayers,
        setPlunderedResourcePlayers,
        //---------- Build Menu Check ----------//
        canPlayerAffordRoad,
        canPlayerAffordSettlement,
        canPlayerAffordCity,
        canPlayerAffordDevelopmentCard,
        //---------- Building Item Remove Resources ----------//
        removePlayerResourcesToBuildRoad,
        removePlayerResourcesToBuildSettlement,
        removePlayerResourcesToBuildCity,
        removePlayerResourcesToBuildDevelopmentCard
      }}>
        {children}
      </PlayerResourceCardsContext.Provider>
  )
}