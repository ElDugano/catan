import { PlayerColorContext } from "./PlayerColorContext";
import { useState } from 'react'

export const PlayerColor = ({ children }) => {
  const [playerColor, setPlayerColor] = useState(["Blue", "Red", "Indigo", "Gold"]);
  

  function getAPlayersColor(player) {
    return playerColor[player];
  }

  function setAPlayersColor(player, color) {
    console.log("Need to write this logic.")
  }
  
  return (
      <PlayerColorContext.Provider value={{
          playerColor,
          getAPlayersColor,
          setAPlayersColor,
          setPlayerColor}}>
        {children}
      </PlayerColorContext.Provider>
  )
}