import { PlayerColorContext } from "./PlayerColorContext";
import { useState } from 'react'

export const PlayerColor = ({ children }) => {
  const [playerColor, setPlayerColor] = useState(["", "", "", ""]);
  

  function getAPlayersColor(player) {
    return playerColor[player];
  }

  function setAPlayersColor(player, color) {
    let newPlayerColors = [...playerColor];
    newPlayerColors[player] = color;
    setPlayerColor(newPlayerColors);
    return {playerColor:newPlayerColors};
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