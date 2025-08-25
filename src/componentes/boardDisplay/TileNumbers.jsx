export default function TileNumbers({landTileNumbers}) {
  let boardContent=[];
  for (let tileNumber in landTileNumbers) {
    for (let key in landTileNumbers[tileNumber]) {
      let x =landTileNumbers[tileNumber][key]["x"];
      let y = landTileNumbers[tileNumber][key]["y"];
      let className="";
      let numberOfDots=Math.abs(Math.abs(7-tileNumber)-6);
      if(tileNumber == 6 || tileNumber == 8)
        className="bigNumber";
      //Likely we will push all of this into another group that can be identified to hide all of this, but it might not be needed.
     //boardContent.push(
     //  <text
     //    key={crypto.randomUUID()}
     //    x={x*30+30}
     //    y={y*50+40}
     //    className={className}
     //    textAnchor="middle">
     //      {tileNumber}
     //  </text>
     //);
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
              className={className}
            />}
            {numberOfDots>=2 &&
            <circle 
              r="1"
              cx={x*30+30+4}
              cy={y*50+45}
              className={className}
            />}
            {numberOfDots>=3 &&
            <circle 
              r="1"
              cx={x*30+30+8}
              cy={y*50+45}
              className={className}
            />}
            {numberOfDots>=4 &&
            <circle 
              r="1"
              cx={x*30+30+12}
              cy={y*50+45}
              className={className}
            />}
            {numberOfDots>=5 &&
            <circle 
              r="1"
              cx={x*30+30+16}
              cy={y*50+45}
              className={className}
            />}
        </g>
        </g>
      );
    }
  }
  return boardContent;
}