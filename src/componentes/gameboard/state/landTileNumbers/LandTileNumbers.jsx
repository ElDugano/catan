import { useState, useContext } from "react";
import { LandTileNumbersContext } from "./LandTileNumbersContext.js";
import { LandTilesContext } from "../landTiles/LandTilesContext.js";
import Shuffle from '../../../../helpers/Shuffle.jsx'

export const LandTileNumbers = ({ children }) => {
  const {desertLocation} = useContext(LandTilesContext);
  const [landTileNumbers, setLandTileNumbers] = useState(CreateLandTileNumbers);

  function CreateLandTileNumbers(){
    const availableNumbers = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12];
    let landTileNumbers={
      2:{1:{x:"",y:""}},
      3:{1:{x:"",y:""},2:{x:"",y:""}},
      4:{1:{x:"",y:""},2:{x:"",y:""}},
      5:{1:{x:"",y:""},2:{x:"",y:""}},
      6:{1:{x:"",y:""},2:{x:"",y:""}},
      8:{1:{x:"",y:""},2:{x:"",y:""}},
      9:{1:{x:"",y:""},2:{x:"",y:""}},
      10:{1:{x:"",y:""},2:{x:"",y:""}},
      11:{1:{x:"",y:""},2:{x:"",y:""}},
      12:{1:{x:"",y:""}}
    };
    const landTileCoordinates = [
      [2,3],
      [3,2],[3,4],
      [4,1],[4,3],[4,5],
      [5,2],[5,4],
      [6,1],[6,3],[6,5],
      [7,2],[7,4],
      [8,1],[8,3],[8,5],
      [9,2],[9,4],
      [10,3]];
    Shuffle(landTileCoordinates);
    while (landTileCoordinates.length > 0) {
      if(landTileCoordinates[0][0] != desertLocation.x || landTileCoordinates[0][1] != desertLocation.y){
        if (landTileNumbers[availableNumbers[0]][1]['x'] == "" ) {
          landTileNumbers[availableNumbers[0]][1]['x'] = landTileCoordinates[0][0];
          landTileNumbers[availableNumbers[0]][1]['y'] = landTileCoordinates[0][1];
        }
        else {
          landTileNumbers[availableNumbers[0]][2]['x'] = landTileCoordinates[0][0];
          landTileNumbers[availableNumbers[0]][2]['y'] = landTileCoordinates[0][1];
        }
        availableNumbers.shift();
      }
      landTileCoordinates.shift();
    }

    return landTileNumbers;
  }

  return (
      <LandTileNumbersContext.Provider value={{
        landTileNumbers,
        setLandTileNumbers
      }}>
        {children}
      </LandTileNumbersContext.Provider>
  )
}