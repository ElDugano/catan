import { useContext } from "react";

import CornerNodes from "./components/CornerNodes.jsx";
import TileNumbers from "./components/TileNumbers.jsx";
import BanditIcon from "./components/BanditIcon.jsx";
import Tiles from "./components/Tiles.jsx";
import Ports from "./components/Ports.jsx";
import RoadNodes from "./components/RoadNodes.jsx";
import ThiefMoveButtons from "./components/TheifMoveButtons.jsx";

import { GameStateContext } from "../../state/gameState/GameStateContext.js";
import { TurnStateContext } from "../../state/turnState/TurnStateContext.js";

import { CurrentPlayerTurnContext } from "../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { NumberOfPlayersContext } from '../../state/numberOfPlayers/NumberOfPlayersContext';
import { PlayerAvailableBuildingsContext } from "../../state/playerAvailableBuildings/PlayerAvailableBuildingsContext.js";
import { PlayerResourceCardsContext } from "../../state/playerResourceCards/PlayerResourceCardsContext.js";
import { ScoreBoardContext } from "../../state/scoreBoard/ScoreBoardContext.js";
import { PortOwnerContext } from "../../state/portOwner/PortOwnerContext.js";

import { TileCornerNodes } from './state/tileCornerNodes/TileCornerNodes.jsx'
import { LandTiles } from './state/landTiles/LandTiles.jsx'
import { PortTiles } from "./state/portTiles/PortTiles.jsx";
import { ThiefLocation } from './state/thiefLocation/ThiefLocation.jsx'
import { LandTileNumbers } from './state/landTileNumbers/LandTileNumbers.jsx'

import { FindThePlayersLongestRoad, } from './components/FindLongestRoad';

export default function Gameboard({children}) {
  const {isGameStateBoardSetup, setGameStateToMainGame} = useContext(GameStateContext);
  const {setTurnStateToBuildingASettlement,
    setTurnStateToBuildingARoad,
    setTurnStateToStartTurn,
    setTurnStateToIdle,
    isTurnStateRoadBuilderCardFirstRoad,
    isTurnStateRoadBuilderCardSecondRoad,
    setTurnStateToRoadBuilderCarSecondRoad,
  }= useContext(TurnStateContext);

  const { returnAvailableSettlements,
          removeSettlementFromAvailableBuildings,
          removeCityFromAvailableBuildings,
          removeRoadFromAvailableBuildings} = useContext(PlayerAvailableBuildingsContext);
  const { removePlayerResourcesToBuildRoad,
          removePlayerResourcesToBuildSettlement,
          removePlayerResourcesToBuildCity } = useContext(PlayerResourceCardsContext);

  const { currentPlayerTurn, gotoNextPlayerTurn, gotoPreviousPlayerTurn } = useContext(CurrentPlayerTurnContext);
  const { numberOfPlayers } = useContext(NumberOfPlayersContext);
  const { scorePoint, checkIfLongestRoad, setLongestRoad, longestRoadOwner } = useContext(ScoreBoardContext);
  const { setPortOwner } = useContext(PortOwnerContext);

  function BuildSettlentHelper(x, y, tileCornerNodes) {
    scorePoint(currentPlayerTurn);
    if ("port" in tileCornerNodes[x][y]){
      setPortOwner(currentPlayerTurn, tileCornerNodes[x][y].port);
    }



    //Check if we cute shit in half.
    //This all should likely mbe moved into FindLongestRoad.jsx, with a return object of the newPlayer and Length.
    let outterRoads = 0;
    if (currentPlayerTurn != longestRoadOwner){
      if (tileCornerNodes[x][y].rightRoadOwner == longestRoadOwner) {outterRoads++;}
      if ("rightRoadOwner" in tileCornerNodes[x-1][y] && tileCornerNodes[x-1][y].rightRoadOwner == longestRoadOwner) {outterRoads++;}
      if ((x+y)%2 == 0 && tileCornerNodes[x][y].bottomRoadOwner == longestRoadOwner) {outterRoads++;}
      if ((x+y)%2 == 1 && "bottomRoadOwner" in tileCornerNodes[x][y-1] && tileCornerNodes[x][y-1].bottomRoadOwner == longestRoadOwner) {outterRoads++;}
    }
    if (outterRoads == 2) {
      let newLongestRoadPlayer = null;
      let newLongestRoadLength = 4;
      for (let player = 0; player < numberOfPlayers; player++){
        const testRoad = FindThePlayersLongestRoad(tileCornerNodes, player)
        if (testRoad > newLongestRoadLength){
          newLongestRoadLength = testRoad;
          newLongestRoadPlayer = player;
        }
      }
      setLongestRoad(newLongestRoadLength, newLongestRoadPlayer);
    }
    //End block that should be moved.

    

    removeSettlementFromAvailableBuildings(x, y, currentPlayerTurn);
    if(isGameStateBoardSetup())
      setTurnStateToBuildingARoad();
    else{
      removePlayerResourcesToBuildSettlement(currentPlayerTurn);
      setTurnStateToIdle();
    }
  }

  function BuildCityHelper(x, y) {
    scorePoint(currentPlayerTurn);
    removeCityFromAvailableBuildings(x, y, currentPlayerTurn);
    removePlayerResourcesToBuildCity(currentPlayerTurn);
    setTurnStateToIdle();
  }

  function BuildRoadHelper(x, y, tileCornerNodes) {
    checkIfLongestRoad(FindThePlayersLongestRoad(tileCornerNodes, currentPlayerTurn), currentPlayerTurn);
    removeRoadFromAvailableBuildings(x, y, currentPlayerTurn);
    if(isGameStateBoardSetup()){
      setTurnStateToBuildingASettlement();
      if(returnAvailableSettlements(currentPlayerTurn) == 4 && currentPlayerTurn < numberOfPlayers-1) {
        gotoNextPlayerTurn();
        console.log("moving forward");
      }
      else if(returnAvailableSettlements(currentPlayerTurn) == 4 && currentPlayerTurn == numberOfPlayers-1) {
        console.log("Time to reverse course");
      }
      else if(returnAvailableSettlements(currentPlayerTurn) == 3 && currentPlayerTurn > 0) {
        //Give currentPlayerTurn Resrouces
        gotoPreviousPlayerTurn();
        console.log("moving backwards");
      }
      else {
        //Give currentPlayerTurn Resrouces
        console.log("^^^^START THE GAME^^^^");
        setGameStateToMainGame();
        setTurnStateToStartTurn();
      }
    }
    else if(isTurnStateRoadBuilderCardFirstRoad())
      setTurnStateToRoadBuilderCarSecondRoad();
    else if (isTurnStateRoadBuilderCardSecondRoad())
      setTurnStateToIdle();
    else {
      setTurnStateToIdle();
      removePlayerResourcesToBuildRoad(currentPlayerTurn);
    }
  }


  return (
    <TileCornerNodes>
      <LandTiles>
        <PortTiles>
          <ThiefLocation>
            <LandTileNumbers>
              { children }
              <svg className="hex-grid" viewBox="0 0 420 370">
                <Tiles />
                <Ports />
                <TileNumbers />
                <CornerNodes
                  GameboardFunctionBuildSettlement={BuildSettlentHelper}
                  GameboardFunctionBuildCity={BuildCityHelper}
                />
                <RoadNodes
                  GameboardFunctionBuildRoad={BuildRoadHelper}
                />
                <BanditIcon />
                <ThiefMoveButtons />
              </svg>
            </LandTileNumbers>
          </ThiefLocation>
        </PortTiles>
      </LandTiles>
    </TileCornerNodes>
  )
}