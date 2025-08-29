import { useContext } from "react";
import { ThiefLocationContext } from "./ThiefLocationContext.js";
import { LandTilesContext } from "../landTiles/LandTilesContext.js";
import { useState } from 'react'

export const ThiefLocation = ({ children }) => {
  const {desertLocation} = useContext(LandTilesContext);
  const [thiefLocation, setThiefLocation] = useState(desertLocation);

  return (
      <ThiefLocationContext.Provider value={{
        thiefLocation,
        setThiefLocation
      }}>
        {children}
      </ThiefLocationContext.Provider>
  )
}