import { useState } from "react";
import { LastBuiltObjectContext } from "./LastBuiltObjectContext";

export const LastBuiltObject = ({ children }) => {
  const [lastBuiltObject, setLastBuiltObject] = useState({value: null, player:null,x: null, y: null});

  const recordRightRoadBuilt = (player, x, y) => {setLastBuiltObject({value: "rightRoad", player:player,x: x, y: y})}
  const recordBottomRoadBuilt = (player, x, y) => {setLastBuiltObject({value: "bottomRoad", player:player,x: x, y: y})}
  const recordSettlementBuilt = (player, x, y) => {setLastBuiltObject({value: "settlement", player:player,x: x, y: y})}
  const recordCityBuilt = (player, x, y) => {setLastBuiltObject({value: "city", player:player,x: x, y: y})}
  const recordDevelopmentCardBuilt = (player, x, y) => {setLastBuiltObject({value: "development card", player:player,x: x, y: y})}


  return (
      <LastBuiltObjectContext.Provider value={{
        lastBuiltObject,
        recordSettlementBuilt,
        recordRightRoadBuilt,
        recordBottomRoadBuilt,
        recordCityBuilt,
        recordDevelopmentCardBuilt
      }}>
        {children}
      </LastBuiltObjectContext.Provider>
  )
}