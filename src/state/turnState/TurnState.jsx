import { useState } from 'react'
import { TurnStateContext } from './TurnStateContext.js';

export const TurnState = ({ children }) => {
  const [turnState, setTurnState] = useState("building a settlement");
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

    const isTurnStateRollingTheDice = () => {return turnState == "rolling the dice" ? true : false};
    const setTurnStateToRollingTheDice = () =>     {setTurnState("rolling the dice")};

    const isTurnStateGatheringResources = () => {return turnState == "gathering resources" ? true : false};
    const setTurnStateToGatheringResources = () =>     {setTurnState("gathering resources")};

    const isTurnStateIdle = () => {return turnState == "idle" ? true : false};
    const setTurnStateToIdle = () =>     {setTurnState("idle")};

    //const isTurnState = () => {return turnState == "" ? true : false};
    //const setTurnStateTo = () =>     {setTurnState("")};

  return (
      <TurnStateContext.Provider value={{turnState, setTurnState, 
        isTurnStateBuildingARoad,
        setTurnStateToBuildingARoad,
        isTurnStateBuildingASettlement,
        setTurnStateToBuildingASettlement,
        isTurnStateBuildingACity,
        setTurnStateToBuildingACity,
        isTurnStateRollingTheDice,
        setTurnStateToRollingTheDice,
        isTurnStateGatheringResources,
        setTurnStateToGatheringResources,
        isTurnStateIdle,
        setTurnStateToIdle
      }}>
        {children}
      </TurnStateContext.Provider>
  )
}