import CornerNodes from "./components/CornerNodes.jsx";
import TileNumbers from "./components/TileNumbers.jsx";
import BanditIcon from "./components/BanditIcon.jsx";
import Tiles from "./components/Tiles.jsx";
import RoadNodes from "./components/RoadNodes.jsx";

import { TileCornerNodes } from './state/tileCornerNodes/TileCornerNodes.jsx'
import { LandTiles } from './state/landTiles/LandTiles.jsx'
import { ThiefLocation } from './state/thiefLocation/ThiefLocation.jsx'
import { LandTileNumbers } from './state/landTileNumbers/LandTileNumbers.jsx'




//const Gameboard = forwardRef((props, ref) => {
export default function Gameboard({children}) {


  return (
    <TileCornerNodes>
      <LandTiles>
        <ThiefLocation>
          <LandTileNumbers>
            { children }
            <svg className="hex-grid" viewBox="0 0 420 370">
              <Tiles />
              <TileNumbers />
              <CornerNodes />
              <RoadNodes />
              <BanditIcon />
            </svg>
          </LandTileNumbers>
        </ThiefLocation>
      </LandTiles>
    </TileCornerNodes>
  )
}