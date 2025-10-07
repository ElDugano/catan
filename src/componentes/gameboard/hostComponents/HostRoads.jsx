import { useContext } from "react";
import { TileCornerNodesContext } from "../state/tileCornerNodes/TileCornerNodesContext";
import { PlayerInformationContext } from "../../../state/playerInformation/PlayerInformationContext";

export default function HostRoads( props ) {
  const { tileCornerNodes } = useContext(TileCornerNodesContext);
  const { playerColor } = useContext(PlayerInformationContext);

  let boardContent = [];
  //let tileNumber = 0;
  for (let x in tileCornerNodes) {
    if ( "rightRoadOwner" in tileCornerNodes[x][props.y]) {
      if (x < 11 && tileCornerNodes[parseInt(x)+1][props.y].value != "Ocean") {
        if (Number.isInteger(tileCornerNodes[parseInt(x)][props.y].rightRoadOwner)) {
        console.log("Player color is ", playerColor[0]);
          boardContent.push(
            <g>
              <clipPath id={"cut-rightRoad-x"+x+"-y"+props.y}>
                <rect
                  x={props.rightRoadOffset[x][props.y].x}
                  y={props.rightRoadOffset[x][props.y].y}
                  width="224"
                  height="88"
                />
              </clipPath>
              <image
                href={props.rightRoadSprite}
                width={2240}
                height={528}
                x={props.rightRoadOffset[x][props.y].x-(x-1)*224}
                y={props.rightRoadOffset[x][props.y].y-(props.y-1)*88}
                clip-path={"url(#cut-rightRoad-x"+x+"-y"+props.y}
              />
              
              <image
                style={{"mix-blend-mode":"multiply"}}
                href={props.roadSprites[playerColor[tileCornerNodes[x][props.y].rightRoadOwner]].right}//CHANGE PLAYER 0 TO OWNER
                width={2240}
                height={528}
                x={props.rightRoadOffset[x][props.y].x-(x-1)*224}
                y={props.rightRoadOffset[x][props.y].y-(props.y-1)*88}
                clip-path={"url(#cut-rightRoad-x"+x+"-y"+props.y}
              />
            </g>
            )
        }
      }
      if ( "bottomRoadOwner" in tileCornerNodes[x][props.y]) {
        if (Number.isInteger(tileCornerNodes[parseInt(x)][props.y].bottomRoadOwner)) {
          boardContent.push(
            <g>
              <rect
                  x={props.downRoadOffset[x][props.y].x+70}
                  y={props.downRoadOffset[x][props.y].y-10}
                  width="60"
                  height="120"
                  fill="red"
                  fillOpacity={0.0}
                />
              <clipPath id={"cut-downRoad-x"+x+"-y"+props.y}>
                <rect
                  x={props.downRoadOffset[x][props.y].x+70}
                  y={props.downRoadOffset[x][props.y].y-10}
                  width="60"
                  height="120"
                />
              </clipPath>
              <image
                href={props.verticalRoadSprite}
                width={360}
                height={600}
                x={props.downRoadOffset[x][props.y].x-(x-1)*30+70}
                y={props.downRoadOffset[x][props.y].y-(props.y-1)*120-10}
                clip-path={"url(#cut-downRoad-x"+x+"-y"+props.y}
              />
              <image
                style={{"mix-blend-mode":"multiply"}}
                href={props.roadSprites[playerColor[tileCornerNodes[x][props.y].bottomRoadOwner]].down}//CHANGE PLAYER 0 TO OWNER
                width={360}
                height={600}
                x={props.downRoadOffset[x][props.y].x-(x-1)*30+70}
                y={props.downRoadOffset[x][props.y].y-(props.y-1)*120-10}
                clip-path={"url(#cut-downRoad-x"+x+"-y"+props.y}
              />
            </g>
          )
          
        }
      }
    }
  }
  return (<>
    {boardContent}
    </>)
}