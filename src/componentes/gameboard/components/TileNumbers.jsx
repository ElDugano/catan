import { useContext } from "react";
import { LandTileNumbersContext } from "../state/landTileNumbers/LandTileNumbersContext.js";

export default function TileNumbers() {
  const {landTileNumbers} = useContext(LandTileNumbersContext); 
  let boardContent=[];
  for (let tileNumber in landTileNumbers) {
    for (let key in landTileNumbers[tileNumber]) {
      let x =landTileNumbers[tileNumber][key]["x"];
      let y = landTileNumbers[tileNumber][key]["y"];
      let className="";
      let numberOfDots=Math.abs(Math.abs(7-tileNumber)-6);
      if(tileNumber == 6 || tileNumber == 8)
        className="bigNumber";
      boardContent.push(
        <g key={crypto.randomUUID()} className={className}>
          <text
            x={x*30+30}
            y={y*50+40}
            className={className}
            textAnchor="middle">
              {tileNumber}
          </text>
          <g transform={"translate(-"+(numberOfDots-1)*2+",0)"}>
            {numberOfDots>=1 &&
              <circle 
                r="1"
                cx={x*30+30}
                cy={y*50+45}
                className={"numberCircle "+className}
              />}
              {numberOfDots>=2 &&
              <circle 
                r="1"
                cx={x*30+30+4}
                cy={y*50+45}
                className={"numberCircle "+className}
              />}
              {numberOfDots>=3 &&
              <circle 
                r="1"
                cx={x*30+30+8}
                cy={y*50+45}
                className={"numberCircle "+className}
              />}
              {numberOfDots>=4 &&
              <circle 
                r="1"
                cx={x*30+30+12}
                cy={y*50+45}
                className={"numberCircle "+className}
              />}
              {numberOfDots>=5 &&
              <circle 
                r="1"
                cx={x*30+30+16}
                cy={y*50+45}
                className={"numberCircle "+className}
              />}
          </g>
        </g>
      );
    }
  }
  return boardContent;
}