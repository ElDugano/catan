import { useState } from 'react'
import { TurnStateContext } from './TurnStateContext.js';

export const TurnState = ({ children }) => {
  const [turnState, setTurnState] = useState("Building a settlement");

    //---------- Turn Start ----------//
    const isTurnStateStartTurn = () => {return turnState == "Start Turn" ? true : false};
    const setTurnStateToStartTurn = () =>     {setTurnState("Start Turn")};
    const isTurnStateRollingTheDice = () => {return turnState == "Rolling the dice" ? true : false};
    const setTurnStateToRollingTheDice = () =>     {setTurnState("Rolling the dice")};
    const isTurnStateGatheringResources = () => {return turnState == "Gathering resources" ? true : false};
    const setTurnStateToGatheringResources = () =>     {setTurnState("Gathering resources")};
    const isTurnStateGatheringResourcesAcknowledgement = () => {return turnState == "Gathering resources Acknowledgement" ? true : false};
    const setTurnStateToGatheringResourcescAknowledgement = () =>     {setTurnState("Gathering resources Acknowledgement")};
    //---------- Thief Related ----------//
    const isTurnStateRemoveHalfResources = () => {return turnState == "Remove half resources" ? true : false};
    const setTurnStateToRemoveHalfResources = () =>     {setTurnState("Remove half resources")};
    const isTurnStateMoveTheThief = () => {return turnState == "Move the thief" ? true : false};
    const setTurnStateToMoveTheThief = () =>     {setTurnState("Move the thief")};
    const isTurnStatePillageResourceCard = () => {return turnState == "Pillage resource card" ? true : false};
    const setTurnStateToPillageResourceCard = () =>     {setTurnState("Pillage resource card")};
    //---------- Main Turn ----------//
    const isTurnStateIdle = () => {return turnState == "idle" ? true : false};
    const setTurnStateToIdle = () =>     {setTurnState("idle")};
    //---------- Building Related ----------//
    const isTurnStateBuildMenu = () => {return turnState == "BuildMenu" ? true : false};
    const setTurnStateToBuildMenu = () =>     {setTurnState("BuildMenu")};
    const isTurnStateBuildingARoad = () => {return turnState == "Building a road" ? true : false};
    const setTurnStateToBuildingARoad = () =>     {setTurnState("Building a road")};
      const isTurnStateBuildingARoadLongestRoadCheck = () => {return turnState == "Building a road Longest Road Check" ? true : false};
      const setTurnStateToBuildingARoadLongestRoadCheck = () =>     {setTurnState("Building a road Longest Road Check")};
    const isTurnStateBuildingASettlement = () => {return turnState == "Building a settlement" ? true : false};
    const setTurnStateToBuildingASettlement = () =>     {setTurnState("Building a settlement")};
    const isTurnStateBuildingACity = () => {return turnState == "Building a city" ? true : false};
    const setTurnStateToBuildingACity = () =>     {setTurnState("Building a city")};
    const isTurnStateConfirmBuyingDevelopmentCard = () => {return turnState == "Confirm Buying Development Card" ? true : false};
    const setTurnStateToConfirmBuyingDevelopmentCard = () =>     {setTurnState("Confirm Buying Development Card")};
    //---------- Development Card Related ----------//
    const isTurnStateSelectingADevelopmentCard = () => {return turnState == "Selecting a Development Card" ? true : false};
    const setTurnStateToSelectingADevelopmentCard = () =>     {setTurnState("Selecting a Development Card")};
      //----- Knight Card
      const isTurnStateConfirmPlayKnightDevelopmentCard = () => {return turnState == "Confirm Play Knight Development Card" ? true : false};
      const setTurnStateToConfirmPlayKnightDevelopmentCard = () =>     {setTurnState("Confirm Play Knight Development Card")};
      //----- Road Builder Card
      const isTurnStateConfirmPlayRoadBuilderDevelopmentCard = () => {return turnState == "Play Road Builder Development Card" ? true : false};
      const setTurnStateToConfirmPlayRoadBuilderDevelopmentCard = () =>     {setTurnState("Play Road Builder Development Card")};
      const setTurnStateToRoadBuilderCardFirstRoad = () =>     {setTurnState("Road Builder Card First Road")};
      const isTurnStateRoadBuilderCardFirstRoad = () => {return turnState == "Road Builder Card First Road" ? true : false};
        const setTurnStateToRoadBuilderCardFirstRoadLongestRoadCheck = () =>     {setTurnState("Road Builder Card First Road Longest Road Check")};
        const isTurnStateRoadBuilderCardFirstRoadLongestRoadCheck = () => {return turnState == "Road Builder Card First Road Longest Road Check" ? true : false};
      const setTurnStateToRoadBuilderCarSecondRoad = () =>     {setTurnState("Road Builder Card Second Road")};
      const isTurnStateRoadBuilderCardSecondRoad = () => {return turnState == "Road Builder Card Second Road" ? true : false};
        const setTurnStateToRoadBuilderCarSecondRoadLongestRoadCheck = () =>     {setTurnState("Road Builder Card Second Road Longest Road Check")};
        const isTurnStateRoadBuilderCardSecondRoadLongestRoadCheck = () => {return turnState == "Road Builder Card Second Road Longest Road Check" ? true : false};
      //----- Year of Plenty Card
      const isTurnStateConfirmPlayYearOfPlentyDevelopmentCard = () => {return turnState == "Play Year Of Plenty Development Card" ? true : false};
      const setTurnStateToConfirmPlayYearOfPlentyDevelopmentCard = () =>     {setTurnState("Play Year Of Plenty Development Card")};
      const isTurnStateYearOfPlenty = () => {return turnState == "Year of Plenty" ? true : false};
      const setTurnStateToYearOfPlenty = () =>     {setTurnState("Year of Plenty")};
      //----- Monopoly Card
      const isTurnStateConfirmPlayMonopolyDevelopmentCard = () => {return turnState == "Play Monopoly Development Card" ? true : false};
      const setTurnStateToConfirmPlayMonopolyDevelopmentCard = () =>     {setTurnState("Play Monopoly Development Card")};
      const isTurnStateMonopoly = () => {return turnState == "Monopoly" ? true : false};
      const setTurnStateToMonopoly = () =>     {setTurnState("Monopoly")};
    //---------- Trading Related ----------//
    const isTurnStateTradingWithTheBoard = () => {return turnState == "Trading With The Board" ? true : false};
    const setTurnStateToTradingWithTheBoard = () =>     {setTurnState("Trading With The Board")};

    //const isTurnState = () => {return turnState == "" ? true : false};
    //const setTurnStateTo = () =>     {setTurnState("")};


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
      isTurnStatePillageResourceCard,
      setTurnStateToPillageResourceCard,
    //---------- Main Turn ----------//
      isTurnStateIdle,
      setTurnStateToIdle,
    //---------- Building Related ----------//
      isTurnStateBuildMenu,
      setTurnStateToBuildMenu,
      isTurnStateBuildingARoad,
      setTurnStateToBuildingARoad,
        isTurnStateBuildingARoadLongestRoadCheck,
        setTurnStateToBuildingARoadLongestRoadCheck,
      isTurnStateBuildingASettlement,
      setTurnStateToBuildingASettlement,
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
        setTurnStateToRoadBuilderCardFirstRoad,
          setTurnStateToRoadBuilderCardFirstRoadLongestRoadCheck,
          isTurnStateRoadBuilderCardFirstRoadLongestRoadCheck,
        isTurnStateRoadBuilderCardSecondRoad,
        setTurnStateToRoadBuilderCarSecondRoad,
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
      turnState
    }}>
      {children}
    </TurnStateContext.Provider>
  )
}