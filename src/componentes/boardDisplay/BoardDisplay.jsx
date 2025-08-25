import CornerNodes from "./CornerNodes.jsx";
import TileNumbers from "./TileNumbers.jsx";
import BanditIcon from "./BanditIcon.jsx";
import Tiles from "./Tiles.jsx";

export default function BoardDisplay({landTiles, landTileNumbers, tileCornerNodes, tileNodeClickFunction, thiefLocation, playerColor}) {
  return (
    <>
      <svg className="hex-grid" viewBox="0 0 420 370">
        <Tiles landTiles={landTiles} />
        <TileNumbers landTileNumbers={landTileNumbers} />
        <CornerNodes tileCornerNodes={tileCornerNodes} tileNodeClickFunction={tileNodeClickFunction} playerColor={playerColor}/>
      <BanditIcon coordinates={thiefLocation} />
    </svg>
    </>

  )
}