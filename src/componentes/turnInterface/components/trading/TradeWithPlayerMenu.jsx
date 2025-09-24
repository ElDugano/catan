import { useContext } from "react"
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerColorContext } from "../../../../state/playerColor/PlayerColorContext";
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext";

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
          {props.giveResources.Lumber > 0 ? <div className="negativeNumber">{props.giveResources.Lumber}</div> : <div>0</div>}
          {props.recieveResources.Lumber == 0 && props.giveResources.Lumber < playerResources.Lumber ? <button onClick={() => adjustGiveResource("Lumber", 1)}>+</button> : <button disabled >+</button>}
          {props.giveResources.Lumber > 0 ? <button onClick={() => adjustGiveResource("Lumber", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneBrickIcon}
          {props.giveResources.Brick > 0 ? <div className="negativeNumber">{props.giveResources.Brick}</div> : <div>0</div>}
          {props.recieveResources.Brick == 0 && props.giveResources.Brick < playerResources.Brick ? <button onClick={() => adjustGiveResource("Brick", 1)}>+</button> : <button disabled >+</button>}
          {props.giveResources.Brick > 0 ? <button onClick={() => adjustGiveResource("Brick", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneWoolIcon}
          {props.giveResources.Wool > 0 ? <div className="negativeNumber">{props.giveResources.Wool}</div> : <div>0</div>}
          {props.recieveResources.Wool == 0 && props.giveResources.Wool < playerResources.Wool ? <button onClick={() => adjustGiveResource("Wool", 1)}>+</button> : <button disabled >+</button>}
          {props.giveResources.Wool > 0 ? <button onClick={() => adjustGiveResource("Wool", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneGrainIcon}
          {props.giveResources.Grain > 0 ? <div className="negativeNumber">{props.giveResources.Grain}</div> : <div>0</div>}
          {props.recieveResources.Grain == 0 && props.giveResources.Grain < playerResources.Grain ? <button onClick={() => adjustGiveResource("Grain", 1)}>+</button> : <button disabled >+</button>}
          {props.giveResources.Grain > 0 ? <button onClick={() => adjustGiveResource("Grain", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneOreIcon}
          {props.giveResources.Ore > 0 ? <div className="negativeNumber">{props.giveResources.Ore}</div> : <div>0</div>}
          {props.recieveResources.Ore == 0 && props.giveResources.Ore < playerResources.Ore ? <button onClick={() => adjustGiveResource("Ore", 1)}>+</button> : <button disabled >+</button>}
          {props.giveResources.Ore > 0 ? <button onClick={() => adjustGiveResource("Ore", -1)}>-</button> : <button disabled >-</button>}
        </div>
      </div>
      Recieve from {props.tradePartner != null ? "Player "+props.tradePartner : "The Port"}<br />
      <div className={"tradeWithPlayerMenu"}>
        <div className="resourceHolder">
          {oneLumberIcon}
          {props.recieveResources.Lumber > 0 ? <div className="positiveNumber">{props.recieveResources.Lumber}</div> : <div>0</div>}
          {props.giveResources.Lumber == 0 ? <button className={"playerButton"+playerColor[props.tradePartner]} onClick={() => adjustRecieveResource("Lumber", 1)}>+</button> : <button disabled >+</button>}
          {props.recieveResources.Lumber > 0 ? <button className={"playerButton"+playerColor[props.tradePartner]} onClick={() => adjustRecieveResource("Lumber", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneBrickIcon}
          {props.recieveResources.Brick > 0 ? <div className="positiveNumber">{props.recieveResources.Brick}</div> : <div>0</div>}
          {props.giveResources.Brick == 0 ? <button className={"playerButton"+playerColor[props.tradePartner]} onClick={() => adjustRecieveResource("Brick", 1)}>+</button> : <button disabled >+</button>}
          {props.recieveResources.Brick > 0 ? <button className={"playerButton"+playerColor[props.tradePartner]} onClick={() => adjustRecieveResource("Brick", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneWoolIcon}
          {props.recieveResources.Wool > 0 ? <div className="positiveNumber">{props.recieveResources.Wool}</div> : <div>0</div>}
          {props.giveResources.Wool == 0 ? <button className={"playerButton"+playerColor[props.tradePartner]} onClick={() => adjustRecieveResource("Wool", 1)}>+</button> : <button disabled >+</button>}
          {props.recieveResources.Wool > 0 ? <button className={"playerButton"+playerColor[props.tradePartner]} onClick={() => adjustRecieveResource("Wool", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneGrainIcon}
          {props.recieveResources.Grain > 0 ? <div className="positiveNumber">{props.recieveResources.Grain}</div> : <div>0</div>}
          {props.giveResources.Grain == 0 ? <button className={"playerButton"+playerColor[props.tradePartner]} onClick={() => adjustRecieveResource("Grain", 1)}>+</button> : <button disabled >+</button>}
          {props.recieveResources.Grain > 0 ? <button className={"playerButton"+playerColor[props.tradePartner]} onClick={() => adjustRecieveResource("Grain", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneOreIcon}
          {props.recieveResources.Ore > 0 ? <div className="positiveNumber">{props.recieveResources.Ore}</div> : <div>0</div>}
          {props.giveResources.Ore == 0 ? <button className={"playerButton"+playerColor[props.tradePartner]} onClick={() => adjustRecieveResource("Ore", 1)}>+</button> : <button disabled >+</button>}
          {props.recieveResources.Ore > 0 ? <button className={"playerButton"+playerColor[props.tradePartner]} onClick={() => adjustRecieveResource("Ore", -1)}>-</button> : <button disabled >-</button>}
        </div>
      </div>
    </>
  )
}