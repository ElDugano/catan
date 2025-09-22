import { useState, useContext } from "react"
import { PortOwnerContext } from "../../../../state/portOwner/PortOwnerContext"
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { TurnStateContext } from "../../../../state/turnState/TurnStateContext";
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext";
import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext";

import "./tradeWithBoard.css";

import lumberIcon from "../../../../assets/lumberIcon.svg";
import brickIcon from "../../../../assets/brickIcon.svg";
import woolIcon from "../../../../assets/woolIcon.svg";
import grainIcon from "../../../../assets/grainIcon.svg";
import oreIcon from "../../../../assets/oreIcon.svg";

export default function TradeWithBoardMenu() {
  const { doesPlayerOwnStandardPort,
          doesPlayerOwnWoolPort,
          doesPlayerOwnGrainPort,
          doesPlayerOwnLumberPort,
          doesPlayerOwnBrickPort,
          doesPlayerOwnOrePort} = useContext(PortOwnerContext);
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);
  const { setTurnStateToIdle } = useContext(TurnStateContext);
  const { getAPlayersResourceCards, tradeResources } = useContext(PlayerResourceCardsContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  const defaultTradeCost = doesPlayerOwnStandardPort(currentPlayerTurn)  ? 3 : 4;
  const lumberPortTradeCost = doesPlayerOwnLumberPort(currentPlayerTurn) ? 2 : defaultTradeCost;
  const brickPortTradeCost = doesPlayerOwnBrickPort(currentPlayerTurn) ? 2 : defaultTradeCost;
  const woolPortTradeCost = doesPlayerOwnWoolPort(currentPlayerTurn) ? 2 : defaultTradeCost;
  const grainPortTradeCost = doesPlayerOwnGrainPort(currentPlayerTurn) ? 2 : defaultTradeCost;
  const orePortTradeCost = doesPlayerOwnOrePort(currentPlayerTurn) ? 2 : defaultTradeCost;

  const [giveTradeItem, setGiveTradeItem] = useState(null);
  const [recieveTradeItem, setRecieveTradeItem] = useState(null);

  const oneLumberIcon = <img src={lumberIcon} />;
  const oneBrickIcon = <img src={brickIcon} />;
  const oneWoolIcon = <img src={woolIcon} />;
  const oneGrainIcon = <img src={grainIcon} />;
  const oneOreIcon = <img src={oreIcon} />;

  const playerResources = getAPlayersResourceCards(currentPlayerTurn);
  console.log(playerResources);

  //This needs to do error checking compared to how many resources the player actually hase
  const completeTrade = () => {
    console.log("We are doing the trade!")
    let amountToTrade;
    switch (giveTradeItem) {
      case "Lumber":
        amountToTrade = lumberPortTradeCost;
        break;
      case "Brick":
        amountToTrade = brickPortTradeCost;
        break;
      case "Wool":
        amountToTrade = woolPortTradeCost;
        break;
      case "Grain":
        amountToTrade = grainPortTradeCost;
        break;
      case "Ore":
        amountToTrade = orePortTradeCost;
        break;
    }
    addToMessagePayloadToHost({header: "Trade Resources"});
    addToMessagePayloadToHost(
      { tradeResourceCards:
        { 
          giveTradeItem:giveTradeItem,
          giveTradeAmount: amountToTrade,
          recieveTradeItem: recieveTradeItem,
          recieveTradeAmount: 1,
          tradeTarget: null
        }
      }
    );
    //tradeResources(currentPlayerTurn,{[giveTradeItem]:amountToTrade},null,{[recieveTradeItem]:1});
    sendTheMessages();

    setTurnStateToIdle();
  }

  return(
    <>
      <h3>Trade with the board</h3>
      <div className={"tradeWithBoardMenu"}>
        Trade Away<br />
        {recieveTradeItem != "Lumber" && playerResources.Lumber >= lumberPortTradeCost ?
          <button
            className={giveTradeItem == "Lumber" && "selected"}
            onClick={() => setGiveTradeItem("Lumber")}>
              {oneLumberIcon} -{lumberPortTradeCost}
          </button> :
          <button disabled>{oneLumberIcon} -{lumberPortTradeCost}</button>
        }
        {recieveTradeItem != "Brick" && playerResources.Brick >= brickPortTradeCost ?
          <button
            className={giveTradeItem == "Brick" && "selected"}
            onClick={() => setGiveTradeItem("Brick")}>
              {oneBrickIcon} -{brickPortTradeCost}
          </button> :
          <button disabled>{oneBrickIcon} -{brickPortTradeCost}</button>
        }
        {recieveTradeItem != "Wool" && playerResources.Wool >= woolPortTradeCost ?
          <button
            className={giveTradeItem == "Wool" && "selected"}
            onClick={() => setGiveTradeItem("Wool")}>
              {oneWoolIcon} -{woolPortTradeCost}
          </button> :
          <button disabled>{oneWoolIcon} -{woolPortTradeCost}</button>
        }
        {recieveTradeItem != "Grain" && playerResources.Grain >= grainPortTradeCost ?
          <button
            className={giveTradeItem == "Grain" && "selected"}
            onClick={() => setGiveTradeItem("Grain")}>
              {oneGrainIcon} -{grainPortTradeCost}
          </button> :
          <button disabled>{oneGrainIcon} -{grainPortTradeCost}</button>
        }
        {recieveTradeItem != "Ore" && playerResources.Ore >= orePortTradeCost ?
          <button
            className={giveTradeItem == "Ore" && "selected"}
            onClick={() => setGiveTradeItem("Ore")}>
              {oneOreIcon} -{orePortTradeCost}
          </button> :
          <button disabled>{oneOreIcon} -{orePortTradeCost}</button>
        }

        Recieve<br />

        {giveTradeItem != "Lumber" ?
          <button
            className={recieveTradeItem == "Lumber" && "selected"}
            onClick={() => setRecieveTradeItem("Lumber")} >
              {oneLumberIcon} +1
          </button> :
          <button disabled >{oneLumberIcon} +1</button>
        }
        {giveTradeItem != "Brick" ?
          <button
            className={recieveTradeItem == "Brick" && "selected"}
            onClick={() => setRecieveTradeItem("Brick")} >
              {oneBrickIcon} +1
          </button> :
          <button disabled >{oneBrickIcon} +1</button>
        }
        {giveTradeItem != "Wool" ?
          <button
            className={recieveTradeItem == "Wool" && "selected"}
            onClick={() => setRecieveTradeItem("Wool")} >
              {oneWoolIcon} +1
          </button> :
          <button disabled >{oneWoolIcon} +1</button>
        }
        {giveTradeItem != "Grain" ?
          <button
            className={recieveTradeItem == "Grain" && "selected"}
            onClick={() => setRecieveTradeItem("Grain")} >
              {oneGrainIcon} +1
          </button> :
          <button disabled >{oneGrainIcon} +1</button>
        }
        {giveTradeItem != "Ore" ?
          <button
            className={recieveTradeItem == "Ore" && "selected"}
            onClick={() => setRecieveTradeItem("Ore")} >
              {oneOreIcon} +1
          </button> :
          <button disabled >{oneOreIcon} +1</button>
        }
        Trade Result
        <div className={"tradeResult"}>
          <div>{oneLumberIcon} {playerResources.Lumber - (giveTradeItem == "Lumber" && lumberPortTradeCost) + (recieveTradeItem == "Lumber" && 1)}</div>
          <div>{oneBrickIcon} {playerResources.Brick - (giveTradeItem == "Brick" && brickPortTradeCost) + (recieveTradeItem == "Brick" && 1)}</div>
          <div>{oneWoolIcon} {playerResources.Wool - (giveTradeItem == "Wool" && woolPortTradeCost) + (recieveTradeItem == "Wool" && 1)}</div>
          <div>{oneGrainIcon} {playerResources.Grain - (giveTradeItem == "Grain" && grainPortTradeCost) + (recieveTradeItem == "Grain" && 1)}</div>
          <div>{oneOreIcon} {playerResources.Ore - (giveTradeItem == "Ore" && orePortTradeCost) + (recieveTradeItem == "Ore" && 1)}</div>
        </div>
      </div>
      {(giveTradeItem != null && recieveTradeItem != null) && <button onClick={completeTrade}>Make Trade</button>}
      <button onClick={() => setTurnStateToIdle()}>Go Back</button>

    </>
  )
}