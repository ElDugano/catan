import { PlayerColorContext } from "./PlayerColorContext";
import { useState } from 'react'

export const PlayerColor = ({ children }) => {
  const [playerColor, setPlayerColor] = useState(["blue", "red", "indigo", "gold"]);
  
  return (
      <PlayerColorContext.Provider value={{
          playerColor,
          setPlayerColor}}>
        {children}
      </PlayerColorContext.Provider>
  )
}