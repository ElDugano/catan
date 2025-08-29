import { useState, useContext, useImperativeHandle, forwardRef } from 'react';

import CornerNodes from "./CornerNodes.jsx";
import TileNumbers from "./TileNumbers.jsx";
import BanditIcon from "./BanditIcon.jsx";
import Tiles from "./Tiles.jsx";
import RoadNodes from "./RoadNodes.jsx";

import { CreateLandTileNumbers, CreateLandTiles, CreatePortTiles } from './stateInitializers/stateInitializers.jsx';
import FindDesert from './stateInitializers/FindDesert.jsx';

import { GameStateContext } from "../../state/gameState/GameStateContext.js";

//Testing returning this data to app.
import { TileCornerNodesContext } from "../gameboard/state/tileCornerNodes/TileCornerNodesContext.jsx";

const Gameboard = forwardRef((props, ref) => {
  const [landTiles, setLandTiles] = useState(CreateLandTiles);
  const [thiefLocation, setThiefLocation] = useState(() => FindDesert(landTiles));
  const [landTileNumbers, setLandTileNumbers] = useState(() => CreateLandTileNumbers(thiefLocation));
  const [portTiles, setPortTiles] = useState(() => CreatePortTiles(thiefLocation));

  const {isGameStateSetup} = useContext(GameStateContext);

  //Testing returning this data to app.
  const {tileCornerNodes} = useContext(TileCornerNodesContext);

  useImperativeHandle(ref, () => ({
    tileCornerNodes
  }));

  return (
    <>
    Hey, Are we in the setup phase? {isGameStateSetup() == true ? "yes" : "no"}!<br />
      <svg className="hex-grid" viewBox="0 0 420 370">
        <Tiles landTiles={landTiles} />
        <TileNumbers landTileNumbers={landTileNumbers} />
        <CornerNodes />
        <RoadNodes />
        <BanditIcon coordinates={thiefLocation} />
      </svg>
    </>

  )
});

export default Gameboard
