import { ScoreBoardContext } from './ScoreBoardContext.js';
import { useState } from 'react'

export const ScoreBoard = ({ children }) => {
  const [scoreBoard, setScoreBoard] = useState([0,0,0,0]);
  const [hiddenPoints, setHiddenPoints] = useState([0,0,0,0]);
  const [winner, setWiner] = useState(null);

  function scorePoint(player) {
    let newScoreBoard = [...scoreBoard];
    newScoreBoard[player]++;
    setScoreBoard(newScoreBoard);
    checkIfWinner(newScoreBoard, hiddenPoints);
  }

  function addPointsToPlayerHiddenPoints(player, playersHiddenPoints) {
    if(playersHiddenPoints != 0) {
      let newHiddenPoints = [...hiddenPoints];
      newHiddenPoints[player] = playersHiddenPoints;
      setHiddenPoints(newHiddenPoints);
      checkIfWinner(scoreBoard, newHiddenPoints)
    }
  }

  function checkIfWinner(checkScoreboard, checkHiddenScore) {
    checkScoreboard.forEach((playerScore, player) => {
      if (playerScore+checkHiddenScore[player] >= 10) {
        setWiner(player);
      }
    });
  }

  const [longestRoadOwner, setLongestRoadOwner] = useState(null);
  const [longestRoadDistance, setLongestRoadDistance] = useState(4);



  const [largestArmyOwner, setLargestArmyOwner] = useState(null);
  const [largestArmyStrength, setLargestArmyStrength] = useState(2);

  function checkIfLargestArmy(player, armyStrength) {
    if (armyStrength > largestArmyStrength){
      if(player != largestArmyOwner){
        let newScoreBoard = [...scoreBoard];
        newScoreBoard[largestArmyOwner] -=2;
        newScoreBoard[player] +=2;
        setScoreBoard(newScoreBoard);
        setLargestArmyOwner(player);
        checkIfWinner(newScoreBoard, hiddenPoints);
      }
      setLargestArmyStrength(armyStrength);
    }
  }



  return (
      <ScoreBoardContext.Provider value={{
        scorePoint,
        addPointsToPlayerHiddenPoints,
        checkIfLargestArmy,
        longestRoadOwner,
        longestRoadDistance,
        winner
      }}>
        {children}
      </ScoreBoardContext.Provider>
  )
}