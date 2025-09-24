import { useContext } from "react"
import { TurnStateContext } from "../../../../state/turnState/TurnStateContext"
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext";
import { PlayerColorContext } from "../../../../state/playerColor/PlayerColorContext";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext";

import TradeResult from "./TradeResult";

import lumberIcon from "../../../../assets/lumberIcon.svg";
import brickIcon from "../../../../assets/brickIcon.svg";
import woolIcon from "../../../../assets/woolIcon.svg";
import grainIcon from "../../../../assets/grainIcon.svg";
import oreIcon from "../../../../assets/oreIcon.svg";

export default function ReviewingTradeOffer() {
   const { setTurnStateToIdle } = useContext(TurnStateContext);
   const { tradeOffer } = useContext(PlayerResourceCardsContext);
   const { playerColor } = useContext(PlayerColorContext)
   const { currentPlayerTurn, clientPlayerNumber } = useContext(CurrentPlayerTurnContext);
   const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  //const oneLumberIcon = <img src={lumberIcon} />;
  //const oneBrickIcon = <img src={brickIcon} />;
  //const oneWoolIcon = <img src={woolIcon} />;
  //const oneGrainIcon = <img src={grainIcon} />;
  //const oneOreIcon = <img src={oreIcon} />;

  const displayResourceIcon = (resource) => {
    switch (resource) {
      case "Lumber":
        return <img src={lumberIcon} />;
      case "Brick":
        return <img src={brickIcon} />;
      case "Wool":
        return <img src={woolIcon} />;
      case "Grain":
        return <img src={grainIcon} />;
      case "Ore":
        return <img src={oreIcon} />;
    }
  }

  let giveResources = [];
  for ( let resource in tradeOffer[0].resources) {
    if (tradeOffer[0].resources[resource] != 0) {
      giveResources.push(
        <div key={crypto.randomUUID()}>
          {displayResourceIcon(resource)}<br />{tradeOffer[0].resources[resource]}
        </div>
      )
    }
  }
  let recieveResources = [];
  for ( let resource in tradeOffer[1].resources) {
    if (tradeOffer[1].resources[resource] != 0) {
      recieveResources.push(
        <div key={crypto.randomUUID()}>
          {displayResourceIcon(resource)}<br />{tradeOffer[1].resources[resource]}
        </div>
      )
    }
  }

  const cancelTrade = () => {
    addToMessagePayloadToHost({cancelTrade:tradeOffer[1].player});
    setTurnStateToIdle();
    sendTheMessages();
   }

  const acceptTrade = () => {
    addToMessagePayloadToHost(
      { tradeResourceCards:
        { 
          giveTradeItem: tradeOffer[1].resources,
          recieveTradeItem: tradeOffer[0].resources,
          tradeTargetPlayer: tradeOffer[0].player
        }
      }
    );
    setTurnStateToIdle();
    sendTheMessages();
  }

  console.log(tradeOffer);
  return(
    <>
      <div className="reviewTradeMenu">
        <h3>Accept Trade</h3>
        <div className="tradeHolder">
          <div className="tradeHolderCol">
            You
            <div className="resourceHolder negativeNumber">
              {giveResources}
            </div>
          </div>
          <div className="arrow">
            {"<>"}
          </div>
          <div className="tradeHolderCol">
            Player {tradeOffer[1].player}<br />
            <div className="resourceHolder positiveNumber">
              {recieveResources}
            </div>
          </div>
        </div>
        {currentPlayerTurn != clientPlayerNumber && <button onClick={acceptTrade}>Accept Offer</button>}
        {currentPlayerTurn == clientPlayerNumber ?
          <button className="positiveNumber" onClick={cancelTrade}>Cancel Offer</button> :
          <button className="negativeNumber" onClick={cancelTrade}>Reject Offer</button>
        }
      </div>
      <TradeResult giveResources={tradeOffer[0].resources} recieveResources={tradeOffer[1].resources} />
    </>
  )
}