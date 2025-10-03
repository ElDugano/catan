import { useContext } from "react"
import { PortOwnerContext } from "../../../../state/portOwner/PortOwnerContext"
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext";

import lumberIcon from "../../../../assets/lumberIcon.svg";
import brickIcon from "../../../../assets/brickIcon.svg";
import woolIcon from "../../../../assets/woolIcon.svg";
import grainIcon from "../../../../assets/grainIcon.svg";
import oreIcon from "../../../../assets/oreIcon.svg";

export default function TradeWithBoardMenu(props) {
  const { doesPlayerOwnStandardPort,
          doesPlayerOwnWoolPort,
          doesPlayerOwnGrainPort,
          doesPlayerOwnLumberPort,
          doesPlayerOwnBrickPort,
          doesPlayerOwnOrePort} = useContext(PortOwnerContext);
  const { clientPlayerNumber } = useContext(CurrentPlayerTurnContext);
  const { getAPlayersResourceCards } = useContext(PlayerResourceCardsContext);

  const defaultTradeCost = doesPlayerOwnStandardPort(clientPlayerNumber)  ? 3 : 4;
  const lumberPortTradeCost = doesPlayerOwnLumberPort(clientPlayerNumber) ? 2 : defaultTradeCost;
  const brickPortTradeCost = doesPlayerOwnBrickPort(clientPlayerNumber) ? 2 : defaultTradeCost;
  const woolPortTradeCost = doesPlayerOwnWoolPort(clientPlayerNumber) ? 2 : defaultTradeCost;
  const grainPortTradeCost = doesPlayerOwnGrainPort(clientPlayerNumber) ? 2 : defaultTradeCost;
  const orePortTradeCost = doesPlayerOwnOrePort(clientPlayerNumber) ? 2 : defaultTradeCost;

  const oneLumberIcon = <img src={lumberIcon} />;
  const oneBrickIcon = <img src={brickIcon} />;
  const oneWoolIcon = <img src={woolIcon} />;
  const oneGrainIcon = <img src={grainIcon} />;
  const oneOreIcon = <img src={oreIcon} />;

  const playerResources = getAPlayersResourceCards(clientPlayerNumber);

  const toggleGiveTradeItem = (resource) => {
    const resourceResult = {Lumber: 0,Brick: 0,Wool: 0,Grain: 0,Ore: 0}
    if (props.giveResources[resource] == 0) {
      switch (resource) {
        case "Lumber":
          resourceResult.Lumber = lumberPortTradeCost;
          break;
        case "Brick":
          resourceResult.Brick = brickPortTradeCost;
          break;
        case "Wool":
          resourceResult.Wool = woolPortTradeCost;
          break;
        case "Grain":
          resourceResult.Grain = grainPortTradeCost;
          break;
        case "Ore":
          resourceResult.Ore = orePortTradeCost;
          break;
      }
    }
    props.setGiveResources(resourceResult);
  }

  const toggleRecieveTradeItem = (resource) => {
    const resourceResult = {Lumber: 0,Brick: 0,Wool: 0,Grain: 0,Ore: 0}
    if (props.recieveResources[resource] == 0) {
      resourceResult[resource]=1;
    }
    props.setRecieveResources(resourceResult);
  }


  return(
    <>
      <div className={"tradeWithBoardMenu"}>
        Give to The Port<br />
        {props.recieveResources.Lumber == 0 && playerResources.Lumber >= lumberPortTradeCost ?
          <button
            className={props.giveResources.Lumber != 0 ? "selected" : ""}
            onClick={() => toggleGiveTradeItem("Lumber")}>
            {oneLumberIcon}
            <div>-{lumberPortTradeCost}</div>
          </button> :
          <button disabled>{oneLumberIcon}
            <div>-{lumberPortTradeCost}</div>
          </button>
        }
        {props.recieveResources.Brick == 0 && playerResources.Brick >= brickPortTradeCost ?
          <button
            className={props.giveResources.Brick != 0 ? "selected" : ""}
            onClick={() => toggleGiveTradeItem("Brick")}>
              {oneBrickIcon}
            <div>-{brickPortTradeCost}</div>
          </button> :
          <button disabled>{oneBrickIcon}
            <div>-{brickPortTradeCost}</div>
          </button>
        }
        {props.recieveResources.Wool == 0 && playerResources.Wool >= woolPortTradeCost ?
          <button
            className={props.giveResources.Wool != 0 ? "selected" : ""}
            onClick={() => toggleGiveTradeItem("Wool")}>
              {oneWoolIcon}
            <div>-{woolPortTradeCost}</div>
          </button> :
          <button disabled>{oneWoolIcon}
            <div>-{woolPortTradeCost}</div>
          </button>
        }
        {props.recieveResources.Grain == 0 && playerResources.Grain >= grainPortTradeCost ?
          <button
            className={props.giveResources.Grain != 0 ? "selected" : ""}
            onClick={() => toggleGiveTradeItem("Grain")}>
              {oneGrainIcon}
            <div>-{grainPortTradeCost}</div>
          </button> :
          <button disabled>{oneGrainIcon}
            <div>-{grainPortTradeCost}</div>
          </button>
        }
        {props.recieveResources.Ore == 0 && playerResources.Ore >= orePortTradeCost ?
          <button
            className={props.giveResources.Ore != 0 ? "selected" : ""}
            onClick={() => toggleGiveTradeItem("Ore")}>
              {oneOreIcon}
            <div>-{orePortTradeCost}</div>
          </button> :
          <button disabled>{oneOreIcon}
            <div>-{orePortTradeCost}</div>
          </button>
        }

        Recieve from The Port<br />

        {props.giveResources.Lumber == 0 ?
          <button
            className={props.recieveResources.Lumber != 0 ? "selected" : ""}
            onClick={() => toggleRecieveTradeItem("Lumber")} >
            {oneLumberIcon}
            <div>+1</div>
          </button> :
          <button disabled >{oneLumberIcon}
            <div>+1</div>
          </button>
        }
        {props.giveResources.Brick == 0 ?
          <button
            className={props.recieveResources.Brick != 0 ? "selected" : ""}
            onClick={() => toggleRecieveTradeItem("Brick")} >
            {oneBrickIcon}
            <div>+1</div>
          </button> :
          <button disabled >{oneBrickIcon}
            <div>+1</div>
          </button>
        }
        {props.giveResources.Wool == 0 ?
          <button
            className={props.recieveResources.Wool != 0 ? "selected" : ""}
            onClick={() => toggleRecieveTradeItem("Wool")} >
            {oneWoolIcon}
            <div>+1</div>
          </button> :
          <button disabled >{oneWoolIcon}
            <div>+1</div>
          </button>
        }
        {props.giveResources.Grain == 0 ?
          <button
            className={props.recieveResources.Grain != 0 ? "selected" : ""}
            onClick={() => toggleRecieveTradeItem("Grain")} >
            {oneGrainIcon}
            <div>+1</div>
          </button> :
          <button disabled >{oneGrainIcon}
            <div>+1</div>
          </button>
        }
        {props.giveResources.Ore == 0 ?
          <button
            className={props.recieveResources.Ore != 0 ? "selected" : ""}
            onClick={() => toggleRecieveTradeItem("Ore")} >
            {oneOreIcon}
            <div>+1</div>
          </button> :
          <button disabled >{oneOreIcon}
            <div>+1</div>
          </button>
        }
      </div>

    </>
  )
}