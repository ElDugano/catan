import { useState } from 'react'
import { TurnStateContext } from './TurnStateContext.js';

export const TurnState = ({ children }) => {
  const [turnState, setTurnState] = useState("Idle");

    //---------- Turn Start ----------//
    const isTurnStateStartTurn = () =>        {return turnState == "Start Turn" ? true : false};
    const setTurnStateToStartTurn = () =>            {setTurnState("Start Turn"); 
                                                 return {turnState:"Start Turn"};};
    const isTurnStateRollingTheDice = () => {return turnState == "Rolling the dice" ? true : false};
    const setTurnStateToRollingTheDice = () =>     {setTurnState("Rolling the dice");
                                                return {turnState:"Rolling the dice"};};
    const isTurnStateGatheringResources = () => {return turnState == "Gathering resources" ? true : false};
    const setTurnStateToGatheringResources = () =>     {setTurnState("Gathering resources");
                                                  return {turnState:"Gathering resources"};};
    const isTurnStateGatheringResourcesAcknowledgement = () => {return turnState == "Gathering resources Acknowledgement" ? true : false};
    const setTurnStateToGatheringResourcescAknowledgement = () =>     {setTurnState("Gathering resources Acknowledgement");
                                                                  return {turnState:"Gathering resources Acknowledgement"};};
    //---------- Thief Related ----------//
    const isTurnStateRemoveHalfResources = () => {return turnState == "Remove half resources" ? true : false};
    const setTurnStateToRemoveHalfResources = () =>     {setTurnState("Remove half resources");
                                                    return {turnState:"Remove half resources"};};
    const isTurnStateMoveTheThief = () => {return turnState == "Move the thief" ? true : false};
    const setTurnStateToMoveTheThief = () =>     {setTurnState("Move the thief");
                                             return {turnState:"Move the thief"};};
    const isTurnStateRobAPlayer = () => {return turnState == "Rob a player" ? true : false};
    const setTurnStateToRobAPlayer = () =>     {setTurnState("Rob a player");
                                                    return {turnState:"Rob a player"};};
    //---------- Main Turn ----------//
    const isTurnStateIdle = () => {return turnState == "Idle" ? true : false};
    const setTurnStateToIdle = () =>     {setTurnState("Idle");
                                     return {turnState:"Idle"};};
    const setClientTurnStateToIdle = () => {return {turnState:"Idle"}}; //Should we remove these, and just have set only return?
    //---------- Building Related ----------//
    const isTurnStateBuildMenu = () => {return turnState == "BuildMenu" ? true : false};
    const setTurnStateToBuildMenu = () =>     {setTurnState("BuildMenu");
                                          return {turnState:"BuildMenu"};};
    
    const isClientTurnStateBuildingARoad = (clientTurnState) => {
                                      return clientTurnState == "Building a road" ? true : false};
    const setClientTurnStateToBuildingARoad = () => {return {turnState:"Building a road"}};
    const isTurnStateBuildingARoad = () => {return turnState == "Building a road" ? true : false};
    const setTurnStateToBuildingARoad = () =>     {setTurnState("Building a road");
                                              return {turnState:"Building a road"};};
      const isTurnStateBuildingARoadLongestRoadCheck = () => {return turnState == "Building a road Longest Road Check" ? true : false};
      const setTurnStateToBuildingARoadLongestRoadCheck = () =>     {setTurnState("Building a road Longest Road Check");
                                                                return {turnState:"Building a road Longest Road Check"};};
    const setClientTurnStateToBuildingASettlement = () => {return {turnState:"Building a settlement"}};
    const isTurnStateBuildingASettlement = () => {return turnState == "Building a settlement" ? true : false};
    const setTurnStateToBuildingASettlement = () =>     {setTurnState("Building a settlement");
                                                    return {turnState:"Building a settlement"};};
    const isTurnStateBuildingACity = () => {return turnState == "Building a city" ? true : false};
    const setTurnStateToBuildingACity = () =>     {setTurnState("Building a city");
                                              return {turnState:"Building a city"};};
    const isTurnStateConfirmBuyingDevelopmentCard = () => {return turnState == "Confirm Buying Development Card" ? true : false};
    const setTurnStateToConfirmBuyingDevelopmentCard = () =>     {setTurnState("Confirm Buying Development Card");
                                                             return {turnState:"Confirm Buying Development Card"};};
    //---------- Development Card Related ----------//
    const isTurnStateSelectingADevelopmentCard = () => {return turnState == "Selecting a Development Card" ? true : false};
    const setTurnStateToSelectingADevelopmentCard = () =>     {setTurnState("Selecting a Development Card");
                                                          return {turnState:"Selecting a Development Card"};};
      //----- Knight Card
      const isTurnStateConfirmPlayKnightDevelopmentCard = () => {return turnState == "Confirm Play Knight Development Card" ? true : false};
      const setTurnStateToConfirmPlayKnightDevelopmentCard = () =>     {setTurnState("Confirm Play Knight Development Card");
                                                                   return {turnState:"Confirm Play Knight Development Card"};};
      //----- Road Builder Card
      const isTurnStateConfirmPlayRoadBuilderDevelopmentCard = () => {return turnState == "Play Road Builder Development Card" ? true : false};
      const setTurnStateToConfirmPlayRoadBuilderDevelopmentCard = () =>     {setTurnState("Play Road Builder Development Card");
                                                                        return {turnState:"Play Road Builder Development Card"};};
      const isClientStateRoadBuilderCardFirstRoad = (clientTurnState) => {
                                                   return clientTurnState == "Road Builder Card First Road" ? true : false};
      const isTurnStateRoadBuilderCardFirstRoad = () => {return turnState == "Road Builder Card First Road" ? true : false};
      const setTurnStateToRoadBuilderCardFirstRoad = () =>     {setTurnState("Road Builder Card First Road");
                                                           return {turnState:"Road Builder Card First Road"};};
        const isTurnStateRoadBuilderCardFirstRoadLongestRoadCheck = () => {return turnState == "Road Builder Card First Road Longest Road Check" ? true : false};
        const setTurnStateToRoadBuilderCardFirstRoadLongestRoadCheck = () =>     {setTurnState("Road Builder Card First Road Longest Road Check");
                                                                             return {turnState:"Road Builder Card First Road Longest Road Check"};};
      const isClientStateRoadBuilderCardSecondRoad = (clientTurnState) => {
                                                    return clientTurnState == "Road Builder Card Second Road" ? true : false};
      const isTurnStateRoadBuilderCardSecondRoad = () => {return turnState == "Road Builder Card Second Road" ? true : false};
      const setTurnStateToRoadBuilderCardSecondRoad = () =>     {setTurnState("Road Builder Card Second Road");
                                                           return {turnState:"Road Builder Card Second Road"};};
        const isTurnStateRoadBuilderCardSecondRoadLongestRoadCheck = () => {return turnState == "Road Builder Card Second Road Longest Road Check" ? true : false};
        const setTurnStateToRoadBuilderCarSecondRoadLongestRoadCheck = () =>     {setTurnState("Road Builder Card Second Road Longest Road Check");
                                                                             return {turnState:"Road Builder Card Second Road Longest Road Check"};};
      //----- Year of Plenty Card
      const isTurnStateConfirmPlayYearOfPlentyDevelopmentCard = () => {return turnState == "Play Year Of Plenty Development Card" ? true : false};
      const setTurnStateToConfirmPlayYearOfPlentyDevelopmentCard = () =>     {setTurnState("Play Year Of Plenty Development Card");
                                                                         return {turnState:"Play Year Of Plenty Development Card"};};
      const isTurnStateYearOfPlenty = () => {return turnState == "Year of Plenty" ? true : false};
      const setTurnStateToYearOfPlenty = () =>     {setTurnState("Year of Plenty");
                                               return {turnState:"Year of Plenty"};};
      //----- Monopoly Card
      const isTurnStateConfirmPlayMonopolyDevelopmentCard = () => {return turnState == "Play Monopoly Development Card" ? true : false};
      const setTurnStateToConfirmPlayMonopolyDevelopmentCard = () =>     {setTurnState("Play Monopoly Development Card");
                                                                     return {turnState:"Play Monopoly Development Card"};};
      const isTurnStateMonopoly = () => {return turnState == "Monopoly" ? true : false};
      const setTurnStateToMonopoly = () =>     {setTurnState("Monopoly");
                                           return {turnState:"Monopoly"};};
    //---------- Trading Related ----------//
    const isTurnStateTradingWithTheBoard = () => {return turnState == "Trading With The Board" ? true : false};
    const setTurnStateToTradingWithTheBoard = () =>     {setTurnState("Trading With The Board");
                                                    return {turnState:"Trading With The Board"};};

    //const isTurnState = () => {return turnState == "" ? true : false};
    //const setTurnStateTo = () =>     {setTurnState("")};

    const isTurnStateLongestRoadCheck = () => {
      if( isTurnStateBuildingARoadLongestRoadCheck() ||
        isTurnStateRoadBuilderCardFirstRoadLongestRoadCheck() ||
        isTurnStateRoadBuilderCardSecondRoadLongestRoadCheck())
        return true;
      return false;
    }


  return (
    <TurnStateContext.Provider value={{
    //---------- Turn Start ----------//
      isTurnStateStartTurn,
      setTurnStateToStartTurn,
      isTurnStateRollingTheDice,
      setTurnStateToRollingTheDice,
      isTurnStateGatheringResources,
      setTurnStateToGatheringResources,
      isTurnStateGatheringResourcesAcknowledgement,
      setTurnStateToGatheringResourcescAknowledgement,
    //---------- Thief Related ----------//
      isTurnStateRemoveHalfResources,
      setTurnStateToRemoveHalfResources,
      isTurnStateMoveTheThief,
      setTurnStateToMoveTheThief,
      isTurnStateRobAPlayer,
      setTurnStateToRobAPlayer,
    //---------- Main Turn ----------//
      isTurnStateIdle,
      setTurnStateToIdle,
      setClientTurnStateToIdle,
    //---------- Building Related ----------//
      isTurnStateBuildMenu,
      setTurnStateToBuildMenu,
      isTurnStateBuildingARoad,
      setTurnStateToBuildingARoad,
        isClientTurnStateBuildingARoad,
        setClientTurnStateToBuildingARoad,
        isTurnStateBuildingARoadLongestRoadCheck,
        setTurnStateToBuildingARoadLongestRoadCheck,
      isTurnStateBuildingASettlement,
      setTurnStateToBuildingASettlement,
      setClientTurnStateToBuildingASettlement,
      isTurnStateBuildingACity,
      setTurnStateToBuildingACity,
      isTurnStateConfirmBuyingDevelopmentCard,
      setTurnStateToConfirmBuyingDevelopmentCard,
      //---------- Development Card Related ----------//
      isTurnStateSelectingADevelopmentCard,
      setTurnStateToSelectingADevelopmentCard,
        //----- Knight Card
        isTurnStateConfirmPlayKnightDevelopmentCard,
        setTurnStateToConfirmPlayKnightDevelopmentCard,
        //----- Road Builder Card
        isTurnStateConfirmPlayRoadBuilderDevelopmentCard,
        setTurnStateToConfirmPlayRoadBuilderDevelopmentCard,
        isTurnStateRoadBuilderCardFirstRoad,
          isClientStateRoadBuilderCardFirstRoad,
        setTurnStateToRoadBuilderCardFirstRoad,
          setTurnStateToRoadBuilderCardFirstRoadLongestRoadCheck,
          isTurnStateRoadBuilderCardFirstRoadLongestRoadCheck,
        isTurnStateRoadBuilderCardSecondRoad,
          isClientStateRoadBuilderCardSecondRoad,
        setTurnStateToRoadBuilderCardSecondRoad,
          setTurnStateToRoadBuilderCarSecondRoadLongestRoadCheck,
          isTurnStateRoadBuilderCardSecondRoadLongestRoadCheck,
        //----- Year of Plenty Card
        isTurnStateConfirmPlayYearOfPlentyDevelopmentCard,
        setTurnStateToConfirmPlayYearOfPlentyDevelopmentCard,
        isTurnStateYearOfPlenty,
        setTurnStateToYearOfPlenty,
        //----- Monopoly Card
        isTurnStateConfirmPlayMonopolyDevelopmentCard,
        setTurnStateToConfirmPlayMonopolyDevelopmentCard,
        isTurnStateMonopoly,
        setTurnStateToMonopoly,
      //---------- Trading Related ----------//
      isTurnStateTradingWithTheBoard,
      setTurnStateToTradingWithTheBoard,
      //----- Extra Checks for readability -----//
      isTurnStateLongestRoadCheck,
      turnState,
      setTurnState
    }}>
      {children}
    </TurnStateContext.Provider>
  )
}