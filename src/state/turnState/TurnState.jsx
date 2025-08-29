import { useState } from 'react'
import { TurnStateContext } from './TurnStateContext.js';

export const TurnState = ({ children }) => {
  const [turnState, setTurnState] = useState("Building a settlement");

    //Turn Start
    const isTurnStateRollingTheDice = () => {return turnState == "Rolling the dice" ? true : false};
    const setTurnStateToRollingTheDice = () =>     {setTurnState("Rolling the dice")};
    const isTurnStateGatheringResources = () => {return turnState == "Gathering resources" ? true : false};
    const setTurnStateToGatheringResources = () =>     {setTurnState("Gathering resources")};
    //Thief Related
    const isTurnStateRemoveHalfResources = () => {return turnState == "Remove half resources" ? true : false};
    const setTurnStateToRemoveHalfResources = () =>     {setTurnState("Remove half resources")};
    const isTurnStateMoveTheThief = () => {return turnState == "Move the thief" ? true : false};
    const setTurnStateToMoveTheThief = () =>     {setTurnState("Move the thief")};
    const isTurnStatePillageResourceCard = () => {return turnState == "Pillage resource card" ? true : false};
    const setTurnStateToPillageResourceCard = () =>     {setTurnState("Pillage resource card")};
    //Main Turn
    const isTurnStateIdle = () => {return turnState == "idle" ? true : false};
    const setTurnStateToIdle = () =>     {setTurnState("idle")};
    //Building Related
    const isTurnStateBuildingARoad = () => {return turnState == "Building a road" ? true : false};
    const setTurnStateToBuildingARoad = () =>     {setTurnState("Building a road")};
    const isTurnStateBuildingASettlement = () => {return turnState == "Building a settlement" ? true : false};
    const setTurnStateToBuildingASettlement = () =>     {setTurnState("Building a settlement")};
    const isTurnStateBuildingACity = () => {return turnState == "Building a city" ? true : false};
    const setTurnStateToBuildingACity = () =>     {setTurnState("Building a city")};
    const isTurnStateBuyingDevelopmentCard = () => {return turnState == "Buying Development Card" ? true : false};
    const setTurnStateToBuyingDevelopmentCard = () =>     {setTurnState("Buying Development Card")};
      //These all will likely want some sort of confirmation state to make sure the player picked the right spot.
    //Playing Development Card
    //Playing Development Card


  return (
      <TurnStateContext.Provider value={{
      //Turn Start
        isTurnStateRollingTheDice,
        setTurnStateToRollingTheDice,
        isTurnStateGatheringResources,
        setTurnStateToGatheringResources,
      //Thief Related
        isTurnStateRemoveHalfResources,
        setTurnStateToRemoveHalfResources,
        isTurnStateMoveTheThief,
        setTurnStateToMoveTheThief,
        isTurnStatePillageResourceCard,
        setTurnStateToPillageResourceCard,
      //Main Turn
        isTurnStateIdle,
        setTurnStateToIdle,
      //Building Related
        isTurnStateBuildingARoad,
        setTurnStateToBuildingARoad,
        isTurnStateBuildingASettlement,
        setTurnStateToBuildingASettlement,
        isTurnStateBuildingACity,
        setTurnStateToBuildingACity,
        isTurnStateBuyingDevelopmentCard,
        setTurnStateToBuyingDevelopmentCard,
        turnState
      }}>
        {children}
      </TurnStateContext.Provider>
  )
}