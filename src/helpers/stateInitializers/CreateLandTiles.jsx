import Shuffle from '../Shuffle.jsx'

export default function CreateLandTiles(){
  console.log("*** createLandTiles was called. ***");
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