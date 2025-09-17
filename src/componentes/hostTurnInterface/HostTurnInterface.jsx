import { useContext, ReactComponent } from "react";
import { CurrentPlayerTurnContext } from "../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerColorContext } from "../../state/playerColor/PlayerColorContext";
import { ScoreBoardContext } from "../../state/scoreBoard/ScoreBoardContext";
import { DevelopmentCardsContext } from "../../state/developmentCards/DevelopmentCardsContext";
import { PlayerResourceCardsContext } from "../../state/playerResourceCards/PlayerResourceCardsContext";

import "./hostTurnInterface.css"
import resourceCardsIcon from "../../assets/resourceCardsIcon.svg"
import developmentCardsIcon from "../../assets/developmentCardsIcon.svg"
import longestRoadIcon from "../../assets/longestRoadIcon.svg"
import largestArmyIcon from "../../assets/largestArmyIcon.svg"

const HostTurnInterface = () => {
  const { playerOrder, currentPlayerTurn, numberOfPlayers } = useContext(CurrentPlayerTurnContext);
  const { playerColor } = useContext(PlayerColorContext);
  const { scoreBoard, playerLongestRoad } = useContext(ScoreBoardContext);
  const { getPlayerArmyStrength, totalPlayerDevelopmentCardHand } = useContext(DevelopmentCardsContext);
  const { getAllPlayersTotalResourceCards } = useContext(PlayerResourceCardsContext);

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
          <div className="playerName">Jimmy Smith</div>
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


  return (
    <div className="scoreCardsHolder">
      {content}
    </div>
  )
}

export default HostTurnInterface