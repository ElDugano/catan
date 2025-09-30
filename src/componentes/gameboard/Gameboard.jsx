import { useContext, useEffect, useRef } from "react";
import CornerNodes from "./components/CornerNodes.jsx";
import TileNumbers from "./components/TileNumbers.jsx";
import BanditIcon from "./components/BanditIcon.jsx";
import Tiles from "./components/Tiles.jsx";
import Ports from "./components/Ports.jsx";
import RoadNodes from "./components/RoadNodes.jsx";
import ThiefMoveButtons from "./components/ThiefMoveButtons.jsx";
import "./gameboard.css"

import { TileCornerNodes } from './state/tileCornerNodes/TileCornerNodes.jsx'
import { LandTiles } from './state/landTiles/LandTiles.jsx'
import { PortTiles } from "./state/portTiles/PortTiles.jsx";
import { ThiefLocation } from './state/thiefLocation/ThiefLocation.jsx'
import { LandTileNumbers } from './state/landTileNumbers/LandTileNumbers.jsx'

import { CurrentPlayerTurnContext } from "../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { NetworkingContext } from "../networking/State/NetworkingContext.js";
import { TurnStateContext } from "../../state/turnState/TurnStateContext.js";

import {UncontrolledReactSVGPanZoom, ReactSVGPanZoom} from 'react-svg-pan-zoom';
import {useWindowSize} from '@react-hook/window-size'
//import {useWindowSize} from '@react-hook/window-size'
//import { useWindowSize } from "@uidotdev/usehooks";

export default function Gameboard({children}) {
  const { currentPlayerTurn, clientPlayerNumber} = useContext(CurrentPlayerTurnContext)
  const { isHost } = useContext(NetworkingContext);
  const { isTurnStateBuildingARoad,
          isTurnStateBuildingASettlement,
          isTurnStateBuildingACity,
          isTurnStateRoadBuilderCardFirstRoad,
          isTurnStateRoadBuilderCardSecondRoad,
          isTurnStateMoveTheThief,
          isTurnStateIdle,
          isTurnStateBuildMenu } = useContext(TurnStateContext);

  let stateHideBoard = "hideBoard";
  if ( isHost || 
      ((currentPlayerTurn == clientPlayerNumber ) &&
        ( isTurnStateBuildingARoad() ||
          isTurnStateBuildingASettlement() ||
          isTurnStateBuildingACity() ||
          isTurnStateRoadBuilderCardFirstRoad() ||
          isTurnStateRoadBuilderCardSecondRoad() ||
          isTurnStateMoveTheThief()))) {
    stateHideBoard = "";
  }

  const [width, height] = useWindowSize({initialWidth: 420, initialHeight: 370})
  console.log(width, height);

  const Viewer = useRef(null);
  useEffect(() => {
    if (isHost == false && (isTurnStateIdle() || isTurnStateBuildMenu())) {
      //Viewer.current.reset();
      Viewer.current.fitSelection(0, 0, 420, 370);
    }
  }, [isHost, isTurnStateIdle, isTurnStateBuildMenu, width]);

  const keepInBounds = (panObject) => {
    //console.log(panObject)
    const x = panObject.e;
    const y = panObject.f;
    const zoomLevel = panObject.a;
    const viewHeight = panObject.SVGHeight;
    const viewWidth = panObject.SVGWidth
    const boundsExtend = 50;

    let updateX = viewWidth/zoomLevel/2-x/zoomLevel;
    let updateY = viewHeight/zoomLevel/2-y/zoomLevel;
    let update = false;

    if(panObject.e > boundsExtend) {
      update = true;
      updateX = viewWidth/zoomLevel/2 - boundsExtend/zoomLevel;
    }
    if(-x/zoomLevel > (viewWidth - viewWidth/zoomLevel) + boundsExtend) {
      update = true;
      updateX = viewWidth-viewWidth/zoomLevel/2 + boundsExtend/zoomLevel;;
    }
    if(panObject.f > boundsExtend) {
      update = true;
      updateY = viewHeight/zoomLevel/2 - boundsExtend/zoomLevel;
    }
    if(-y/zoomLevel > (viewHeight - viewHeight/zoomLevel) + boundsExtend) {
      update = true;
      updateY = viewHeight-viewHeight/zoomLevel/2 + boundsExtend/zoomLevel;;
    }
    if(update == true)
      Viewer.current.setPointOnViewerCenter(updateX, updateY, zoomLevel)
  }



  return (
    <TileCornerNodes>
      <LandTiles>
        <PortTiles>
          <ThiefLocation>
            <LandTileNumbers>
              {isHost == false && <>
                <div className={stateHideBoard} style={{width: width+"px", height: ((width*370/420)+30)+"px"}}>
                <UncontrolledReactSVGPanZoom
                  ref={Viewer}
                  preventPanOutside={true}
                  disableDoubleClickZoomWithToolAuto={true}
                  detectAutoPan={false}
                  defaultTool={"auto"}
                  toolbarProps={{ position: 'none' }}
                  miniatureProps={{ position: 'none' }}
                  scaleFactorMin={0.2}
                  scaleFactorMax={5}
                  //width={420} height={370}
                  width={width} height={width*370/420}
                  background={"#3498db"}
                  //onZoom={(e) => keepInBounds(e)}
                  //onPan={(e) => keepInBounds(e)}
                  className={"clientGameBoardHolder "+stateHideBoard}
                >
                <svg className={"gameBoard "+stateHideBoard} viewBox="0 0 420 370" /*ref={svgRef}*/>
                  <g>
                    <rect x="-1" y="-1" width="200%" height="200%" fill="#3498db" />
                    <Tiles />
                    <Ports />
                    <TileNumbers />
                    <CornerNodes />
                    <RoadNodes />
                    <BanditIcon />
                    <ThiefMoveButtons />
                  </g>
                </svg>
                </UncontrolledReactSVGPanZoom>
                </div>

              </> }
              {isHost && 
                <svg className={"gameBoard "+stateHideBoard} viewBox="0 0 420 370" /*ref={svgRef}*/>
                  <g>
                    <Tiles />
                    <Ports />
                    <TileNumbers />
                    <CornerNodes />
                    <RoadNodes />
                    <BanditIcon />
                    <ThiefMoveButtons />
                  </g>
                </svg>
              }
              { children }
            </LandTileNumbers>
          </ThiefLocation>
        </PortTiles>
      </LandTiles>
    </TileCornerNodes>

  )
}