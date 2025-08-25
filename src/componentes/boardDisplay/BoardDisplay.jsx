import CornerNodes from "./CornerNodes.jsx";
import TileNumbers from "./TileNumbers.jsx";
import BanditIcon from "./BanditIcon.jsx";
import Tiles from "./Tiles.jsx";
import RoadNodes from "./RoadNodes.jsx";

export default function BoardDisplay(props) {
  return (
    <>
      <svg className="hex-grid" viewBox="0 0 420 370">
        <Tiles landTiles={props.landTiles} />
        <TileNumbers landTileNumbers={props.landTileNumbers} />
        <CornerNodes tileCornerNodes={props.tileCornerNodes} tileNodeClickFunction={props.tileNodeClickFunction} playerColor={props.playerColor}/>
        <RoadNodes tileCornerNodes={props.tileCornerNodes} />
        <BanditIcon coordinates={props.thiefLocation} />
      </svg>
    </>

  )
}