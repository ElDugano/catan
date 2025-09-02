import { ScoreBoardContext } from './ScoreBoardContext.js';
import { useState } from 'react'

export const ScoreBoard = ({ children }) => {
  const [scoreBoard, setScoreBoard] = useState([0,0,0,0]);

  function scorePoint(player) {
    let newScoreBoard = [...scoreBoard];
    newScoreBoard[player]++;
    setScoreBoard(newScoreBoard);
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
      }
      setLargestArmyStrength(armyStrength);
    }
  }



  return (
      <ScoreBoardContext.Provider value={{
        scorePoint,
        checkIfLargestArmy,
        longestRoadOwner,
        longestRoadDistance
      }}>
        {children}
      </ScoreBoardContext.Provider>
  )
}