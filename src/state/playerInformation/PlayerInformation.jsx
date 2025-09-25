import { PlayerInformationContext } from "./PlayerInformationContext";
import { useState } from 'react'

export const PlayerInformation = ({ children }) => {
  const [playerColor, setPlayerColor] = useState(["", "", "", ""]);
  const [playerName, setPlayerName] = useState(["", "", "", ""]);
  
  const setAPlayerName = (player, name) => {
    let newPlayerName = [...playerName];
    newPlayerName[player] = name;
    setPlayerName(newPlayerName);
    console.log(newPlayerName);
    return {playerName:newPlayerName};
  }

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
      <PlayerInformationContext.Provider value={{
          playerColor,
          getAPlayersColor,
          setAPlayersColor,
          setPlayerColor,
          playerName,
          setPlayerName,
          setAPlayerName
        }}>
        {children}
      </PlayerInformationContext.Provider>
  )
}