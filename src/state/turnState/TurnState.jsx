import { useState } from 'react'
import { TurnStateContext } from './TurnStateContext.js';

export const TurnState = ({ children }) => {
  const [turnState, setTurnState] = useState("building a settlement");
    //rolling dice
    //idle
      //buying a development card?
      //playing a development card?
        //playing a _____ card [monopoly, year of plenty,etc]
    //placing thief
    //stealing resources
    //removing half resources

    const isTurnStateBuildingARoad = () => {return turnState == "building a road" ? true : false};
    const setTurnStateToBuildingARoad = () =>     {setTurnState("building a road")};

    const isTurnStateBuildingASettlement = () => {return turnState == "building a settlement" ? true : false};
    const setTurnStateToBuildingASettlement = () =>     {setTurnState("building a settlement")};

    const isTurnStateBuildingACity = () => {return turnState == "building a city" ? true : false};
    const setTurnStateToBuildingACity = () =>     {setTurnState("building a city")};

  return (
      <TurnStateContext.Provider value={{turnState, setTurnState, 
        isTurnStateBuildingARoad,
        setTurnStateToBuildingARoad,
        isTurnStateBuildingASettlement,
        setTurnStateToBuildingASettlement,
        isTurnStateBuildingACity,
        setTurnStateToBuildingACity
      }}>
        {children}
      </TurnStateContext.Provider>
  )
}