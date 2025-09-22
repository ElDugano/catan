import { useState } from "react";
import { DevelopmentCardsContext } from "./DevelopmentCardsContext.js";
import Shuffle from "../../helpers/Shuffle.jsx";

export const DevelopmentCards = ({ children }) => {
  const [developmentCardDeck, setDevelopmentCardDeck] = useState(() => {
    const cardsInDeck={
      "Knight": 14,
      "Road Building": 2,
      "Year of Plenty": 2,
      "Monopoly": 2,
      "Victory Point": 5
    }
    let cardDeck = [];
    for (let cardName in cardsInDeck){
      for (let card = cardsInDeck[cardName]; card >0; card--){
        cardDeck.push(cardName);
      }
    }
    Shuffle(cardDeck);
    return(cardDeck);
  });

  //Cards bought but can't be played yet.
  const [playerDevelopmentCardJustPurchased, setPlayerDevelopmentCardJustPurchased] = useState([
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0},
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0},
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0},
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0}
  ]);

  //Cards that can be played
  const [playerDevelopmentCardHand, setPlayerDevelopmentCardHand] = useState([
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0},
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0},
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0},
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0}
  ]);
  const [totalPlayerDevelopmentCardHand, setTotalPlayerDevelopmentCardHand] = useState([0,0,0,0]);;

  //Cards that have already been played.
  const [playerDevelopmentCardPlayed, setPlayerDevelopmentCardPlayed] = useState([
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0},
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0},
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0},
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0}
  ]);

  function returnAvailableDevelopmentCards() {
    return developmentCardDeck.length;
  }

  function givePlayerDevelopmentCardFromDeck(player) {
    console.log("The development card deck now looks like this:");
    console.log(developmentCardDeck);
    let newDevelopmentCardDeck = [...developmentCardDeck];
    let newCard = newDevelopmentCardDeck.pop();
    let newPlayerDevelopmentCardJustPurchased = [...playerDevelopmentCardJustPurchased];
    newPlayerDevelopmentCardJustPurchased[player][newCard]++;
    console.log(newPlayerDevelopmentCardJustPurchased);
    setPlayerDevelopmentCardJustPurchased(newPlayerDevelopmentCardJustPurchased);
    setDevelopmentCardDeck(newDevelopmentCardDeck);

    let newTotalPlayerDevelopmentCardHand = [...totalPlayerDevelopmentCardHand];
    newTotalPlayerDevelopmentCardHand[player] = totalPlayerDevelopmentCardHand[player]+1;
    setTotalPlayerDevelopmentCardHand(newTotalPlayerDevelopmentCardHand);

    return {playerDevelopmentCardJustPurchased:newPlayerDevelopmentCardJustPurchased,
            totalPlayerDevelopmentCardHand:newTotalPlayerDevelopmentCardHand};
      //Likely, this should only send back the player's cards from the array.
  }

    function makePlayerPurchasedDevelopmentAvailableToPlay(player) {
      let newDevelopmentCardDeck = [...playerDevelopmentCardHand];
      newDevelopmentCardDeck[player]["Knight"] += playerDevelopmentCardJustPurchased[player]["Knight"];
      newDevelopmentCardDeck[player]["Road Building"] += playerDevelopmentCardJustPurchased[player]["Road Building"];
      newDevelopmentCardDeck[player]["Year of Plenty"] += playerDevelopmentCardJustPurchased[player]["Year of Plenty"];
      newDevelopmentCardDeck[player]["Monopoly"] += playerDevelopmentCardJustPurchased[player]["Monopoly"];
      newDevelopmentCardDeck[player]["Victory Point"] += playerDevelopmentCardJustPurchased[player]["Victory Point"];
      let newPlayerDevelopmentCardJustPurchased = [...playerDevelopmentCardJustPurchased];
      newPlayerDevelopmentCardJustPurchased[player] = {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0};
      setPlayerDevelopmentCardHand(newDevelopmentCardDeck);
      setPlayerDevelopmentCardJustPurchased(newPlayerDevelopmentCardJustPurchased)



      return {playerDevelopmentCardHand:newDevelopmentCardDeck};
    }

  function PlayerDevelopmentCardsAvailableToPlay(player) {
    return playerDevelopmentCardHand(player);
  }

  function doesPlayerOwnsKnightDevelopmentCard(player) {return playerDevelopmentCardHand[player]["Knight"] > 0 ? true : false};
  function doesPlayerOwnsRoadBuildingDevelopmentCard(player) {return playerDevelopmentCardHand[player]["Road Building"] > 0 ? true : false};
  function doesPlayerOwnsYearOfPlentyDevelopmentCard(player) {return playerDevelopmentCardHand[player]["Year of Plenty"] > 0 ? true : false};
  function doesPlayerOwnsMonopolyDevelopmentCard(player) {return playerDevelopmentCardHand[player]["Monopoly"] > 0 ? true : false};

  function playKnightDevelopmentCard(player) {return playDevelopmentCard(player, "Knight");}
  function playRoadBuildingDevelopmentCard(player) {return playDevelopmentCard(player, "Road Building");}
  function playYearOfPlentyDevelopmentCard(player) {return playDevelopmentCard(player, "Year of Plenty");}
  function playMonopolyDevelopmentCard(player) {return playDevelopmentCard(player, "Monopoly");}

  function playDevelopmentCard(player, cardName) {
    let newPlayerDevelopmentCardHand = [...playerDevelopmentCardHand];
    let newPlayerDevelopmentCardPlayed = [...playerDevelopmentCardPlayed];
    newPlayerDevelopmentCardHand[player][cardName]--;
    newPlayerDevelopmentCardPlayed[player][cardName]++;
    setPlayerDevelopmentCardHand(newPlayerDevelopmentCardHand);
    setPlayerDevelopmentCardPlayed(newPlayerDevelopmentCardPlayed);

    let newTotalPlayerDevelopmentCardHand = [...totalPlayerDevelopmentCardHand];
    newTotalPlayerDevelopmentCardHand[player] = totalPlayerDevelopmentCardHand[player]-1;
    setTotalPlayerDevelopmentCardHand(newTotalPlayerDevelopmentCardHand);
    return {playerDevelopmentCardHand:newPlayerDevelopmentCardHand};
  }

  function getPlayerArmyStrength(player) {return playerDevelopmentCardPlayed[player].Knight;}

  //function getPlayerVictoryPointCards(player) {return playerDevelopmentCardHand[player]["Victory Point"]}
  function getJustPurchasedPlayerVictoryPointCards(player) {return playerDevelopmentCardJustPurchased[player]["Victory Point"]}


  return (
      <DevelopmentCardsContext.Provider value={{
        returnAvailableDevelopmentCards,
        givePlayerDevelopmentCardFromDeck,
        makePlayerPurchasedDevelopmentAvailableToPlay,
        PlayerDevelopmentCardsAvailableToPlay,
        doesPlayerOwnsKnightDevelopmentCard,
        doesPlayerOwnsRoadBuildingDevelopmentCard,
        doesPlayerOwnsYearOfPlentyDevelopmentCard,
        doesPlayerOwnsMonopolyDevelopmentCard,
        playKnightDevelopmentCard,
        playRoadBuildingDevelopmentCard,
        playYearOfPlentyDevelopmentCard,
        playMonopolyDevelopmentCard,
        getPlayerArmyStrength,
        getJustPurchasedPlayerVictoryPointCards,
        setPlayerDevelopmentCardJustPurchased,
        playerDevelopmentCardJustPurchased,
        setPlayerDevelopmentCardHand,
        playerDevelopmentCardHand,
        setPlayerDevelopmentCardPlayed,
        playerDevelopmentCardPlayed,
        setTotalPlayerDevelopmentCardHand,
        totalPlayerDevelopmentCardHand
      }}>
        {children}
      </DevelopmentCardsContext.Provider>
  )
}