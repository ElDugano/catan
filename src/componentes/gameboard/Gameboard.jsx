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

import checkIfSettlmentSplitLongestRoad from "./helpers/checkIfSettlmentSplitLongestRoad.jsx";

export default function Gameboard({children}) {
  const { isGameStateBoardSetup } = useContext(GameStateContext);
  const { setTurnStateToBuildingARoad,
          setTurnStateToIdle }= useContext(TurnStateContext);

  const { returnAvailableSettlements,
          removeSettlementFromAvailableBuildings,
          removeCityFromAvailableBuildings } = useContext(PlayerAvailableBuildingsContext);
  const { removePlayerResourcesToBuildSettlement,
          removePlayerResourcesToBuildCity } = useContext(PlayerResourceCardsContext);

  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);
  const { numberOfPlayers } = useContext(NumberOfPlayersContext);
  const { scorePoint, setLongestRoad, longestRoadOwner } = useContext(ScoreBoardContext);
  const { setPortOwner } = useContext(PortOwnerContext);

  function BuildSettlentHelper(x, y, tileCornerNodes) {
    scorePoint(currentPlayerTurn);
    if ("port" in tileCornerNodes[x][y]){
      setPortOwner(currentPlayerTurn, tileCornerNodes[x][y].port);
    }
    removeSettlementFromAvailableBuildings(x, y, currentPlayerTurn);
    if (currentPlayerTurn != longestRoadOwner){
      checkIfSettlmentSplitLongestRoad(tileCornerNodes, x, y, longestRoadOwner, numberOfPlayers, setLongestRoad);
      //This will want to do something with sending how many roads players have.
    }

    if(isGameStateBoardSetup() && returnAvailableSettlements(currentPlayerTurn) == 3){
            //More technical debt 
      console.log("Shit, that was the second settlement. neat.");
      console.log("Shit shit, we can't get to the landtiles from here.");
      console.log("Maybe we do this from where it gets called, I guess.");
      console.log("Or we need to move all of this out into another component");
      //if((x+y)%2 == 0){
      //
      //}
    }


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
                <RoadNodes />
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