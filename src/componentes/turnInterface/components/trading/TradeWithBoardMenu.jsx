import { useState, useContext } from "react"
import { PortOwnerContext } from "../../../../state/portOwner/PortOwnerContext"
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerColorContext } from "../../../../state/playerColor/PlayerColorContext";
import { TurnStateContext } from "../../../../state/turnState/TurnStateContext";
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext";
import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext";
import TradeWithPlayerMenu from "./tradeWithPlayerMenu";

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
  const { clientPlayerNumber, playerOrder } = useContext(CurrentPlayerTurnContext);
  const { playerColor } = useContext(PlayerColorContext);
  const { setTurnStateToIdle } = useContext(TurnStateContext);
  const { getAPlayersResourceCards } = useContext(PlayerResourceCardsContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  const defaultTradeCost = doesPlayerOwnStandardPort(clientPlayerNumber)  ? 3 : 4;
  const lumberPortTradeCost = doesPlayerOwnLumberPort(clientPlayerNumber) ? 2 : defaultTradeCost;
  const brickPortTradeCost = doesPlayerOwnBrickPort(clientPlayerNumber) ? 2 : defaultTradeCost;
  const woolPortTradeCost = doesPlayerOwnWoolPort(clientPlayerNumber) ? 2 : defaultTradeCost;
  const grainPortTradeCost = doesPlayerOwnGrainPort(clientPlayerNumber) ? 2 : defaultTradeCost;
  const orePortTradeCost = doesPlayerOwnOrePort(clientPlayerNumber) ? 2 : defaultTradeCost;

  const [giveTradeItem, setGiveTradeItem] = useState(null);
  const [recieveTradeItem, setRecieveTradeItem] = useState(null);

  const oneLumberIcon = <img src={lumberIcon} />;
  const oneBrickIcon = <img src={brickIcon} />;
  const oneWoolIcon = <img src={woolIcon} />;
  const oneGrainIcon = <img src={grainIcon} />;
  const oneOreIcon = <img src={oreIcon} />;

  const playerResources = getAPlayersResourceCards(clientPlayerNumber);

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
          giveTradeItem:{[giveTradeItem]:amountToTrade},
          giveTradeAmount: amountToTrade,
          recieveTradeItem: {[recieveTradeItem]:1},
          //recieveTradeAmount: 1,
          tradeTarget: null
        }
      }
    );
    sendTheMessages();
    setTurnStateToIdle();
  }

  const toggleGiveTradeItem = (resource) => {
    if (resource == giveTradeItem)
      setGiveTradeItem(null);
    else
      setGiveTradeItem(resource);
  }

  const toggleRecieveTradeItem = (resource) => {
    if (resource == recieveTradeItem)
      setRecieveTradeItem(null);
    else
      setRecieveTradeItem(resource);
  }

  const [tradePartner, setTradePartner] = useState(null);
  const toggleTradePartner = (newPartner) => {
    if (newPartner == tradePartner)
      setTradePartner(null);
    else
      setTradePartner(newPartner);
  }

  const TradePartnerSelectMenu = () => {
    let content = [];
    if (tradePartner != null)
      content.push(<button onClick={() => toggleTradePartner(null)}>Port</button>);
    playerOrder.forEach((playerNumber) => {
      if (playerColor[playerNumber] == false)
        console.log("YEAH, WE FOUND IT HERE", playerNumber)
      if (playerNumber != clientPlayerNumber && playerNumber != tradePartner)
        content.push(
          <button
            key={crypto.randomUUID()}
            className={"playerButton"+playerColor[playerNumber]}
            onClick={() => toggleTradePartner(playerNumber)}
          >
            Player {playerNumber}
          </button>);
    })
    return (
      <div>
        {content}
      </div>
    )
  }

  if (tradePartner != null) {
    return(
      <>
      <h3>Trade with {tradePartner != null ? "Player "+tradePartner : "The Port"}</h3>
      <TradePartnerSelectMenu />
      <TradeWithPlayerMenu tradePartner={tradePartner}/>
      </>
    )
  }

  return(
    <>
      <h3>Trade with {tradePartner != null ? "Player "+tradePartner : "The Port"}</h3>
      <TradePartnerSelectMenu />
      <div className={"tradeWithBoardMenu"}>
        Give to {tradePartner != null ? "Player "+tradePartner : "The Port"}<br />
        {recieveTradeItem != "Lumber" && playerResources.Lumber >= lumberPortTradeCost ?
          <button
            className={giveTradeItem == "Lumber" ? "selected" : ""}
            onClick={() => toggleGiveTradeItem("Lumber")}>
              {oneLumberIcon} -{lumberPortTradeCost}
          </button> :
          <button disabled>{oneLumberIcon} -{lumberPortTradeCost}</button>
        }
        {recieveTradeItem != "Brick" && playerResources.Brick >= brickPortTradeCost ?
          <button
            className={giveTradeItem == "Brick" ? "selected" : ""}
            onClick={() => toggleGiveTradeItem("Brick")}>
              {oneBrickIcon} -{brickPortTradeCost}
          </button> :
          <button disabled>{oneBrickIcon} -{brickPortTradeCost}</button>
        }
        {recieveTradeItem != "Wool" && playerResources.Wool >= woolPortTradeCost ?
          <button
            className={giveTradeItem == "Wool" ? "selected" : ""}
            onClick={() => toggleGiveTradeItem("Wool")}>
              {oneWoolIcon} -{woolPortTradeCost}
          </button> :
          <button disabled>{oneWoolIcon} -{woolPortTradeCost}</button>
        }
        {recieveTradeItem != "Grain" && playerResources.Grain >= grainPortTradeCost ?
          <button
            className={giveTradeItem == "Grain" ? "selected" : ""}
            onClick={() => toggleGiveTradeItem("Grain")}>
              {oneGrainIcon} -{grainPortTradeCost}
          </button> :
          <button disabled>{oneGrainIcon} -{grainPortTradeCost}</button>
        }
        {recieveTradeItem != "Ore" && playerResources.Ore >= orePortTradeCost ?
          <button
            className={giveTradeItem == "Ore" ? "selected" : ""}
            onClick={() => toggleGiveTradeItem("Ore")}>
              {oneOreIcon} -{orePortTradeCost}
          </button> :
          <button disabled>{oneOreIcon} -{orePortTradeCost}</button>
        }

        Recieve from {tradePartner != null ? "Player "+tradePartner : "The Port"}<br />

        {giveTradeItem != "Lumber" ?
          <button
            className={recieveTradeItem == "Lumber" ? "selected" : ""}
            onClick={() => toggleRecieveTradeItem("Lumber")} >
              {oneLumberIcon} +1
          </button> :
          <button disabled >{oneLumberIcon} +1</button>
        }
        {giveTradeItem != "Brick" ?
          <button
            className={recieveTradeItem == "Brick" ? "selected" : ""}
            onClick={() => toggleRecieveTradeItem("Brick")} >
              {oneBrickIcon} +1
          </button> :
          <button disabled >{oneBrickIcon} +1</button>
        }
        {giveTradeItem != "Wool" ?
          <button
            className={recieveTradeItem == "Wool" ? "selected" : ""}
            onClick={() => toggleRecieveTradeItem("Wool")} >
              {oneWoolIcon} +1
          </button> :
          <button disabled >{oneWoolIcon} +1</button>
        }
        {giveTradeItem != "Grain" ?
          <button
            className={recieveTradeItem == "Grain" ? "selected" : ""}
            onClick={() => toggleRecieveTradeItem("Grain")} >
              {oneGrainIcon} +1
          </button> :
          <button disabled >{oneGrainIcon} +1</button>
        }
        {giveTradeItem != "Ore" ?
          <button
            className={recieveTradeItem == "Ore" ? "selected" : ""}
            onClick={() => toggleRecieveTradeItem("Ore")} >
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
      <div className="proceedBackButtonHolder">
        <button onClick={() => setTurnStateToIdle()}>Back</button>
        {(giveTradeItem != null && recieveTradeItem != null) ? <button onClick={completeTrade}>Make Trade</button> : <button disabled>Make Trade</button>}
      </div>
    </>
  )
}