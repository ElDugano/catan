import { PlayerAvailableBuildingsContext } from "./PlayerAvailableBuildingsContext";
import { useState } from 'react'

export const PlayerAvailableBuildings = ({ children }) => {
  const [playerAvailableBuildings, setPlayerAvailableBuildings] = useState([
    {settlements: 5, cities: 4, roads: 15},
    {settlements: 5, cities: 4, roads: 15},
    {settlements: 5, cities: 4, roads: 15},
    {settlements: 5, cities: 4, roads: 15}
  ]);

  //lastBuiltObject can be created as an array to track the whole building history of a game for the final scoreboard.
  const [lastBuiltObject, setLastBuiltObject] = useState({value: null, player:null,x: null, y: null});

  const removeRoadFromAvailableBuildings = (x,y, playerNumber) => {
    let newplayerAvailableBuildings = [...playerAvailableBuildings];
    newplayerAvailableBuildings[playerNumber].roads--;
    setPlayerAvailableBuildings(newplayerAvailableBuildings);
    setLastBuiltObject({value: "Road", player:playerNumber,x: x, y: y});
    return {playerAvailableBuildings:newplayerAvailableBuildings};
  }
  const removeSettlementFromAvailableBuildings = (x,y, playerNumber) => {
    let newplayerAvailableBuildings = [...playerAvailableBuildings];
    newplayerAvailableBuildings[playerNumber].settlements--;
    setPlayerAvailableBuildings(newplayerAvailableBuildings);
    setLastBuiltObject({value: "Settlement", player:playerNumber,x: x, y: y})
    return {playerAvailableBuildings:newplayerAvailableBuildings};
  }
  const removeCityFromAvailableBuildings = (x,y, playerNumber) => {
    let newplayerAvailableBuildings = [...playerAvailableBuildings];
    newplayerAvailableBuildings[playerNumber].cities--;
    newplayerAvailableBuildings[playerNumber].settlements++;
    setPlayerAvailableBuildings(newplayerAvailableBuildings);
    setLastBuiltObject({value: "City", player:playerNumber,x: x, y: y});
    return {playerAvailableBuildings:newplayerAvailableBuildings};
  }

  const returnAvailableRoads = (playerNumber) => {return playerAvailableBuildings[playerNumber].roads};
  const returnAvailableSettlements = (playerNumber) => {return playerAvailableBuildings[playerNumber].settlements};
  const returnAvailableCities = (playerNumber) => {return playerAvailableBuildings[playerNumber].cities};

  const returnUsedRoads = (playerNumber) => {return 15 - playerAvailableBuildings[playerNumber].roads};
  const returnUsedSettlements = (playerNumber) => {return 4 -playerAvailableBuildings[playerNumber].settlements};
  const returnUsedCities = (playerNumber) => {return 5 - playerAvailableBuildings[playerNumber].cities};

  const lastBuiltObjectCoordinantes = () => {return {x:lastBuiltObject.x, y:lastBuiltObject.y}}
  //const lastBuiltObjectPlayer = () => {return lastBuiltObject.player}
  //const lastBuiltObjectValue = () => {return lastBuiltObject.player}

  const [buildSettlementPlacementAvailable, setBuildSettlementPlacementAvailable] = useState(false);
  const [buildCityPlacementAvailable, setABuildCityPlacementAvailable] = useState(false);


  return (
      <PlayerAvailableBuildingsContext.Provider value={{
        playerAvailableBuildings,
        setPlayerAvailableBuildings,
        removeRoadFromAvailableBuildings,
        //removeRightRoadFromAvailableBuildings,
        //removeBottomRoadFromAvailableBuildings,
        removeSettlementFromAvailableBuildings,
        removeCityFromAvailableBuildings,
        returnAvailableRoads,
        returnAvailableSettlements,
        returnAvailableCities,
        returnUsedRoads,
        returnUsedSettlements,
        returnUsedCities,
        lastBuiltObjectCoordinantes,
        //lastBuiltObjectPlayer,
        lastBuiltObject,
        setLastBuiltObject,
        buildSettlementPlacementAvailable,
        setBuildSettlementPlacementAvailable,
        buildCityPlacementAvailable,
        setABuildCityPlacementAvailable
      }}>
        {children}
      </PlayerAvailableBuildingsContext.Provider>
  )
}