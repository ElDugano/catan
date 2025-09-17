import { ScoreBoardContext } from './ScoreBoardContext.js';
import { useState } from 'react'

export const ScoreBoard = ({ children }) => {
  const [scoreBoard, setScoreBoard] = useState([0,0,0,0]);
  const [hiddenPoints, setHiddenPoints] = useState([0,0,0,0]);
  const [winner, setWiner] = useState(null);

  function scorePoint(player) {
    console.log("Scoreing Points");
    return {scoreBoard:setScoreBoard((previousScore) => {
      let newScoreBoard = [...previousScore];
      newScoreBoard[player]++;
      checkIfWinner(newScoreBoard, hiddenPoints);
      console.log("New Scoreboard");
      console.log(newScoreBoard);
      return newScoreBoard;
    })};
  }

  function addPointsToPlayerHiddenPoints(player, playersHiddenPoints) {
    if(playersHiddenPoints != 0) {
      let newHiddenPoints = [...hiddenPoints];
      newHiddenPoints[player] += playersHiddenPoints;
      setHiddenPoints(newHiddenPoints);
      checkIfWinner(scoreBoard, newHiddenPoints);
      console.log("Hidden Points:");
      console.log(newHiddenPoints);
    }
  }

  function checkIfWinner(checkScoreboard, checkHiddenScore) {
    console.log("Checking If Winner: ",checkScoreboard,checkHiddenScore);
    checkScoreboard.forEach((playerScore, player) => {
      if (playerScore+checkHiddenScore[player] >= 10) {
        setWiner(player);
      }
    });
  }

  const [longestRoadOwner, setLongestRoadOwner] = useState(null);
  const [longestRoadDistance, setLongestRoadDistance] = useState(4);
  const [playerLongestRoad, setPlayerLongestRoad] = useState([0,0,0,0]);

  function checkIfLongestRoad(roadLength, player){
    console.log("checking this player's road length of "+roadLength);
    if (roadLength > longestRoadDistance) {
      console.log("We have a new longest road!");
      setLongestRoad(roadLength, player)
    }
    if(roadLength > playerLongestRoad[player]) {
      let newPlayerLongestRoad = [...playerLongestRoad];
      newPlayerLongestRoad[player] = roadLength;
      setPlayerLongestRoad(newPlayerLongestRoad);
    }
  }

  function setLongestRoad(roadLength, player) {
    if(player != longestRoadOwner){
      setScoreBoard((previousScore) => {
        let newScoreBoard = [...previousScore];
        if(longestRoadOwner != null)
          newScoreBoard[longestRoadOwner] -=2;
        newScoreBoard[player] +=2;
        checkIfWinner(newScoreBoard, hiddenPoints);
        return newScoreBoard;
      });
      setLongestRoadOwner(player);
    }
    setLongestRoadDistance(roadLength);
  }



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
        setScoreBoard,
        addPointsToPlayerHiddenPoints,
        checkIfLargestArmy,
        setLongestRoad,
        checkIfLongestRoad,
        longestRoadOwner,
        longestRoadDistance,
        playerLongestRoad,
        winner,
        scoreBoard,
      }}>
        {children}
      </ScoreBoardContext.Provider>
  )
}