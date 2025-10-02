import { useContext, useEffect, useState } from "react";
import { LandTilesContext } from "../state/landTiles/LandTilesContext";

export default function HostTiles( props ) {
  const { landTiles } = useContext(LandTilesContext);

  const [tileImages, setTileImages] = useState([null,null,null,null,null]);

  useEffect(() => {
    const loadImages = async () => {

      let imagePath = [];
      for (let x in landTiles) {
        if (props.y in landTiles[x] && landTiles[x][props.y] != "Desert") {
          const fileName=landTiles[x][props.y].toLowerCase()+"-x"+x+"-y"+props.y;
          imagePath.push('./assets/'+landTiles[x][props.y].toLowerCase()+'Tiles/'+fileName+'.png');
        }
      }
      const importedImages = await Promise.all(
        imagePath.map(async (path) => {
          const image = await import(path);
          return image.default; // Use image.default to get the URL
        })
      );
      setTileImages(importedImages);
    };

    loadImages();
  }, [landTiles, props.y])

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

  let tileNumber = 0;
  for (let x in landTiles) {
    let translateValue = "translate(" + (x*xMult-xAdjust) + "," + (yOffset) + ")";
    if (props.y in landTiles[x]){
      boardContent.push(
        <image
          key={crypto.randomUUID()}
          href={tileImages[tileNumber]}
          transform={translateValue}
          width={'400'}
          height={'208'}
        />
      )
      tileNumber++;
    }
  }
  return (<>
    {boardContent}
    </>)
}

  //      <polygon 
  //        key={crypto.randomUUID()}
  //        className={typeof landTiles[x] != "undefined" && typeof landTiles[x][props.y] != "undefined" ? "hex  " + landTiles[x][props.y] : "hex"}
  //        points="30,70 60,50 60,20 30,0 0,20 0,50"
  //        transform={translateValue}
  //      />