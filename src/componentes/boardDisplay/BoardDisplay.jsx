import CornerNodes from "./CornerNodes.jsx";
import TileNumbers from "./TileNumbers.jsx";
import BanditIcon from "./BanditIcon.jsx";
import Tiles from "./Tiles.jsx";
import RoadNodes from "./RoadNodes.jsx";

import { useContext } from 'react';
import { GameStateContext } from '../GameStateContext.js'

export default function BoardDisplay(props) {
  const {gameState} = useContext(GameStateContext);
  return (
    <>
    Hey, we are in this state: {gameState}<br />
      <svg className="hex-grid" viewBox="0 0 420 370">
        <Tiles landTiles={props.landTiles} />
        <TileNumbers landTileNumbers={props.landTileNumbers} />
        <CornerNodes tileCornerNodes={props.tileCornerNodes} tileNodeClickFunction={props.tileNodeClickFunction} playerColor={props.playerColor}/>
        <RoadNodes tileCornerNodes={props.tileCornerNodes} roadNodeClickFunction={props.tileNodeClickFunction} currentPlayer={props.currentPlayer} playerColor={props.playerColor} />
        <BanditIcon coordinates={props.thiefLocation} />
      </svg>
    </>

  )
}