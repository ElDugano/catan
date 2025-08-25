export default function Tiles({landTiles}) {
  let boardContent = [];
  for (let x=0; x<= 12; x+=2) {
    for (let y=1; y<= 5; y+=2) {
      let translateValue = "translate(" + (x*30) + "," + (y*50) + ")";
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
      let translateValue = "translate(" + (x*30) + "," + (y*50) + ")";
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
  return boardContent;
}