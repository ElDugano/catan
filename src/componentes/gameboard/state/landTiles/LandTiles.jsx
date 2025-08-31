import { LandTilesContext } from "./LandTilesContext.js";
import { useState } from 'react'
import  Shuffle  from '../../../../helpers/Shuffle.jsx'

export const LandTiles = ({ children }) => {
  const [landTiles, setLandTiles] = useState(CreateLandTiles);
  const [desertLocation/*, setDesertLocation*/] = useState(FindDesert);

function CreateLandTiles(){
  let availableLandTileResource = [
    "Pasture","Pasture","Pasture","Pasture",
    "Forest","Forest","Forest","Forest",
    "Fields","Fields","Fields","Fields",
    "Hills","Hills","Hills",
    "Mountains","Mountains","Mountains",
    "Desert"
  ]
  Shuffle(availableLandTileResource);
  const landTiles = {
    2:{
      3:availableLandTileResource.pop()
    },
    3:{
      2:availableLandTileResource.pop(),
      4:availableLandTileResource.pop()
    },
    4:{
      1:availableLandTileResource.pop(),
      3:availableLandTileResource.pop(),
      5:availableLandTileResource.pop()
    },
    5:{
      2:availableLandTileResource.pop(),
      4:availableLandTileResource.pop()
    },
    6:{
      1:availableLandTileResource.pop(),
      3:availableLandTileResource.pop(),
      5:availableLandTileResource.pop()
    },
    7:{
      2:availableLandTileResource.pop(),
      4:availableLandTileResource.pop()
    },
    8:{
      1:availableLandTileResource.pop(),
      3:availableLandTileResource.pop(),
      5:availableLandTileResource.pop()
    },
    9:{
      2:availableLandTileResource.pop(),
      4:availableLandTileResource.pop()
    },
    10:{
      3:availableLandTileResource.pop()
    },
  }
  return landTiles;
}

function FindDesert() {
  for (let xCoordinate in landTiles) {
    for (let yCoordinate in landTiles[xCoordinate]) {
      if (landTiles[xCoordinate][yCoordinate] == "Desert")
      {
        return {x: xCoordinate, y: yCoordinate};
      }
    }
  }
}

  return (
      <LandTilesContext.Provider value={{
        landTiles,
        setLandTiles,
        desertLocation
      }}>
        {children}
      </LandTilesContext.Provider>
  )
}