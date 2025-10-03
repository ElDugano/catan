import { useContext } from "react";
import { TileCornerNodesContext } from "../state/tileCornerNodes/TileCornerNodesContext";
import { PlayerInformationContext } from "../../../state/playerInformation/PlayerInformationContext";

import HostRoad from "./HostRoad";

export default function HostRoads( props ) {
  const { tileCornerNodes } = useContext(TileCornerNodesContext);
  const { playerColor } = useContext(PlayerInformationContext);

  const rightRoadOffset = 
  [
    [{x:0,y:0},{x:0,y:0}    ,{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0}    ,{x:0,y:0}     ,{x:150, y:310},{x:115, y:455},{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0}    ,{x:335, y:170},{x:310, y:310},{x:275, y:455},{x:250, y:595},{x:0,y:0}     ,{x:0,y:0}],
    [{x:0,y:0},{x:500, y:30},{x:485, y:170},{x:460, y:310},{x:440, y:455},{x:420, y:595},{x:400, y:740},{x:0,y:0}],
    [{x:0,y:0},{x:645, y:30},{x:630, y:170},{x:615, y:310},{x:600, y:455},{x:590, y:595},{x:575, y:740},{x:0,y:0}],
    [{x:0,y:0},{x:780, y:30},{x:775, y:170},{x:770, y:310},{x:765, y:455},{x:760, y:595},{x:760, y:740},{x:0,y:0}],
    [{x:0,y:0},{x:920, y:30},{x:920, y:170},{x:925, y:310},{x:930, y:455},{x:935, y:595},{x:935, y:740},{x:0,y:0}],
    [{x:0,y:0},{x:1050,y:30},{x:1065,y:170},{x:1080,y:310},{x:1095,y:455},{x:1105,y:595},{x:1115,y:740},{x:0,y:0}],
    [{x:0,y:0},{x:1195,y:30},{x:1210,y:170},{x:1235,y:310},{x:1260,y:455},{x:1275,y:595},{x:1295,y:740},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0}    ,{x:1360,y:170},{x:1390,y:310},{x:1420,y:455},{x:1445,y:595},{x:0,y:0}     ,{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0}    ,{x:0,y:0}     ,{x:1540,y:310},{x:1580,y:455},{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0}    ,{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}]
  ];
    const downRoadOffset = 
  [
    [{x:0,y:0},{x:0   ,y:0} ,{x:0   ,y:0}  ,{x:0,   y:0}  ,{x:0   ,y:0}  ,{x:0   ,y:0}  ,{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0   ,y:0} ,{x:0   ,y:0}  ,{x:60,  y:375},{x:0   ,y:0}  ,{x:0   ,y:0}  ,{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0   ,y:0} ,{x:255 ,y:235},{x:0   ,y:0}  ,{x:185 ,y:520},{x:0   ,y:0}  ,{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:430,y:95} ,{x:0   ,y:0}  ,{x:380 ,y:375},{x:0   ,y:0}  ,{x:330 ,y:660},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0   ,y:0} ,{x:555 ,y:235},{x:0   ,y:0}  ,{x:520 ,y:520},{x:0   ,y:0}  ,{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:715 ,y:95},{x:0   ,y:0}  ,{x:695 ,y:375},{x:0   ,y:0}  ,{x:680 ,y:660},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0   ,y:0} ,{x:855 ,y:235},{x:0   ,y:0}  ,{x:855 ,y:520},{x:0   ,y:0}  ,{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:1000,y:95},{x:0   ,y:0}  ,{x:1015,y:375},{x:0   ,y:0}  ,{x:1035,y:660},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0   ,y:0} ,{x:1160,y:235},{x:0   ,y:0}  ,{x:1190,y:520},{x:0   ,y:0}  ,{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:1280,y:95},{x:0   ,y:0}  ,{x:1335,y:375},{x:0   ,y:0}  ,{x:1385,y:660},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0   ,y:0} ,{x:1458,y:235},{x:0,   y:0}  ,{x:1525,y:520},{x:0   ,y:0}  ,{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0   ,y:0} ,{x:0   ,y:0}  ,{x:1650,y:375},{x:0   ,y:0}  ,{x:0   ,y:0}  ,{x:0,y:0},{x:0,y:0}]
  ];

  //let imageFile = [];
//
  //for (let x in tileCornerNodes) {
  //  if ("rightRoadOwner" in tileCornerNodes[x][props.y] &&
  //      x < 11 &&
  //      tileCornerNodes[parseInt(x)+1][props.y].value != "Ocean") {
  //    if (Number.isInteger(tileCornerNodes[parseInt(x)][props.y].rightRoadOwner)) {
  //      const fileName="rightRoad-x"+x+"-y"+props.y+"-"+playerColor[tileCornerNodes[x][props.y].rightRoadOwner].toLowerCase();
  //      imageFile.push(fileName);
  //    }
  //  }
  //  if ("bottomRoadOwner" in tileCornerNodes[x][props.y]) {
  //    if (Number.isInteger(tileCornerNodes[parseInt(x)][props.y].bottomRoadOwner)) {
  //      const fileName="bottomRoad-x"+x+"-y"+props.y+"-"+playerColor[tileCornerNodes[x][props.y].bottomRoadOwner].toLowerCase();
  //      imageFile.push(fileName);
  //    }
  //  }
  //}

  let boardContent = [];
  //let tileNumber = 0;
  for (let x in tileCornerNodes) {
    if ( "rightRoadOwner" in tileCornerNodes[x][props.y]) {
      if (x < 11 && tileCornerNodes[parseInt(x)+1][props.y].value != "Ocean") {
        if (Number.isInteger(tileCornerNodes[parseInt(x)][props.y].rightRoadOwner)) {
          boardContent.push(
            <HostRoad 
              key={crypto.randomUUID()}
              translateValue={"translate(" + rightRoadOffset[x][props.y].x + "," + rightRoadOffset[x][props.y].y + ")"}
              //imagePath={imageFile[tileNumber]}
              imagePath={"rightRoad-x"+x+"-y"+props.y+"-"+playerColor[tileCornerNodes[x][props.y].rightRoadOwner].toLowerCase()}
              width={'224'}
              height={'80'}
            />
            )
          //tileNumber++;
        }
      }
      if ( "bottomRoadOwner" in tileCornerNodes[x][props.y]) {
        if (Number.isInteger(tileCornerNodes[parseInt(x)][props.y].bottomRoadOwner)) {
          boardContent.push(
            <HostRoad 
              key={crypto.randomUUID()}
              translateValue={"translate(" + downRoadOffset[x][props.y].x + "," + downRoadOffset[x][props.y].y + ")"}
             // imagePath={imageFile[tileNumber]}
              imagePath={"bottomRoad-x"+x+"-y"+props.y+"-"+playerColor[tileCornerNodes[x][props.y].bottomRoadOwner].toLowerCase()}
              width={'208'}
              height={'96'}
            />
          )
          //tileNumber++;
        }
      }
      
    }
  }
  return (<>
    {boardContent}
    </>)
}