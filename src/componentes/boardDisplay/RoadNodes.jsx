import { useContext } from 'react'
import { TurnStateContext } from "../../state/turnState/TurnStateContext";
import { GameStateContext } from '../../state/gameState/GameStateContext';
import { PlayerColorContext } from "../../state/playerColor/PlayerColorContext";
import { CurrentPlayerTurnContext } from '../../state/currentPlayerTurn/CurrentPlayerTurnContext';
import { LastBuiltObjectContext } from '../../state/lastBuiltObject/LastBuiltObjectContext';
import BuildRoadButton from "./BuildRoadButton";
import Road from "./Road";

export default function RoadNodes(props) {
  const {isTurnStateBuildingARoad}= useContext(TurnStateContext);
  const {gameState}= useContext(GameStateContext);
  const {currentPlayerTurn} = useContext(CurrentPlayerTurnContext);
  const {lastBuiltObject, recordRightRoadBuilt, recordBottomRoadBuilt} = useContext(LastBuiltObjectContext);

  let boardContent=[];
  
  for (let x=1; x <= 12; x++) {
    for (let y=1; y <= 6; y++) {
      if (props.tileCornerNodes[x][y].value != "Ocean") {
        
        if(props.tileCornerNodes[x+1][y].value != "Ocean") {
          //Check the rightRoad
          const lineStartX=(x+2)*30-9;
          const lineEndX=(x+1)*30+9;
          const lineStartY=(x+y)%2 == 1 ? y*50+20-6 : y*50+6;
          const lineEndY=(x+y)%2 == 1 ? y*50+6 : y*50+20-6;
          if( isTurnStateBuildingARoad() &&
              props.tileCornerNodes[x][y].rightRoadOwner == "none" &&
              ( props.tileCornerNodes[x][y].owner == currentPlayerTurn ||
                props.tileCornerNodes[x+1][y].owner == currentPlayerTurn ||
                ( props.tileCornerNodes[x][y].owner == "none" &&
                  ( props.tileCornerNodes[x-1][y].rightRoadOwner == currentPlayerTurn ||
                    ( (x+y)%2 == 0 && props.tileCornerNodes[x][y].bottomRoadOwner == currentPlayerTurn ) ||
                    ( (x+y)%2 == 1 && props.tileCornerNodes[x][y-1].bottomRoadOwner == currentPlayerTurn ))) ||
                ( props.tileCornerNodes[x+1][y].owner == "none" &&
                  ( props.tileCornerNodes[x+1][y].rightRoadOwner == currentPlayerTurn ||
                    ( (x+y)%2 == 0 && props.tileCornerNodes[x+1][y-1].bottomRoadOwner == currentPlayerTurn ) ||
                    ( (x+y)%2 == 1 && props.tileCornerNodes[x+1][y].bottomRoadOwner == currentPlayerTurn ))))) {
            if(gameState=="setup" &&
              ((lastBuiltObject.x == x || lastBuiltObject.x == x+1) && lastBuiltObject.y == y && lastBuiltObject.player == currentPlayerTurn))
            boardContent.push(
              <BuildRoadButton
                key={crypto.randomUUID()}
                lineStartX={lineStartX}
                lineStartY={lineStartY}
                lineEndX={lineEndX}
                lineEndY={lineEndY}
                roadNodeClickFunction={() => (props.roadNodeClickFunction(x, y, recordRightRoadBuilt()))}
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
                tileNodePosition={props.tileCornerNodes[x][y]}
                NodeRoadOwner={props.tileCornerNodes[x][y].rightRoadOwner}
              />
            )
          }
        }
        
        if((x+y)%2==0 && props.tileCornerNodes[x][y+1].value != "Ocean"){
          //Check the bottomRoad
          const lineStartX=(x+1)*30;
          const lineStartY=y*50+20+9;
          const lineEndX=(x+1)*30;
          const lineEndY=(y+1)*50-9;
          if (isTurnStateBuildingARoad() &&
              props.tileCornerNodes[x][y].bottomRoadOwner == "none" &&
              ( props.tileCornerNodes[x][y].owner == currentPlayerTurn ||
                props.tileCornerNodes[x][y+1].owner == currentPlayerTurn ||
                props.tileCornerNodes[x][y].owner == "none" &&
                ( props.tileCornerNodes[x][y].rightRoadOwner == currentPlayerTurn ||
                  props.tileCornerNodes[x-1][y].rightRoadOwner == currentPlayerTurn ) ||
              ( props.tileCornerNodes[x][y+1].owner == "none" &&
                ( props.tileCornerNodes[x][y+1].rightRoadOwner == currentPlayerTurn ||
                  props.tileCornerNodes[x-1][y+1].rightRoadOwner == currentPlayerTurn )))) {
            if(gameState=="setup" &&
              (lastBuiltObject.x == x && (lastBuiltObject.y == y || lastBuiltObject.y == y+1) && lastBuiltObject.player == currentPlayerTurn))
            boardContent.push(
            <BuildRoadButton
                key={crypto.randomUUID()}
                lineStartX={lineStartX}
                lineStartY={lineStartY}
                lineEndX={lineEndX}
                lineEndY={lineEndY}
                roadNodeClickFunction={() => (props.roadNodeClickFunction(x, y, recordBottomRoadBuilt()))}
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
                tileNodePosition={props.tileCornerNodes[x][y]}
                NodeRoadOwner={props.tileCornerNodes[x][y].bottomRoadOwner}
              />
            )
          }
        }
      }
    }
  }
  return boardContent;
}