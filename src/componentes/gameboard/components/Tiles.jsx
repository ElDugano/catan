import { useContext } from "react";
import { LandTilesContext } from "../state/landTiles/LandTilesContext";

export default function Tiles() {
  const {landTiles} = useContext(LandTilesContext);

  let boardContent = [];
  for (let x=0; x<= 12; x+=1) {
    for (let y=0; y<= 6; y+=1) {
      if ((x+y)%2 == 1) {
        let translateValue = "translate(" + (x*30) + "," + (y*50) + ")";
        boardContent.push(
          <polygon 
            key={crypto.randomUUID()}
            id={"tile-x"+x+"-y"+y}
            className={typeof landTiles[x] != "undefined" && typeof landTiles[x][y] != "undefined" ? "hex  " + landTiles[x][y] : "hex"}
            points="30,70 60,50 60,20 30,0 0,20 0,50"
            transform={translateValue}
          />
        )
      }
    }
  }
  return boardContent;
}