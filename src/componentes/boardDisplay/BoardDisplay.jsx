import CornerNodes from "./CornerNodes.jsx";
import TileNumbers from "./TileNumbers.jsx";
import BanditIcon from "./BanditIcon.jsx";
import Tiles from "./Tiles.jsx";
import RoadNodes from "./RoadNodes.jsx";

import { useContext } from 'react';
import { GameStateContext } from "../../state/gameState/GameStateContext.js";

export default function BoardDisplay(props) {
  const {gameState} = useContext(GameStateContext);
  return (
    <>
    Hey, we are in this state: {gameState}<br />
      <svg className="hex-grid" viewBox="0 0 420 370">
        <Tiles landTiles={props.landTiles} />
        <TileNumbers landTileNumbers={props.landTileNumbers} />
        <CornerNodes tileNodeClickFunction={props.tileNodeClickFunction} />
        <RoadNodes roadNodeClickFunction={props.tileNodeClickFunction} />
        <BanditIcon coordinates={props.thiefLocation} />
      </svg>
    </>

  )
}