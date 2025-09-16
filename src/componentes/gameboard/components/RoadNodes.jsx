import { useContext } from 'react'
import { GameStateContext } from '../../../state/gameState/GameStateContext';
import { TurnStateContext } from "../../../state/turnState/TurnStateContext";

import { CurrentPlayerTurnContext } from '../../../state/currentPlayerTurn/CurrentPlayerTurnContext';

import { TileCornerNodesContext } from '../state/tileCornerNodes/TileCornerNodesContext';
import { PlayerAvailableBuildingsContext } from '../../../state/playerAvailableBuildings/PlayerAvailableBuildingsContext';

import BuildRoadButton from "./BuildRoadButton";
import Road from "./Road";

import { NetworkingMessageSenderContext } from '../../networking/Host/NetworkingMessageSenderContext.js';

export default function RoadNodes() {
  const {isGameStateBoardSetup}= useContext(GameStateContext);
  const { turnState,
          setTurnStateToIdle,
          isTurnStateBuildingARoad,
          isTurnStateRoadBuilderCardFirstRoad,
          isTurnStateRoadBuilderCardSecondRoad,
          setTurnStateToRoadBuilderCardSecondRoad }= useContext(TurnStateContext);

  const { lastBuiltObject } = useContext(PlayerAvailableBuildingsContext);
  const { currentPlayerTurn, isClientPlayersTurn } = useContext(CurrentPlayerTurnContext);

  const {tileCornerNodes } = useContext(TileCornerNodesContext);

  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  let boardContent=[];

  function buildRightRoad(x, y) {
    addToMessagePayloadToHost({header: "Building a Road"});
    addToMessagePayloadToHost({buildRoad:{x:x,y:y,direction:"right",clientTurnState:turnState}});
    sendTheMessages();
    if(isTurnStateRoadBuilderCardFirstRoad())
      setTurnStateToRoadBuilderCardSecondRoad();
    else
      setTurnStateToIdle();
  }

  function buildBottomRoad(x, y) {
    addToMessagePayloadToHost({header: "Building a Road"});
    addToMessagePayloadToHost({buildRoad:{x:x,y:y,direction:"bottom",clientTurnState:turnState}});
    sendTheMessages();
    if(isTurnStateRoadBuilderCardFirstRoad())
      setTurnStateToRoadBuilderCardSecondRoad();
    else
      setTurnStateToIdle();
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
            if((isClientPlayersTurn() && (
                isTurnStateBuildingARoad() ||
                isTurnStateRoadBuilderCardFirstRoad() ||
                isTurnStateRoadBuilderCardSecondRoad()) &&
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
                      ( (x+y)%2 == 1 && tileCornerNodes[x+1][y].bottomRoadOwner == currentPlayerTurn )))))) {
            if(!isGameStateBoardSetup() ||
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
          if((isClientPlayersTurn() && (
                isTurnStateBuildingARoad() ||
                isTurnStateRoadBuilderCardFirstRoad() ||
                isTurnStateRoadBuilderCardSecondRoad()) &&
                tileCornerNodes[x][y].bottomRoadOwner == "none" &&
                ( tileCornerNodes[x][y].owner == currentPlayerTurn ||
                  tileCornerNodes[x][y+1].owner == currentPlayerTurn ||
                  tileCornerNodes[x][y].owner == "none" &&
                  ( tileCornerNodes[x][y].rightRoadOwner == currentPlayerTurn ||
                    tileCornerNodes[x-1][y].rightRoadOwner == currentPlayerTurn ) ||
                ( tileCornerNodes[x][y+1].owner == "none" &&
                  ( tileCornerNodes[x][y+1].rightRoadOwner == currentPlayerTurn ||
                    tileCornerNodes[x-1][y+1].rightRoadOwner == currentPlayerTurn ))))) {
            if(!isGameStateBoardSetup() ||
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