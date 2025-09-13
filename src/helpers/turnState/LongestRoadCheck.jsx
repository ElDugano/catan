import { useContext, useEffect } from 'react';

import { GameStateContext } from '../../state/gameState/GameStateContext.js';
import { TurnStateContext } from '../../state/turnState/TurnStateContext.js';

import { PlayerAvailableBuildingsContext } from "../../state/playerAvailableBuildings/PlayerAvailableBuildingsContext.js";

import { CurrentPlayerTurnContext } from "../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { PlayerResourceCardsContext } from "../../state/playerResourceCards/PlayerResourceCardsContext.js";
import { ScoreBoardContext } from "../../state/scoreBoard/ScoreBoardContext.js";

import { TileCornerNodesContext } from '../../componentes/gameboard/state/tileCornerNodes/TileCornerNodesContext.js';

import findThePlayersLongestRoad from '../../componentes/gameboard/helpers/FindLongestRoad.jsx';

import { NetworkingMessageSenderContext } from '../../componentes/networking/Host/NetworkingMessageSenderContext.js';

export default function LongestRoadCheck() {
  const { isGameStateBoardSetup,
          setGameStateToMainGame } = useContext(GameStateContext);
  const { isTurnStateRoadBuilderCardFirstRoadLongestRoadCheck,
          isTurnStateRoadBuilderCardSecondRoadLongestRoadCheck,
          setTurnStateToRoadBuilderCardSecondRoad,
          setTurnStateToBuildingASettlement,
          setTurnStateToStartTurn,
          setTurnStateToIdle }= useContext(TurnStateContext);

  const { returnAvailableSettlements,
          returnUsedRoads } = useContext(PlayerAvailableBuildingsContext);
  const { removePlayerResourcesToBuildRoad } = useContext(PlayerResourceCardsContext);

  const { currentPlayerTurn, gotoNextPlayerTurn, gotoPreviousPlayerTurn, isPlayerOrderArrayPositionEnd, isPlayerOrderArrayPositionStart } = useContext(CurrentPlayerTurnContext);
  const { checkIfLongestRoad } = useContext(ScoreBoardContext);
  const { tileCornerNodes } = useContext(TileCornerNodesContext);

  const { addToMessagePayloadToPlayer, addToMessagePayloadToAllPlayers, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  //THIS NEEDS TO BE NAMED SOMETHING ELSE, IT IS CONFUSING.
  //THIS IS JUST FOR A SPECIFIC STATE TO MOVE INTO THE NEXT STATE
  console.log("We got to check the longest road.");

  useEffect(() => {
    checkIfLongestRoad(findThePlayersLongestRoad(tileCornerNodes, currentPlayerTurn, returnUsedRoads(currentPlayerTurn)), currentPlayerTurn);
      //We will likely need to do a score check within that.
    if(isGameStateBoardSetup()){
      setTurnStateToBuildingASettlement();
      addToMessagePayloadToAllPlayers({turnState:"Building a settlement"});  //TODO fix, return from above.
      if(returnAvailableSettlements(currentPlayerTurn) == 4 && isPlayerOrderArrayPositionEnd()) {
        console.log("Time to reverse course");
      }
      else if(returnAvailableSettlements(currentPlayerTurn) == 4) {
        addToMessagePayloadToAllPlayers(gotoNextPlayerTurn());
        console.log("moving forward");
      }
      else if(returnAvailableSettlements(currentPlayerTurn) == 3 && !isPlayerOrderArrayPositionStart()) {
        addToMessagePayloadToAllPlayers(gotoPreviousPlayerTurn());
        console.log("moving backwards");
      }
      else {
        console.log("^^^^START THE GAME^^^^");
        addToMessagePayloadToAllPlayers(setGameStateToMainGame());
        addToMessagePayloadToAllPlayers(setTurnStateToStartTurn());
      }
    }
    else if(isTurnStateRoadBuilderCardFirstRoadLongestRoadCheck())
      addToMessagePayloadToAllPlayers(setTurnStateToRoadBuilderCardSecondRoad());
    else if (isTurnStateRoadBuilderCardSecondRoadLongestRoadCheck())
      addToMessagePayloadToAllPlayers(setTurnStateToIdle());
    else {
      addToMessagePayloadToAllPlayers(setTurnStateToIdle());
      addToMessagePayloadToAllPlayers(removePlayerResourcesToBuildRoad(currentPlayerTurn));
    }
    console.log("Send the messages!!!!");
    sendTheMessages();
  })
  
  return (
    <>
    </>
  )
}