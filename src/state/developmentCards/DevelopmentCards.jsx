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
      for (let card = cardsInDeck[cardName]; card >=0; card--){
        cardDeck.push(cardName);
      }
    }
    Shuffle(cardDeck);
    return(cardDeck);
  });

  const [playerDevelopmentCardHand, setPlayerDevelopmentCardHand] = useState([
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0},
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0},
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0},
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0}
  ]);

  const [playerDevelopmentCardPlayed, setPlayerDevelopmentCardPlayed] = useState([
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0},
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0},
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0},
    {"Knight":0, "Road Building":0, "Year of Plenty":0, "Monopoly":0, "Victory Point":0}
  ]);

  function givePlayerDevelopmentCardFromDeck(player) {
    let newDevelopmentCardDeck = [...developmentCardDeck];
    let newCard = newDevelopmentCardDeck.pop();
    let newPlayerDevelopmentCardHand = [...playerDevelopmentCardHand];
    newPlayerDevelopmentCardHand[player][newCard]++;
    console.log(newPlayerDevelopmentCardHand);
    setPlayerDevelopmentCardHand(newPlayerDevelopmentCardHand);;
    setDevelopmentCardDeck(newDevelopmentCardDeck);
  }

  function PlayerDevelopmentCardsAvailableToPlay(player) {
    return playerDevelopmentCardHand(player);
  }

  function playKnightDevelopmentCard(player) {playDevelopmentCard(player, "Knight");}
  function playRoadBuildingDevelopmentCard(player) {playDevelopmentCard(player, "Road Building");}
  function playYearOfPlentyDevelopmentCard(player) {playDevelopmentCard(player, "Year of Plenty");}
  function playMonopolyDevelopmentCard(player) {playDevelopmentCard(player, "Monopoly");}

  function doesPlayerOwnsKnightDevelopmentCard(player) {return playerDevelopmentCardHand[player]["Knight"] > 0 ? true : false};
  function doesPlayerOwnsRoadBuildingDevelopmentCard(player) {return playerDevelopmentCardHand[player]["Road Building"] > 0 ? true : false};
  function doesPlayerOwnsYearOfPlentyDevelopmentCard(player) {return playerDevelopmentCardHand[player]["Year of Plenty"] > 0 ? true : false};
  function doesPlayerOwnsMonopolyDevelopmentCard(player) {return playerDevelopmentCardHand[player]["Monopoly"] > 0 ? true : false};


  function playDevelopmentCard(player, cardName) {
    let newPlayerDevelopmentCardHand = [...playerDevelopmentCardHand];
    let newPlayerDevelopmentCardPlayed = [...playerDevelopmentCardPlayed];
      newPlayerDevelopmentCardHand[player][cardName]--;
      newPlayerDevelopmentCardPlayed[player][cardName]++;
      setPlayerDevelopmentCardHand(newPlayerDevelopmentCardHand);
      setPlayerDevelopmentCardPlayed(newPlayerDevelopmentCardPlayed);
  }


  return (
      <DevelopmentCardsContext.Provider value={{
        givePlayerDevelopmentCardFromDeck,
        PlayerDevelopmentCardsAvailableToPlay,
        doesPlayerOwnsKnightDevelopmentCard,
        doesPlayerOwnsRoadBuildingDevelopmentCard,
        doesPlayerOwnsYearOfPlentyDevelopmentCard,
        doesPlayerOwnsMonopolyDevelopmentCard,
        playKnightDevelopmentCard,
        playRoadBuildingDevelopmentCard,
        playYearOfPlentyDevelopmentCard,
        playMonopolyDevelopmentCard
      }}>
        {children}
      </DevelopmentCardsContext.Provider>
  )
}