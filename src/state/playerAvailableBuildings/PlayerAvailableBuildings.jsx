import { PlayerAvailableBuildingsContext } from "./PlayerAvailableBuildingsContext";
import { useState } from 'react'

export const PlayerAvailableBuildings = ({ children }) => {
  const [playerAvailableBuildings, setPlayerAvailableBuildings] = useState([
    {settlements: 5, cities: 4, roads: 15},
    {settlements: 5, cities: 4, roads: 15},
    {settlements: 5, cities: 4, roads: 15},
    {settlements: 5, cities: 4, roads: 15}
  ]);

  const removeRoadFromAvailableBuildings = (playerNumber) => {
    let newplayerAvailableBuildings = [...playerAvailableBuildings];
    newplayerAvailableBuildings[playerNumber].roads--;
    setPlayerAvailableBuildings(newplayerAvailableBuildings);
  }
  const removeSettlementFromAvailableBuildings = (playerNumber) => {
    let newplayerAvailableBuildings = [...playerAvailableBuildings];
    newplayerAvailableBuildings[playerNumber].settlements--;
    console.log(newplayerAvailableBuildings[playerNumber].settlements);
    setPlayerAvailableBuildings(newplayerAvailableBuildings);
  }
  const removeCityFromAvailableBuildings = (playerNumber) => {
    let newplayerAvailableBuildings = [...playerAvailableBuildings];
    newplayerAvailableBuildings[playerNumber].cities--;
    newplayerAvailableBuildings[playerNumber].settlement++;
    setPlayerAvailableBuildings(newplayerAvailableBuildings);
  }

  return (
      <PlayerAvailableBuildingsContext.Provider value={{playerAvailableBuildings, removeRoadFromAvailableBuildings, removeSettlementFromAvailableBuildings, removeCityFromAvailableBuildings}}>
        {children}
      </PlayerAvailableBuildingsContext.Provider>
  )
}