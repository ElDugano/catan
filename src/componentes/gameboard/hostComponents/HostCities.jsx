import { useContext } from "react";
import { TileCornerNodesContext } from "../state/tileCornerNodes/TileCornerNodesContext";
import { PlayerInformationContext } from "../../../state/playerInformation/PlayerInformationContext";

//import cityImage from './assets/city/city.png'
import redSettlement from './assets/settlement/settlement-red.png'
import blueSettlement from './assets/settlement/settlement-blue.png'
import greenSettlement from './assets/settlement/settlement-green.png'
import indigoSettlement from './assets/settlement/settlement-indigo.png'
import yellowSettlement from './assets/settlement/settlement-yellow.png'
import orangeSettlement from './assets/settlement/settlement-orange.png'

import redCity from './assets/city/city-red.png'
import blueCity from './assets/city/city-blue.png'
import greenCity from './assets/city/city-green.png'
import indigoCity from './assets/city/city-indigo.png'
import yellowCity from './assets/city/city-yellow.png'
import orangeCity from './assets/city/city-orange.png'

export default function HostCities( props ) {
  const { tileCornerNodes } = useContext(TileCornerNodesContext);
  const { playerColor } = useContext(PlayerInformationContext);

  const cityArray = {
    Red: redCity,
    Blue: blueCity,
    Green: greenCity,
    Indigo: indigoCity,
    Yellow: yellowCity,
    Orange: orangeCity
  }

    const settlementArray = {
    Red: redSettlement,
    Blue: blueSettlement,
    Green: greenSettlement,
    Indigo: indigoSettlement,
    Yellow: yellowSettlement,
    Orange: orangeSettlement
  }

  let xMult = 0;
  let xAdjust = 0;
  let yOffset = 0;
  let yOddOffset = 0;
  switch (props.y) {
    case 1:
      xMult = 139;
      xAdjust = 90;
      yOffset = 55;
      yOddOffset = 0;
    break;
    case 2:
      xMult = 147;
      xAdjust = 45;
      yOffset = 208;
      yOddOffset = 158;
    break;
    case 3:
      xMult = 154;
      xAdjust = 0;
      yOffset = 348;
      yOddOffset = 300;
    break;
    case 4:
      xMult = 160;
      xAdjust = -30;
      yOffset = 490;
      yOddOffset = 440;
    break;
    case 5:
      xMult = 165;
      xAdjust = -66;
      yOffset = 625;
      yOddOffset = 576;
    break;
    case 6:
      xMult = 174;
      xAdjust = -116;
      yOffset = 780;
      yOddOffset = 720;
    break;
  }

  let boardContent = [];
  for (let x in tileCornerNodes) {
    if (tileCornerNodes[x][props.y].value == "settlement" || tileCornerNodes[x][props.y].value == "city") {
      let displayImage = tileCornerNodes[x][props.y].value == "settlement" ?
        settlementArray[playerColor[tileCornerNodes[x][props.y].owner]] :
        cityArray[playerColor[tileCornerNodes[x][props.y].owner]];
      let translateValue;
      if((parseInt(x)+parseInt(props.y)) % 2 == 0)
        translateValue = "translate(" + (x*xMult+xAdjust) + "," + (yOffset) + ")";
      else
        translateValue = "translate(" + (x*xMult+xAdjust) + "," + (yOddOffset) + ")";
      boardContent.push(
        <image
          key={crypto.randomUUID()}
          href={displayImage}
          transform={translateValue}
          width={'64'}
          height={'48'} />
      )
    }
  }

  return (<>
    {boardContent}
    </>)
}