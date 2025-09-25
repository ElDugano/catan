import { useContext, ReactComponent } from "react";
import { CurrentPlayerTurnContext } from "../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerInformationContext } from "../../state/playerInformation/PlayerInformationContext";
import { ScoreBoardContext } from "../../state/scoreBoard/ScoreBoardContext";
import { DevelopmentCardsContext } from "../../state/developmentCards/DevelopmentCardsContext";
import { PlayerResourceCardsContext } from "../../state/playerResourceCards/PlayerResourceCardsContext";
import { DiceContext } from "../../state/dice/DiceContext";

import "./hostTurnInterface.css"
import resourceCardsIcon from "../../assets/resourceCardsIcon.svg"
import developmentCardsIcon from "../../assets/developmentCardsIcon.svg"
import longestRoadIcon from "../../assets/longestRoadIcon.svg"
import largestArmyIcon from "../../assets/largestArmyIcon.svg"

import dice1 from "../../assets/dice/dice1.svg"
import dice2 from "../../assets/dice/dice2.svg"
import dice3 from "../../assets/dice/dice3.svg"
import dice4 from "../../assets/dice/dice4.svg"
import dice5 from "../../assets/dice/dice5.svg"
import dice6 from "../../assets/dice/dice6.svg"

const HostTurnInterface = () => {
  const { playerOrder, currentPlayerTurn, numberOfPlayers } = useContext(CurrentPlayerTurnContext);
  const { playerColor, playerName } = useContext(PlayerInformationContext);
  const { scoreBoard, playerLongestRoad } = useContext(ScoreBoardContext);
  const { getPlayerArmyStrength, totalPlayerDevelopmentCardHand } = useContext(DevelopmentCardsContext);
  const { getAllPlayersTotalResourceCards } = useContext(PlayerResourceCardsContext);
  const { dice, diceAdded } = useContext(DiceContext);

  let scoreCardWidth;
  if (numberOfPlayers == 2)
    scoreCardWidth="twoPlayerScoreCard";
  else if(numberOfPlayers == 3)
    scoreCardWidth="threePlayerScoreCard";
  else if(numberOfPlayers == 4)
    scoreCardWidth="fourPlayerScoreCard";

  let content = [];
  //const totalDevelopmentCards = totalPlayerDevelopmentCardHand;
  const totalResourceCards = getAllPlayersTotalResourceCards()
  playerOrder.forEach((player, index) => {
    content.push(
      <div key={crypto.randomUUID()} className={"playerScoreCard "+scoreCardWidth+" playerColor"+playerColor[player]}>
        <div className="playerInformationHolder">
          <div className="playerName">{playerName[player]}</div>
          <div className="playerData"><img src={resourceCardsIcon} />{totalResourceCards[player]}</div>
          <div className="playerData"><img src={largestArmyIcon} />{getPlayerArmyStrength(player)}</div>
          <div className="playerData"><img src={developmentCardsIcon} />{totalPlayerDevelopmentCardHand[player]}</div>
          <div className="playerData"><img src={longestRoadIcon} />{playerLongestRoad[player]}</div>
        </div>
        <div className="playerScore">
          {scoreBoard[player]}
        </div>
      </div>
    );
  })
  
  let diceA;
  switch (dice[0]) {
    case 1:
      diceA = <img className="dice" src={dice1} />
    break;
    case 2:
      diceA = <img className="dice" src={dice2} />
    break;
    case 3:
      diceA = <img className="dice" src={dice3} />
    break;
    case 4:
      diceA = <img className="dice" src={dice4} />
    break;
    case 5:
      diceA = <img className="dice" src={dice5} />
    break;
    case 6:
      diceA = <img className="dice" src={dice6} />
    break;
  }
  let diceB;
  switch (dice[1]) {
    case 1:
      diceB = <img className="dice" src={dice1} />
    break;
    case 2:
      diceB = <img className="dice" src={dice2} />
    break;
    case 3:
      diceB = <img className="dice" src={dice3} />
    break;
    case 4:
      diceB = <img className="dice" src={dice4} />
    break;
    case 5:
      diceB = <img className="dice" src={dice5} />
    break;
    case 6:
      diceB = <img className="dice" src={dice6} />
    break;
  }


  return (
    <>
      <div className="diceDisplay">
          <div>
          {diceAdded()}
          </div>
          {diceA} {diceB}
        </div>
      <div className="scoreCardsHolder">
        {content}
      </div>
    </>
  )
}

export default HostTurnInterface