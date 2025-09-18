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

export default function Gameboard({children}) {
  return (
    <TileCornerNodes>
      <LandTiles>
        <PortTiles>
          <ThiefLocation>
            <LandTileNumbers>
              { children }                
              <svg className="hex-grid" viewBox="0 0 420 370">
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
            </LandTileNumbers>
          </ThiefLocation>
        </PortTiles>
      </LandTiles>
    </TileCornerNodes>

  )
}