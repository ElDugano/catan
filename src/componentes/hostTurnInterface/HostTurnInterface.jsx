import { useContext } from "react";
import { CurrentPlayerTurnContext } from "../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerColorContext } from "../../state/playerColor/PlayerColorContext";
import { ScoreBoardContext } from "../../state/scoreBoard/ScoreBoardContext";

import "./hostTurnInterface.css"

const HostTurnInterface = () => {
  const { playerOrder, currentPlayerTurn, numberOfPlayers } = useContext(CurrentPlayerTurnContext);
  const { playerColor } = useContext(PlayerColorContext);
  const { scoreBoard } = useContext(ScoreBoardContext);

  let scoreCardWidth;
  if (numberOfPlayers == 2)
    scoreCardWidth="twoPlayerScoreCard";
  else if(numberOfPlayers == 3)
    scoreCardWidth="threePlayerScoreCard";
  else if(numberOfPlayers == 4)
    scoreCardWidth="fourPlayerScoreCard";

  let content = [];

  playerOrder.forEach((value, index) => {
    console.log(value);
    content.push(
      <div key={crypto.randomUUID()} className={"playerScoreCard "+scoreCardWidth}>
        <div className="playerInformationHolder">
          <div className="playerName">Fake Player Name</div>
          <div className="playerData">C=0</div>
          <div className="playerData">A=0</div>
          <div className="playerData">D=0</div>
          <div className="playerData">R=0</div>
        </div>
        <div className="playerScore">
          0
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