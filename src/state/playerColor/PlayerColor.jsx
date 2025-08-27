import { PlayerColorContext } from "./PlayerColorContext";
import { useState } from 'react'

export const PlayerColor = ({ children }) => {
  const [playerColor, setPlayerColor] = useState(["blue", "red", "green"]);

  const setPlayerColorTo= (playerNumber, color) => {
    let newPlayerColor = [...playerColor];
    newPlayerColor[playerNumber]=color;
    setPlayerColor(newPlayerColor);
    //setPlayerColor();
  }
  
  return (
      <PlayerColorContext.Provider value={{playerColor, setPlayerColorTo}}>
        {children}
      </PlayerColorContext.Provider>
  )
}