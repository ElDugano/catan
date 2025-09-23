import { useState, useContext } from "react"
import { PortOwnerContext } from "../../../../state/portOwner/PortOwnerContext"
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerColorContext } from "../../../../state/playerColor/PlayerColorContext";
import { TurnStateContext } from "../../../../state/turnState/TurnStateContext";
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext";
import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext";


import lumberIcon from "../../../../assets/lumberIcon.svg";
import brickIcon from "../../../../assets/brickIcon.svg";
import woolIcon from "../../../../assets/woolIcon.svg";
import grainIcon from "../../../../assets/grainIcon.svg";
import oreIcon from "../../../../assets/oreIcon.svg";


export default function TradeWithPlayerMenu(props) {
  const { clientPlayerNumber } = useContext(CurrentPlayerTurnContext);
  const { playerColor } = useContext(PlayerColorContext);
  const { getAPlayersResourceCards } = useContext(PlayerResourceCardsContext);
  const playerResources = getAPlayersResourceCards(clientPlayerNumber);

  const oneLumberIcon = <img src={lumberIcon} />;
  const oneBrickIcon = <img src={brickIcon} />;
  const oneWoolIcon = <img src={woolIcon} />;
  const oneGrainIcon = <img src={grainIcon} />;
  const oneOreIcon = <img src={oreIcon} />;

  const adjustGiveResource = (resourceType, adjustment) => {
    let newGiveTradeItem = {...props.giveResources};
    newGiveTradeItem[resourceType] += adjustment;
    props.setGiveResources(newGiveTradeItem);
  }

  const adjustRecieveResource = (resourceType, adjustment) => {
    let newRecieveTradeItem = {...props.recieveResources};
    newRecieveTradeItem[resourceType] += adjustment;
    props.setRecieveResources(newRecieveTradeItem);
  }

  return (
    <>
      Give to {props.tradePartner != null ? "Player "+props.tradePartner : "The Port"}<br />
      <div className={"tradeWithPlayerMenu"}>
        <div className="resourceHolder">
          {oneLumberIcon}
          <div>{props.giveResources.Lumber}</div>
          {props.recieveResources.Lumber == 0 && props.giveResources.Lumber < playerResources.Lumber ? <button onClick={() => adjustGiveResource("Lumber", 1)}>+</button> : <button disabled >+</button>}
          {props.giveResources.Lumber > 0 ? <button onClick={() => adjustGiveResource("Lumber", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneBrickIcon}
          <div>{props.giveResources.Brick}</div>
          {props.recieveResources.Brick == 0 && props.giveResources.Brick < playerResources.Brick ? <button onClick={() => adjustGiveResource("Brick", 1)}>+</button> : <button disabled >+</button>}
          {props.giveResources.Brick > 0 ? <button onClick={() => adjustGiveResource("Brick", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneWoolIcon}
          <div>{props.giveResources.Wool}</div>
          {props.recieveResources.Wool == 0 && props.giveResources.Wool < playerResources.Wool ? <button onClick={() => adjustGiveResource("Wool", 1)}>+</button> : <button disabled >+</button>}
          {props.giveResources.Wool > 0 ? <button onClick={() => adjustGiveResource("Wool", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneGrainIcon}
          <div>{props.giveResources.Grain}</div>
          {props.recieveResources.Grain == 0 && props.giveResources.Grain < playerResources.Grain ? <button onClick={() => adjustGiveResource("Grain", 1)}>+</button> : <button disabled >+</button>}
          {props.giveResources.Grain > 0 ? <button onClick={() => adjustGiveResource("Grain", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneOreIcon}
          <div>{props.giveResources.Ore}</div>
          {props.recieveResources.Ore == 0 && props.giveResources.Ore < playerResources.Ore ? <button onClick={() => adjustGiveResource("Ore", 1)}>+</button> : <button disabled >+</button>}
          {props.giveResources.Ore > 0 ? <button onClick={() => adjustGiveResource("Ore", -1)}>-</button> : <button disabled >-</button>}
        </div>
      </div>
      Recieve from {props.tradePartner != null ? "Player "+props.tradePartner : "The Port"}<br />
      <div className={"tradeWithPlayerMenu"}>
        <div className="resourceHolder">
          {oneLumberIcon}
          <div>{props.recieveResources.Lumber}</div>
          {props.giveResources.Lumber == 0 ? <button onClick={() => adjustRecieveResource("Lumber", 1)}>+</button> : <button disabled >+</button>}
          {props.recieveResources.Lumber > 0 ? <button onClick={() => adjustRecieveResource("Lumber", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneBrickIcon}
          <div>{props.recieveResources.Brick}</div>
          {props.giveResources.Brick == 0 ? <button onClick={() => adjustRecieveResource("Brick", 1)}>+</button> : <button disabled >+</button>}
          {props.recieveResources.Brick > 0 ? <button onClick={() => adjustRecieveResource("Brick", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneWoolIcon}
          <div>{props.recieveResources.Wool}</div>
          {props.giveResources.Wool == 0 ? <button onClick={() => adjustRecieveResource("Wool", 1)}>+</button> : <button disabled >+</button>}
          {props.recieveResources.Wool > 0 ? <button onClick={() => adjustRecieveResource("Wool", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneGrainIcon}
          <div>{props.recieveResources.Grain}</div>
          {props.giveResources.Grain == 0 ? <button onClick={() => adjustRecieveResource("Grain", 1)}>+</button> : <button disabled >+</button>}
          {props.recieveResources.Grain > 0 ? <button onClick={() => adjustRecieveResource("Grain", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneOreIcon}
          <div>{props.recieveResources.Ore}</div>
          {props.giveResources.Ore == 0 ? <button onClick={() => adjustRecieveResource("Ore", 1)}>+</button> : <button disabled >+</button>}
          {props.recieveResources.Ore > 0 ? <button onClick={() => adjustRecieveResource("Ore", -1)}>-</button> : <button disabled >-</button>}
        </div>
      </div>
    </>
  )
}