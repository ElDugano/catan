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
  const [previouslyGainedResources, setPreviouslyGainedResources] = useState([{}, {}, {}, {}]);

  

  function addResourcesFromDiceRollToPlayerResourceCards(playerNewResources) {
    let newPlayerResourceCards = [...playerResourceCards];
    playerNewResources.forEach((playerResourceArray, player) => {
      for (let resourceName in playerResourceArray) {
        newPlayerResourceCards[player][resourceName] += playerNewResources[player][resourceName];
      }
    });
    setPlayerResourceCards(newPlayerResourceCards);
    setPreviouslyGainedResources(playerNewResources);
    return {playerResourceCards: newPlayerResourceCards,previouslyGainedResources:playerNewResources};
  }

  function getAPlayersResourceCards(player) {
    return playerResourceCards[player];
  }

  function getPlayerTotalResourceCards(player) {
    let playerTotalCards = 0
    for (let resourceName in playerResourceCards[player]) {
      playerTotalCards += playerResourceCards[player][resourceName];
    }
    return playerTotalCards;
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
    return {playerResourceCards:newPlayerResourceCards};
  }

  //---------- Thief Related ----------//
  const [discardHalfResourcesPlayers, setDiscardHalfResourcesPlayers] = useState(new Array(4));
  const [discardHalfResourcesCardAmount, setDiscardHalfResourcesCardAmount] = useState(new Array(4));

  const findAndSetDiscardHalfResourcesPlayers = () => {
    const AllPlayersTotalCards = getAllPlayersTotalResourceCards();
    let newDiscardHalfResourcesPlayers = [false, false, false, false];
    AllPlayersTotalCards.forEach((numberOfCards, playerNumber) => {
      if (numberOfCards >= 8) {
        console.log("Player "+playerNumber+" has too many cards!");
        newDiscardHalfResourcesPlayers[playerNumber]=true;
      }
    })
    setDiscardHalfResourcesPlayers(newDiscardHalfResourcesPlayers);
    return {discardHalfResourcesPlayers:newDiscardHalfResourcesPlayers};
  }
  const updateDiscardHalfResourcesPlayers = (player) => {
    let newDiscardHalfResourcesPlayers = [...discardHalfResourcesPlayers];
    newDiscardHalfResourcesPlayers[player] = false;
    setDiscardHalfResourcesPlayers(newDiscardHalfResourcesPlayers);
    return {discardHalfResourcesPlayers:newDiscardHalfResourcesPlayers};
  }
  const findAndSetDiscardHalfResourcesCardAmount = () => {
    const AllPlayersTotalCards = getAllPlayersTotalResourceCards();
    let newDiscardHalfResourcesCardAmount = new Array(4);
    AllPlayersTotalCards.forEach((numberOfCards, playerNumber) => {
      newDiscardHalfResourcesCardAmount[playerNumber] = Math.floor(numberOfCards/2)
    });
    setDiscardHalfResourcesCardAmount(newDiscardHalfResourcesCardAmount);
    return {discardHalfResourcesCardAmount:newDiscardHalfResourcesCardAmount};
  }

  const [robbingTargetPlayers, setRobbingTargetPlayers] = useState(new Array(4));
  const setAndReturnRobbingTargetPlayers = (targetPlayers) => {
    setRobbingTargetPlayers(targetPlayers);
    return {robbingTargetPlayers:targetPlayers};
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
    return {playerResourceCards:newPlayerResourceCards};
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
    return {playerResourceCards:newPlayerResourceCards};
  }

  function removePlayerResourcesToBuildSettlement(player) {
    let newPlayerResourceCards = [...playerResourceCards];
    newPlayerResourceCards[player].Brick--;
    newPlayerResourceCards[player].Lumber--;
    newPlayerResourceCards[player].Wool--;
    newPlayerResourceCards[player].Grain--;
    setPlayerResourceCards(newPlayerResourceCards);
    return {playerResourceCards:newPlayerResourceCards};
  }

  function removePlayerResourcesToBuildCity(player) {
    let newPlayerResourceCards = [...playerResourceCards];
    newPlayerResourceCards[player].Grain-=2;
    newPlayerResourceCards[player].Ore-=3;
    setPlayerResourceCards(newPlayerResourceCards);
    return {playerResourceCards:newPlayerResourceCards};
  }

  function removePlayerResourcesToBuildDevelopmentCard(player) {
    let newPlayerResourceCards = [...playerResourceCards];
    newPlayerResourceCards[player].Grain--;
    newPlayerResourceCards[player].Ore--;
    newPlayerResourceCards[player].Wool--;
    setPlayerResourceCards(newPlayerResourceCards);
    return {playerResourceCards:newPlayerResourceCards};
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
        setPlayerResourceCards,
        addResourcesFromDiceRollToPlayerResourceCards,

        getAPlayersResourceCards,
        getPlayerTotalResourceCards,
        getAllPlayersTotalResourceCards,

        removeCollectionOfResourcesFromPlayer,
        addCollectionOfResourcesToPlayer,
        tradeResources,
        setPreviouslyGainedResources,
        previouslyGainedResources,
        //---------- Thief----------//
        discardHalfResourcesPlayers,
        setDiscardHalfResourcesPlayers,
        findAndSetDiscardHalfResourcesPlayers,
        updateDiscardHalfResourcesPlayers,

        discardHalfResourcesCardAmount,
        setDiscardHalfResourcesCardAmount,
        findAndSetDiscardHalfResourcesCardAmount,

        robbingTargetPlayers,//This is used for thief.
        setRobbingTargetPlayers,
        setAndReturnRobbingTargetPlayers,
        stealRandomCardFromPlayer,
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