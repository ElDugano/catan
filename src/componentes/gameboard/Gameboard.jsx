import { useContext } from "react";

import CornerNodes from "./components/CornerNodes.jsx";
import TileNumbers from "./components/TileNumbers.jsx";
import BanditIcon from "./components/BanditIcon.jsx";
import Tiles from "./components/Tiles.jsx";
import RoadNodes from "./components/RoadNodes.jsx";

import { GameStateContext } from "../../state/gameState/GameStateContext.js";
import { TurnStateContext } from "../../state/turnState/TurnStateContext.js";

import { PlayerAvailableBuildingsContext } from "../../state/playerAvailableBuildings/PlayerAvailableBuildingsContext.js";
import { CurrentPlayerTurnContext } from "../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { NumberOfPlayersContext } from '../../state/numberOfPlayers/NumberOfPlayersContext';

import { TileCornerNodes } from './state/tileCornerNodes/TileCornerNodes.jsx'
import { LandTiles } from './state/landTiles/LandTiles.jsx'
import { ThiefLocation } from './state/thiefLocation/ThiefLocation.jsx'
import { LandTileNumbers } from './state/landTileNumbers/LandTileNumbers.jsx'

export default function Gameboard({children}) {
  const {isGameStateBoardSetup, setGameStateToMainGame} = useContext(GameStateContext);
  const {setTurnStateToBuildingASettlement,
    setTurnStateToBuildingARoad,
    setTurnStateToRollingTheDice,
    setTurnStateToIdle,
    isTurnStateRoadBuilderCardFirstRoad,
    setTurnStateToRoadBuilderCarSecondRoad,
  }= useContext(TurnStateContext);

  const {returnAvailableSettlements, removeSettlementFromAvailableBuildings, removeCityFromAvailableBuildings, removeRoadFromAvailableBuildings} = useContext(PlayerAvailableBuildingsContext);

  const {currentPlayerTurn, gotoNextPlayerTurn, gotoPreviousPlayerTurn} = useContext(CurrentPlayerTurnContext);
  const {numberOfPlayers} = useContext(NumberOfPlayersContext);

  function BuildSettlentHelper(x, y) {
    removeSettlementFromAvailableBuildings(x, y, currentPlayerTurn);
    if(isGameStateBoardSetup())
      setTurnStateToBuildingARoad();
    else
      setTurnStateToIdle();
  }

  function BuildCityHelper(x, y) {
    removeCityFromAvailableBuildings(x, y, currentPlayerTurn);
    setTurnStateToIdle();
  }

  function BuildRoadHelper(x, y) {
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
        gotoPreviousPlayerTurn();
        console.log("moving backwards");
      }
      else {
        console.log("^^^^START THE GAME^^^^");
        setGameStateToMainGame();
        setTurnStateToRollingTheDice();
      }
    }
    else if(isTurnStateRoadBuilderCardFirstRoad())
      setTurnStateToRoadBuilderCarSecondRoad();
    else
      setTurnStateToIdle();
  }


  return (
    <TileCornerNodes>
      <LandTiles>
        <ThiefLocation>
          <LandTileNumbers>
            { children }
            <svg className="hex-grid" viewBox="0 0 420 370">
              <Tiles />
              <TileNumbers />
              <CornerNodes
                GameboardFunctionBuildSettlement={BuildSettlentHelper}
                GameboardFunctionBuildCity={BuildCityHelper}
              />
              <RoadNodes
                GameboardFunctionBuildRoad={BuildRoadHelper}
              />
              <BanditIcon />
            </svg>
          </LandTileNumbers>
        </ThiefLocation>
      </LandTiles>
    </TileCornerNodes>
  )
}