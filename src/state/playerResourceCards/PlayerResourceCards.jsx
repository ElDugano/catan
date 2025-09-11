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
    playerNewResources.forEach((playerResourceArray, player) => {
      for (let resourceName in playerResourceArray) {
        newPlayerResourceCards[player][resourceName] += playerNewResources[player][resourceName];
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
    return {playerResourceCards:newPlayerResourceCards};
  }

  function addCollectionOfResourcesToPlayer(player, resourceCollection) {
    let newPlayerResourceCards = [...playerResourceCards];
    newPlayerResourceCards[player].Wool   = playerResourceCards[player].Wool   + resourceCollection.Wool;
    newPlayerResourceCards[player].Lumber = playerResourceCards[player].Lumber + resourceCollection.Lumber;
    newPlayerResourceCards[player].Grain  = playerResourceCards[player].Grain  + resourceCollection.Grain;
    newPlayerResourceCards[player].Brick  = playerResourceCards[player].Brick  + resourceCollection.Brick;
    newPlayerResourceCards[player].Ore    = playerResourceCards[player].Ore    + resourceCollection.Ore;
    setPlayerResourceCards(newPlayerResourceCards);
    return {playerResourceCards:newPlayerResourceCards};
  }

  function tradeResources(tradingPlayerA, playerATradedResources, tradingPlayerB, playerBTradedResources) {
    let newPlayerResourceCards = [...playerResourceCards];
    for( let resource in playerATradedResources) {
      newPlayerResourceCards[tradingPlayerA][resource] = newPlayerResourceCards[tradingPlayerA][resource] - playerATradedResources[resource];
      if (tradingPlayerB != null)
        newPlayerResourceCards[tradingPlayerB][resource] = newPlayerResourceCards[tradingPlayerB][resource] + playerATradedResources[resource];
    }
    for( let resource in playerBTradedResources) {
      newPlayerResourceCards[tradingPlayerA][resource] = newPlayerResourceCards[tradingPlayerA][resource] + playerBTradedResources[resource];
      if (tradingPlayerB != null)
        newPlayerResourceCards[tradingPlayerB][resource] = newPlayerResourceCards[tradingPlayerB][resource] - playerBTradedResources[resource];
    }
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

            //********** These should probably double check to see if they have available resources... */
            //********** but the current game logic checks this before the player gets here. */
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

  function monopolizeWool(player){monopolizeResource(player, "Wool")}
  function monopolizeLumber(player){monopolizeResource(player, "Lumber")}
  function monopolizeGrain(player){monopolizeResource(player, "Grain")}
  function monopolizeBrick(player){monopolizeResource(player, "Brick")}
  function monopolizeOre(player){monopolizeResource(player, "Ore")}

  //We should maybe make a state of how many cards each player lost to monopoly.
  function monopolizeResource(monopolizingPlayer, resourceName) {
    let newPlayerResourceCards = [...playerResourceCards];
    let monopolizedResources = [0,0,0,0];
    newPlayerResourceCards.forEach((playerResourceArray, victimPlayer) => {
      if (victimPlayer != monopolizingPlayer) {
        monopolizedResources[monopolizingPlayer] += playerResourceArray[resourceName];
        monopolizedResources[victimPlayer] -= playerResourceArray[resourceName];
        newPlayerResourceCards[victimPlayer][resourceName] = 0;
      }
    });
    newPlayerResourceCards[monopolizingPlayer][resourceName] += monopolizedResources[monopolizingPlayer];
    setPlayerResourceCards(newPlayerResourceCards);
    //set //monopolizedResources[monopolizingPlayer] //This can be used if we want to see what the outcome of the monopoly was on the screen.
    //Perhaps we could use previouslyGainedResources or plunderedResourcePlayers for this.
  }

  return (
      <PlayerResourceCardsContext.Provider value={{
        playerResourceCards,
        addResourcesFromDiceRollToPlayerResourceCards,
        getAPlayersResourceCards,
        getAllPlayersTotalResourceCards,
        removeCollectionOfResourcesFromPlayer,
        addCollectionOfResourcesToPlayer,
        tradeResources,
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
        removePlayerResourcesToBuildDevelopmentCard,
        //---------- Monopoly Card ----------//
        monopolizeWool,
        monopolizeLumber,
        monopolizeGrain,
        monopolizeBrick,
        monopolizeOre
      }}>
        {children}
      </PlayerResourceCardsContext.Provider>
  )
}