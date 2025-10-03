import { useContext } from "react";
import { LandTilesContext } from "../state/landTiles/LandTilesContext";

import HostTile from "./HostTile";

export default function HostTiles( props ) {
  const { landTiles } = useContext(LandTilesContext);

  let boardContent = [];

  let xMult = 0;
  let xAdjust = 0;
  let yOffset = 0;
  switch (props.y) {
    case 1:
      xMult = 135;
      xAdjust = 50;
      yOffset = 37;
    break;
    case 2:
      xMult = 143;
      xAdjust = 98;
      yOffset = 178;
    break
    case 3:
      xMult = 152;
      xAdjust = 152;
      yOffset = 319;
    break
    case 4:
      xMult = 160;
      xAdjust = 201;
      yOffset = 461;
    break
    case 5:
      xMult = 169;
      xAdjust = 255;
      yOffset = 602;
    break
  }

  for (let x in landTiles) {
    let translateValue = "translate(" + (x*xMult-xAdjust) + "," + (yOffset) + ")";
    if (props.y in landTiles[x]) {
      boardContent.push(
        <HostTile
          key={crypto.randomUUID()}
          translateValue={translateValue}
          imageFile={`${landTiles[x][props.y].toLowerCase()}-x${x}-y${props.y}`}
        />
      )
    }
  }
  return (<>
    {boardContent}
    </>)
}