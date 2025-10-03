import { useContext } from "react";
import { LandTileNumbersContext } from "../state/landTileNumbers/LandTileNumbersContext.js";

export default function HostTileNumbers() {
  const {landTileNumbers} = useContext(LandTileNumbersContext); 
  let boardContent=[];
  for (let tileNumber in landTileNumbers) {
    for (let key in landTileNumbers[tileNumber]) {
      let x =landTileNumbers[tileNumber][key]["x"];
      let y = landTileNumbers[tileNumber][key]["y"];
      let className="hostNumbers";
      let numberOfDots=Math.abs(Math.abs(7-tileNumber)-6);
      if(tileNumber == 6 || tileNumber == 8)
        className="hostNumbers bigNumber";
      boardContent.push(
        <g key={crypto.randomUUID()} className={className}>
          <text
            x={x*155+40}
            y={y*140+30}
            className={className}
            textAnchor="middle"
            fontSize={"80px"}>
              {tileNumber}
          </text>
          <g transform={"translate(-"+(numberOfDots-1)*7.5+",0)"}>
            {numberOfDots>=1 &&
              <circle 
                r="5"
                cx={x*155+40}
                cy={y*140+50}
                className={"numberCircle "+className}
              />}
              {numberOfDots>=2 &&
              <circle 
                r="5"
                cx={x*155+40+15}
                cy={y*140+50}
                className={"numberCircle "+className}
              />}
              {numberOfDots>=3 &&
              <circle 
                r="5"
                cx={x*155+40+30}
                cy={y*140+50}
                className={"numberCircle "+className}
              />}
              {numberOfDots>=4 &&
              <circle 
                r="5"
                cx={x*155+40+45}
                cy={y*140+50}
                className={"numberCircle "+className}
              />}
              {numberOfDots>=5 &&
              <circle 
                r="5"
                cx={x*155+40+60}
                cy={y*140+50}
                className={"numberCircle "+className}
              />}
          </g>
        </g>
      );
    }
  }
  return boardContent;
}