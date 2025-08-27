import { useContext } from 'react'
import { TurnStateContext } from "../../state/turnState/TurnStateContext";
import { GameStateContext } from '../../state/gameState/GameStateContext';
import { PlayerColorContext } from "../../state/playerColor/PlayerColorContext";
import { CurrentPlayerTurnContext } from '../../state/currentPlayerTurn/CurrentPlayerTurnContext';

//TODO: Need to add logic for startup to only build in specific spots.

export default function RoadNodes(props) {
  const {isTurnStateBuildingARoad}= useContext(TurnStateContext);
  //const {gameState}= useContext(GameStateContext);
  const {playerColor} = useContext(PlayerColorContext);
  const {currentPlayerTurn} = useContext(CurrentPlayerTurnContext);

  let boardContent=[];
  let className = "";
  let strokeColor = "";
  let strokeWidth = 4;
  let x1, x2, y1, y2 = 0;
  
  for (let x=1; x <= 12; x++) {
    for (let y=1; y <= 6; y++) {
      if (props.tileCornerNodes[x][y].value != "Ocean") {
        //Check the rightRoad
        if(props.tileCornerNodes[x+1][y].value != "Ocean") {
          x1=(x+2)*30-9;
          x2=(x+1)*30+9;
          if((x+y)%2 == 1) {
            y1=y*50+20-6;
            y2=y*50+6;
          }
          else {
            y1=y*50+6;
            y2=y*50+20-6;
          }
          let drawLine = false;
          if( isTurnStateBuildingARoad() &&
              props.tileCornerNodes[x][y].rightRoadOwner == "none" &&
               (props.tileCornerNodes[x][y].owner == currentPlayerTurn ||
                props.tileCornerNodes[x+1][y].owner == currentPlayerTurn ||
                 (props.tileCornerNodes[x][y].owner == "none" || 
                  props.tileCornerNodes[x][y].owner == currentPlayerTurn) &&
                 (props.tileCornerNodes[x-1][y].rightRoadOwner == currentPlayerTurn ||
                   ((x+y)%2 == 0 && props.tileCornerNodes[x][y].bottomRoadOwner == currentPlayerTurn) ||
                   ((x+y)%2 == 1 && props.tileCornerNodes[x][y-1].bottomRoadOwner == currentPlayerTurn)) ||
                 (props.tileCornerNodes[x+1][y].owner == "none" || 
                  props.tileCornerNodes[x+1][y].owner == currentPlayerTurn) &&
                 (props.tileCornerNodes[x+1][y].rightRoadOwner == currentPlayerTurn ||
                   ((x+y)%2 == 0 && props.tileCornerNodes[x+1][y-1].bottomRoadOwner == currentPlayerTurn) ||
                   ((x+y)%2 == 1 && props.tileCornerNodes[x+1][y].bottomRoadOwner == currentPlayerTurn)))) {
            strokeColor="white";
            className = "roadNodeBuildable";
            drawLine=true;
          }
          else if(props.tileCornerNodes[x][y].rightRoadOwner != undefined &&
                  props.tileCornerNodes[x][y].rightRoadOwner != "none") {
            strokeColor=playerColor[props.tileCornerNodes[x][y].rightRoadOwner];
            className="";
            drawLine=true;
          }
          if(drawLine)
            boardContent.push(
              <line
                key={crypto.randomUUID()}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={className}
                stroke={strokeColor}
                onClick={strokeColor == "white" ? () => {props.roadNodeClickFunction(x,y, "Right Road")} : null}
                strokeWidth={strokeWidth}
              />
            );
        }
        //Check the bottomRoad
        if((x+y)%2==0 && props.tileCornerNodes[x][y+1].value != "Ocean"){
          x1=(x+1)*30;
          y1=y*50+20+9;
          x2=(x+1)*30;
          y2=(y+1)*50-9;
          let drawLine = false;
          if (isTurnStateBuildingARoad() &&
              props.tileCornerNodes[x][y].bottomRoadOwner == "none" &&
               (props.tileCornerNodes[x][y].owner == currentPlayerTurn ||
                props.tileCornerNodes[x][y+1].owner == currentPlayerTurn ||
                (props.tileCornerNodes[x][y].owner == "none" || 
                  props.tileCornerNodes[x][y].owner == currentPlayerTurn) &&
                (props.tileCornerNodes[x][y].rightRoadOwner == currentPlayerTurn ||
                  props.tileCornerNodes[x-1][y].rightRoadOwner == currentPlayerTurn ) ||
                (props.tileCornerNodes[x][y+1].owner == "none" || 
                  props.tileCornerNodes[x][y+1].owner == currentPlayerTurn) &&
                (props.tileCornerNodes[x][y+1].rightRoadOwner == currentPlayerTurn ||
                  props.tileCornerNodes[x-1][y+1].rightRoadOwner == currentPlayerTurn ))) {
            strokeColor="white";
            className = "roadNodeBuildable";
            drawLine=true;
          }
          else if(props.tileCornerNodes[x][y].bottomRoadOwner != "none") {
            strokeColor=playerColor[props.tileCornerNodes[x][y].bottomRoadOwner];
            className="";
            drawLine=true;
          }
          if(drawLine) {
            boardContent.push(
              <line
                key={crypto.randomUUID()}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={className}
                stroke={strokeColor}
                onClick={strokeColor == "white" ? () => {props.roadNodeClickFunction(x,y, "Bottom Road")} : null}
                strokeWidth={strokeWidth}
              />
            );
          }
        }
      }
    }
  }
  return boardContent;
}