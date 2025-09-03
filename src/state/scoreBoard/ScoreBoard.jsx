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
    console.log("The score is now: ");
    console.log(newScoreBoard);
    console.log("With hidden points the score is [0]: "+(newScoreBoard[0]+hiddenPoints[0])+" [1]: "+(newScoreBoard[1]+hiddenPoints[1])+" [2]: "+(newScoreBoard[2]+hiddenPoints[2]));
    checkIfWinner(newScoreBoard, hiddenPoints);
  }

  function addPointsToPlayerHiddenPoints(player, playersHiddenPoints) {
    if(playersHiddenPoints != 0) {
      let newHiddenPoints = [...hiddenPoints];
      newHiddenPoints[player] = playersHiddenPoints;
      setHiddenPoints(newHiddenPoints);
      console.log("Player "+player+" had "+newHiddenPoints+" hidden Points");
      checkIfWinner(scoreBoard, newHiddenPoints)
    }
  }

  function checkIfWinner(checkScoreboard, checkHiddenScore) {
    console.log("Checking winners");
    console.log(checkScoreboard);
    checkScoreboard.forEach((playerScore, player) => {
      console.log("Player "+player+" has a score of "+playerScore+" with extra hidden points of "+checkHiddenScore[player]);
      if (playerScore+checkHiddenScore[player] >= 10) {
        console.log("WE HAVE A WINNER, IT IS PLAYER "+player);
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
        console.log("Player "+player+" now has the largest army with a strength of: "+armyStrength);
        console.log("The score is now: ");
        console.log(newScoreBoard);
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