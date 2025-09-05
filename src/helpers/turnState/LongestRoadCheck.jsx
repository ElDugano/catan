import { useContext, useEffect } from 'react';

import { GameStateContext } from '../../state/gameState/GameStateContext.js';
import { TurnStateContext } from '../../state/turnState/TurnStateContext.js';

import { PlayerAvailableBuildingsContext } from "../../state/playerAvailableBuildings/PlayerAvailableBuildingsContext.js";

import { CurrentPlayerTurnContext } from "../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { NumberOfPlayersContext } from '../../state/numberOfPlayers/NumberOfPlayersContext.js';
import { PlayerResourceCardsContext } from "../../state/playerResourceCards/PlayerResourceCardsContext.js";
import { ScoreBoardContext } from "../../state/scoreBoard/ScoreBoardContext.js";

import { TileCornerNodesContext } from '../../componentes/gameboard/state/tileCornerNodes/TileCornerNodesContext.js';

import findThePlayersLongestRoad from '../../componentes/gameboard/helpers/FindLongestRoad.jsx';

export default function LongestRoadCheck() {
  const { isGameStateBoardSetup,
          setGameStateToMainGame } = useContext(GameStateContext);
  const { isTurnStateBuildingARoadLongestRoadCheck,
          isTurnStateRoadBuilderCardFirstRoadLongestRoadCheck,
          isTurnStateRoadBuilderCardSecondRoadLongestRoadCheck,
          setTurnStateToRoadBuilderCarSecondRoad,
          setTurnStateToBuildingASettlement,
          setTurnStateToStartTurn,
          setTurnStateToIdle }= useContext(TurnStateContext);

  const { returnAvailableSettlements,
          returnUsedRoads } = useContext(PlayerAvailableBuildingsContext);
  const { removePlayerResourcesToBuildRoad } = useContext(PlayerResourceCardsContext);

  const { currentPlayerTurn, gotoNextPlayerTurn, gotoPreviousPlayerTurn } = useContext(CurrentPlayerTurnContext);
  const { numberOfPlayers } = useContext(NumberOfPlayersContext);
  const { checkIfLongestRoad } = useContext(ScoreBoardContext);
  const { tileCornerNodes } = useContext(TileCornerNodesContext);

  useEffect(() => {
    console.log("Hello World, I am here! ^^^^^^^^^^^^^^^^^^^^");
    if( isTurnStateBuildingARoadLongestRoadCheck() ||
        isTurnStateRoadBuilderCardFirstRoadLongestRoadCheck() ||
        isTurnStateRoadBuilderCardSecondRoadLongestRoadCheck() ){
      console.log("Looks like you just built a road. Good work! I will do some coding.");
    
      //removeRoadFromAvailableBuildings(x, y, currentPlayerTurn);
      checkIfLongestRoad(findThePlayersLongestRoad(tileCornerNodes, currentPlayerTurn, returnUsedRoads(currentPlayerTurn)), currentPlayerTurn);
      if(isGameStateBoardSetup()){
        setTurnStateToBuildingASettlement();
        if(returnAvailableSettlements(currentPlayerTurn) == 4 && currentPlayerTurn < numberOfPlayers-1) {
          gotoNextPlayerTurn();
          console.log("moving forward");
        }
        else if(returnAvailableSettlements(currentPlayerTurn) == 4 && currentPlayerTurn == numberOfPlayers-1) {
          console.log("Time to reverse course");
        }
        else if(returnAvailableSettlements(currentPlayerTurn) == 3 && currentPlayerTurn > 0) {
          //Give currentPlayerTurn Resrouces
          gotoPreviousPlayerTurn();
          console.log("moving backwards");
        }
        else {
          //Give currentPlayerTurn Resrouces
          console.log("^^^^START THE GAME^^^^");
          setGameStateToMainGame();
          setTurnStateToStartTurn();
        }
      }
      else if(isTurnStateRoadBuilderCardFirstRoadLongestRoadCheck())
        setTurnStateToRoadBuilderCarSecondRoad();
      else if (isTurnStateRoadBuilderCardSecondRoadLongestRoadCheck())
        setTurnStateToIdle();
      else {
        setTurnStateToIdle();
        removePlayerResourcesToBuildRoad(currentPlayerTurn);
      }
    }
  })
  

  return (
    <>
    </>
  )
}