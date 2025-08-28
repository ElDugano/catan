import { useContext } from 'react'
import { TurnStateContext } from "../../state/turnState/TurnStateContext";
import { GameStateContext } from '../../state/gameState/GameStateContext';
import { CurrentPlayerTurnContext } from '../../state/currentPlayerTurn/CurrentPlayerTurnContext';
import { LastBuiltObjectContext } from '../../state/lastBuiltObject/LastBuiltObjectContext';
import { TileCornerNodesContext } from '../../state/tileCornerNodes/TileCornerNodesContext';
import { PlayerAvailableBuildingsContext } from '../../state/playerAvailableBuildings/PlayerAvailableBuildingsContext';
import { NumberOfPlayersContext } from '../../state/numberOfPlayers/NumberOfPlayersContext';
import BuildRoadButton from "./BuildRoadButton";
import Road from "./Road";

export default function RoadNodes() {
  const {isTurnStateBuildingARoad, setTurnStateToBuildingASettlement}= useContext(TurnStateContext);
  const {isGameStateSetup, setGameStateToMainGame}= useContext(GameStateContext);
  const {currentPlayerTurn, gotoNextPlayerTurn, gotoPreviousPlayerTurn} = useContext(CurrentPlayerTurnContext);
  const {lastBuiltObject, recordRightRoadBuilt, recordBottomRoadBuilt} = useContext(LastBuiltObjectContext);
  const {tileCornerNodes, setNodeRightRoadOwner, setNodeBottomRoadOwner} = useContext(TileCornerNodesContext);
  const {removeRoadFromAvailableBuildings, returnAvailableSettlements} = useContext(PlayerAvailableBuildingsContext);
  const {numberOfPlayers} = useContext(NumberOfPlayersContext);

  let boardContent=[];

  function buildRightRoad(x, y) {
    recordRightRoadBuilt(currentPlayerTurn, x, y);
    setNodeRightRoadOwner(x, y, currentPlayerTurn);
    removeRoadFromAvailableBuildings(currentPlayerTurn);
    if(isGameStateSetup())
      continueSetup();
    //Do more logic as we will need.
  }

  function buildBottomRoad(x, y) {
    recordBottomRoadBuilt(currentPlayerTurn, x, y);
    setNodeBottomRoadOwner(x, y, currentPlayerTurn);
    removeRoadFromAvailableBuildings(currentPlayerTurn);
    if(isGameStateSetup())
      continueSetup();
    //Do more logic as we will need.
  }
  
  function continueSetup() {
    setTurnStateToBuildingASettlement();
    if(returnAvailableSettlements(currentPlayerTurn) == 4 && currentPlayerTurn < numberOfPlayers-1) {
      gotoNextPlayerTurn();
      console.log("moving forward");
    }
    else if(returnAvailableSettlements(currentPlayerTurn) == 4 && currentPlayerTurn == numberOfPlayers-1) {
      console.log("Time to reverse course");
    }
    else if(returnAvailableSettlements(currentPlayerTurn) == 3 && currentPlayerTurn > 0) {
      gotoPreviousPlayerTurn();
      console.log("moving backwards");
    }
    else {
      console.log("^^^^START THE GAME^^^^");
      setGameStateToMainGame();
      //setTurnState("rolling dice"); //When we get to that point
    }
  }
  
  for (let x=1; x <= 12; x++) {
    for (let y=1; y <= 6; y++) {
      if (tileCornerNodes[x][y].value != "Ocean") {
        
        if(tileCornerNodes[x+1][y].value != "Ocean") {
          //Check the rightRoad
          const lineStartX=(x+2)*30-9;
          const lineEndX=(x+1)*30+9;
          const lineStartY=(x+y)%2 == 1 ? y*50+20-6 : y*50+6;
          const lineEndY=(x+y)%2 == 1 ? y*50+6 : y*50+20-6;
          if( isTurnStateBuildingARoad() &&
              tileCornerNodes[x][y].rightRoadOwner == "none" &&
              ( tileCornerNodes[x][y].owner == currentPlayerTurn ||
                tileCornerNodes[x+1][y].owner == currentPlayerTurn ||
                ( tileCornerNodes[x][y].owner == "none" &&
                  ( tileCornerNodes[x-1][y].rightRoadOwner == currentPlayerTurn ||
                    ( (x+y)%2 == 0 && tileCornerNodes[x][y].bottomRoadOwner == currentPlayerTurn ) ||
                    ( (x+y)%2 == 1 && tileCornerNodes[x][y-1].bottomRoadOwner == currentPlayerTurn ))) ||
                ( tileCornerNodes[x+1][y].owner == "none" &&
                  ( tileCornerNodes[x+1][y].rightRoadOwner == currentPlayerTurn ||
                    ( (x+y)%2 == 0 && tileCornerNodes[x+1][y-1].bottomRoadOwner == currentPlayerTurn ) ||
                    ( (x+y)%2 == 1 && tileCornerNodes[x+1][y].bottomRoadOwner == currentPlayerTurn ))))) {
            if(isGameStateSetup() &&
              ((lastBuiltObject.x == x || lastBuiltObject.x == x+1) && lastBuiltObject.y == y && lastBuiltObject.player == currentPlayerTurn)) {
              boardContent.push(
                <BuildRoadButton
                  key={crypto.randomUUID()}
                  lineStartX={lineStartX}
                  lineStartY={lineStartY}
                  lineEndX={lineEndX}
                  lineEndY={lineEndY}
                  roadNodeClickFunction={() => buildRightRoad(x,y)}

                />)
            }
          }
          else {
            boardContent.push(
              <Road
                key={crypto.randomUUID()}
                lineStartX={lineStartX}
                lineStartY={lineStartY}
                lineEndX={lineEndX}
                lineEndY={lineEndY}
                tileNodePosition={tileCornerNodes[x][y]}
                NodeRoadOwner={tileCornerNodes[x][y].rightRoadOwner}
              />
            )
          }
        }
        
        if((x+y)%2==0 && tileCornerNodes[x][y+1].value != "Ocean"){
          //Check the bottomRoad
          const lineStartX=(x+1)*30;
          const lineStartY=y*50+20+9;
          const lineEndX=(x+1)*30;
          const lineEndY=(y+1)*50-9;
          if (isTurnStateBuildingARoad() &&
              tileCornerNodes[x][y].bottomRoadOwner == "none" &&
              ( tileCornerNodes[x][y].owner == currentPlayerTurn ||
                tileCornerNodes[x][y+1].owner == currentPlayerTurn ||
                tileCornerNodes[x][y].owner == "none" &&
                ( tileCornerNodes[x][y].rightRoadOwner == currentPlayerTurn ||
                  tileCornerNodes[x-1][y].rightRoadOwner == currentPlayerTurn ) ||
              ( tileCornerNodes[x][y+1].owner == "none" &&
                ( tileCornerNodes[x][y+1].rightRoadOwner == currentPlayerTurn ||
                  tileCornerNodes[x-1][y+1].rightRoadOwner == currentPlayerTurn )))) {
            if(isGameStateSetup() &&
              (lastBuiltObject.x == x && (lastBuiltObject.y == y || lastBuiltObject.y == y+1) && lastBuiltObject.player == currentPlayerTurn))
            boardContent.push(
            <BuildRoadButton
                key={crypto.randomUUID()}
                lineStartX={lineStartX}
                lineStartY={lineStartY}
                lineEndX={lineEndX}
                lineEndY={lineEndY}
                roadNodeClickFunction={() => buildBottomRoad(x,y)}
              />
            )
          }
          else {
            boardContent.push(
              <Road
                key={crypto.randomUUID()}
                lineStartX={lineStartX}
                lineStartY={lineStartY}
                lineEndX={lineEndX}
                lineEndY={lineEndY}
                tileNodePosition={tileCornerNodes[x][y]}
                NodeRoadOwner={tileCornerNodes[x][y].bottomRoadOwner}
              />
            )
          }
        }
      }
    }
  }
  return boardContent;
}