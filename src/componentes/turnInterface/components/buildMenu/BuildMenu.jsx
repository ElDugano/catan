import { useContext } from "react";

import { TurnStateContext } from "../../../../state/turnState/TurnStateContext.js"
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { PlayerAvailableBuildingsContext } from "../../../../state/playerAvailableBuildings/PlayerAvailableBuildingsContext.js";
import { DevelopmentCardsContext } from "../../../../state/developmentCards/DevelopmentCardsContext.js";

import lumberIcon from "../../../../assets/lumberIcon.svg"
import brickIcon from "../../../../assets/brickIcon.svg"
import woolIcon from "../../../../assets/woolIcon.svg"
import grainIcon from "../../../../assets/grainIcon.svg"
import oreIcon from "../../../../assets/oreIcon.svg"

export default function BuildMenu() {
  const { playerResourceCards,
          canPlayerAffordRoad,
          canPlayerAffordSettlement,
          canPlayerAffordCity,
          canPlayerAffordDevelopmentCard } = useContext(PlayerResourceCardsContext);
  const { clientPlayerNumber } = useContext(CurrentPlayerTurnContext)
  const { returnAvailableRoads,
          returnAvailableSettlements,
          returnAvailableCities,
          buildSettlementPlacementAvailable,
          buildCityPlacementAvailable } = useContext(PlayerAvailableBuildingsContext);
  const { returnAvailableDevelopmentCards } = useContext(DevelopmentCardsContext);

  const { setTurnStateToIdle,
    setTurnStateToBuildingARoad,
    setTurnStateToBuildingASettlement,
    setTurnStateToBuildingACity,
    setTurnStateToConfirmBuyingDevelopmentCard
  } = useContext(TurnStateContext);

  const buildRoadFunction = () => {
    setTurnStateToBuildingARoad();
  }
  const buildSettlementFunction = () => {
    setTurnStateToBuildingASettlement();
  }
  const buildCityFunction = () => {
    setTurnStateToBuildingACity();
  }
  const BuyDevelopmentCardFunction = () => {
    setTurnStateToConfirmBuyingDevelopmentCard()
  }
  const oneLumberIcon = playerResourceCards[clientPlayerNumber].Lumber >= 1 ? <img src={lumberIcon} /> : <img className="notEnoughResources" src={lumberIcon} />;
  const oneBrickIcon = playerResourceCards[clientPlayerNumber].Brick >= 1 ? <img src={brickIcon} /> : <img className="notEnoughResources" src={brickIcon} />;
  const oneWoolIcon = playerResourceCards[clientPlayerNumber].Wool >= 1 ? <img src={woolIcon} /> : <img className="notEnoughResources" src={woolIcon} />;
  const oneGrainIcon = playerResourceCards[clientPlayerNumber].Grain >= 1 ? <img src={grainIcon} /> : <img className="notEnoughResources" src={grainIcon} />;
  const twoGrainIcon = playerResourceCards[clientPlayerNumber].Grain >= 2 ? <img src={grainIcon} /> : <img className="notEnoughResources" src={grainIcon} />;
  const oneOreIcon = playerResourceCards[clientPlayerNumber].Ore >= 1 ? <img src={oreIcon} /> : <img className="notEnoughResources" src={oreIcon} />;
  const twoOreIcon = playerResourceCards[clientPlayerNumber].Ore >= 2 ? <img src={oreIcon} /> : <img className="notEnoughResources" src={oreIcon} />;
  const threeOreIcon = playerResourceCards[clientPlayerNumber].Ore >= 3 ? <img src={oreIcon} /> : <img className="notEnoughResources" src={oreIcon} />;

  const BuildRoadButton = (
    canPlayerAffordRoad(clientPlayerNumber) && returnAvailableRoads(clientPlayerNumber) ?
    <button onClick={buildRoadFunction}>Road<br/>{oneLumberIcon}{oneBrickIcon}</button> :
    <button disabled>Road<br/>{oneLumberIcon}{oneBrickIcon}</button>
  );
  const BuildSettlementButton = (
    canPlayerAffordSettlement(clientPlayerNumber) && returnAvailableSettlements(clientPlayerNumber) && buildSettlementPlacementAvailable ?
    <button onClick={buildSettlementFunction}>Settlement<br/>{oneLumberIcon}{oneBrickIcon}{oneWoolIcon}{oneGrainIcon}</button> :
    <button disabled>Settlement<br/>{oneLumberIcon}{oneBrickIcon}{oneWoolIcon}{oneGrainIcon}</button>
  );
  const BuildCityButton = (
    canPlayerAffordCity(clientPlayerNumber) && returnAvailableCities(clientPlayerNumber) && buildCityPlacementAvailable ?
    <button onClick={buildCityFunction}>City<br/>{oneGrainIcon}{twoGrainIcon}{oneOreIcon}{twoOreIcon}{threeOreIcon}</button> :
    <button disabled>City<br/>{oneGrainIcon}{twoGrainIcon}{oneOreIcon}{twoOreIcon}{threeOreIcon}</button>
  );
  const BuildDevelopmentCardButton = (
    canPlayerAffordDevelopmentCard(clientPlayerNumber) && returnAvailableDevelopmentCards() ?
    <button onClick={BuyDevelopmentCardFunction}>Development Card<br/>{oneWoolIcon}{oneGrainIcon}{oneOreIcon}</button> :
    <button disabled>Development Card<br/>{oneWoolIcon}{oneGrainIcon}{oneOreIcon}</button>
  );



  return (
    <div className={"buildMenu"}>
    <h2>Build Menu</h2>
      {BuildRoadButton}
      {BuildSettlementButton}
      {BuildCityButton}
      {BuildDevelopmentCardButton}
      <button onClick={() => setTurnStateToIdle()}>Go Back</button>
    </div>
  )
}