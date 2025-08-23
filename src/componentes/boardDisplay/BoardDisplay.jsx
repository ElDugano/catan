export default function BoardDisplay({landTiles, landTileNumbers}) {
  const defaultX = 10;
  const defaultY = 10;
  let boardContent = [];
  console.log("here we go again");
  console.log(landTileNumbers);
  for (let x=0; x<= 12; x+=2) {
    for (let y=1; y<= 5; y+=2) {
      let translateValue = "translate(" + (defaultX + 30*x) + "," + (defaultY + 50 * y) + ")";
      boardContent.push(
        <polygon 
          key={Math.random()}
          id={"tile-x"+x+"-y"+y}
          className={typeof landTiles[x] != "undefined" && typeof landTiles[x][y] != "undefined" ? "hex  " + landTiles[x][y] : "hex"}
          points="30,70 60,50 60,20 30,0 0,20 0,50"
          transform={translateValue}
        />
      )
    }
  }

  for (let x=1; x<= 11; x+=2) {
    for (let y=0; y<= 6; y+=2) {
      let translateValue = "translate(" + (defaultX + 30*x) + "," + (defaultY + 50 * y) + ")";
      boardContent.push(
        <polygon
          key={Math.random()}
          id={"tile-x"+x+"-y"+y}
          className={typeof landTiles[x] != "undefined" && typeof landTiles[x][y] != "undefined" ? "hex  " + landTiles[x][y] : "hex"}
          points="30,70 60,50 60,20 30,0 0,20 0,50"
          transform={translateValue}
        />
      )
    }
  }

  //Display the numbers
  for (let tileNumber in landTileNumbers) {
    for (let key in landTileNumbers[tileNumber]) {
      let x =landTileNumbers[tileNumber][key]["x"];
      let y = landTileNumbers[tileNumber][key]["y"];
      let className="";
      if(tileNumber == 6 || tileNumber == 8) {
        className="bigNumber"
      }
      boardContent.push(
        <text key={Math.random()} x={defaultX + 30*x + 30}  y={defaultY + 50 * y + 40} className={className} textAnchor="middle">{tileNumber}</text>
      ) 
    }
  }

  return (
    <svg className="hex-grid" viewBox="0 0 440 440">
      {boardContent}
    </svg>
  )
}