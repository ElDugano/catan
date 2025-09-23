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
  const { setTurnStateToIdle } = useContext(TurnStateContext);
  const { getAPlayersResourceCards } = useContext(PlayerResourceCardsContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);
  const playerResources = getAPlayersResourceCards(clientPlayerNumber);



  const [giveTradeItem, setGiveTradeItem] = useState({Lumber:0,Brick:0,Wool:0,Grain:0,Ore:0});
  const [recieveTradeItem, setRecieveTradeItem] = useState({Lumber:0,Brick:0,Wool:0,Grain:0,Ore:0});

  const oneLumberIcon = <img src={lumberIcon} />;
  const oneBrickIcon = <img src={brickIcon} />;
  const oneWoolIcon = <img src={woolIcon} />;
  const oneGrainIcon = <img src={grainIcon} />;
  const oneOreIcon = <img src={oreIcon} />;

  const adjustGiveResource = (resourceType, adjustment) => {
    let newGiveTradeItem = {...giveTradeItem};
    newGiveTradeItem[resourceType] += adjustment;
    setGiveTradeItem(newGiveTradeItem);
  }

  const adjustRecieveResource = (resourceType, adjustment) => {
    let newRecieveTradeItem = {...recieveTradeItem};
    newRecieveTradeItem[resourceType] += adjustment;
    setRecieveTradeItem(newRecieveTradeItem);
  }

  const offerTrade = () => {
    addToMessagePayloadToHost({header: "Trade Resources"});
    addToMessagePayloadToHost(
      { tradeResourceCards:
        { 
          giveTradeItem: giveTradeItem,
          recieveTradeItem: recieveTradeItem,
          tradeTargetPlayer: props.tradePartner
        }
      }
    );
    sendTheMessages();
    setTurnStateToIdle();
  }

  return (
    <>
      Give to {props.tradePartner != null ? "Player "+props.tradePartner : "The Port"}<br />
      <div className={"tradeWithPlayerMenu"}>
        <div className="resourceHolder">
          {oneLumberIcon}
          <div>{giveTradeItem.Lumber}</div>
          {recieveTradeItem.Lumber == 0 && giveTradeItem.Lumber < playerResources.Lumber ? <button onClick={() => adjustGiveResource("Lumber", 1)}>+</button> : <button disabled >+</button>}
          {giveTradeItem.Lumber > 0 ? <button onClick={() => adjustGiveResource("Lumber", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneBrickIcon}
          <div>{giveTradeItem.Brick}</div>
          {recieveTradeItem.Brick == 0 && giveTradeItem.Brick < playerResources.Brick ? <button onClick={() => adjustGiveResource("Brick", 1)}>+</button> : <button disabled >+</button>}
          {giveTradeItem.Brick > 0 ? <button onClick={() => adjustGiveResource("Brick", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneWoolIcon}
          <div>{giveTradeItem.Wool}</div>
          {recieveTradeItem.Wool == 0 && giveTradeItem.Wool < playerResources.Wool ? <button onClick={() => adjustGiveResource("Wool", 1)}>+</button> : <button disabled >+</button>}
          {giveTradeItem.Wool > 0 ? <button onClick={() => adjustGiveResource("Wool", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneGrainIcon}
          <div>{giveTradeItem.Grain}</div>
          {recieveTradeItem.Grain == 0 && giveTradeItem.Grain < playerResources.Grain ? <button onClick={() => adjustGiveResource("Grain", 1)}>+</button> : <button disabled >+</button>}
          {giveTradeItem.Grain > 0 ? <button onClick={() => adjustGiveResource("Grain", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneOreIcon}
          <div>{giveTradeItem.Ore}</div>
          {recieveTradeItem.Ore == 0 && giveTradeItem.Ore < playerResources.Ore ? <button onClick={() => adjustGiveResource("Ore", 1)}>+</button> : <button disabled >+</button>}
          {giveTradeItem.Ore > 0 ? <button onClick={() => adjustGiveResource("Ore", -1)}>-</button> : <button disabled >-</button>}
        </div>
      </div>
      Recieve from {props.tradePartner != null ? "Player "+props.tradePartner : "The Port"}<br />
      <div className={"tradeWithPlayerMenu"}>
        <div className="resourceHolder">
          {oneLumberIcon}
          <div>{recieveTradeItem.Lumber}</div>
          {giveTradeItem.Lumber == 0 ? <button onClick={() => adjustRecieveResource("Lumber", 1)}>+</button> : <button disabled >+</button>}
          {recieveTradeItem.Lumber > 0 ? <button onClick={() => adjustRecieveResource("Lumber", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneBrickIcon}
          <div>{recieveTradeItem.Brick}</div>
          {giveTradeItem.Brick == 0 ? <button onClick={() => adjustRecieveResource("Brick", 1)}>+</button> : <button disabled >+</button>}
          {recieveTradeItem.Brick > 0 ? <button onClick={() => adjustRecieveResource("Brick", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneWoolIcon}
          <div>{recieveTradeItem.Wool}</div>
          {giveTradeItem.Wool == 0 ? <button onClick={() => adjustRecieveResource("Wool", 1)}>+</button> : <button disabled >+</button>}
          {recieveTradeItem.Wool > 0 ? <button onClick={() => adjustRecieveResource("Wool", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneGrainIcon}
          <div>{recieveTradeItem.Grain}</div>
          {giveTradeItem.Grain == 0 ? <button onClick={() => adjustRecieveResource("Grain", 1)}>+</button> : <button disabled >+</button>}
          {recieveTradeItem.Grain > 0 ? <button onClick={() => adjustRecieveResource("Grain", -1)}>-</button> : <button disabled >-</button>}
        </div>
        <div className="resourceHolder">
          {oneOreIcon}
          <div>{recieveTradeItem.Ore}</div>
          {giveTradeItem.Ore == 0 ? <button onClick={() => adjustRecieveResource("Ore", 1)}>+</button> : <button disabled >+</button>}
          {recieveTradeItem.Ore > 0 ? <button onClick={() => adjustRecieveResource("Ore", -1)}>-</button> : <button disabled >-</button>}
        </div>
      </div>
            <div className="proceedBackButtonHolder">
        <button onClick={() => setTurnStateToIdle()}>Back</button>
        {(giveTradeItem.Lumber + giveTradeItem.Brick + giveTradeItem.Wool + giveTradeItem.Grain + giveTradeItem.Ore != 0 && 
          recieveTradeItem.Lumber + recieveTradeItem.Brick + recieveTradeItem.Wool + recieveTradeItem.Grain + recieveTradeItem.Ore != 0) ?
          <button onClick={offerTrade}>Offer Trade</button> :
          <button disabled>Offer Trade</button>}
      </div>
    </>
  )
}


/*

<div>
          {recieveTradeItem != "Brick" && playerResources.Brick >= brickPortTradeCost ?
            <button
              className={giveTradeItem == "Brick" && "selected"}>
                {oneBrickIcon} -{brickPortTradeCost}
            </button> :
            <button disabled>{oneBrickIcon} -{brickPortTradeCost}</button>
          }
          {recieveTradeItem != "Wool" && playerResources.Wool >= woolPortTradeCost ?
            <button
              className={giveTradeItem == "Wool" && "selected"}>
                {oneWoolIcon} -{woolPortTradeCost}
            </button> :
            <button disabled>{oneWoolIcon} -{woolPortTradeCost}</button>
          }
          {recieveTradeItem != "Grain" && playerResources.Grain >= grainPortTradeCost ?
            <button
              className={giveTradeItem == "Grain" && "selected"}>
                {oneGrainIcon} -{grainPortTradeCost}
            </button> :
            <button disabled>{oneGrainIcon} -{grainPortTradeCost}</button>
          }
          {recieveTradeItem != "Ore" && playerResources.Ore >= orePortTradeCost ?
            <button
              className={giveTradeItem == "Ore" && "selected"}>
                {oneOreIcon} -{orePortTradeCost}
            </button> :
            <button disabled>{oneOreIcon} -{orePortTradeCost}</button>
          }

          Recieve from {props.tradePartner != null ? "Player "+props.tradePartner : "The Port"}<br />

          {giveTradeItem != "Lumber" ?
            <button
              className={recieveTradeItem == "Lumber" && "selected"}>
                {oneLumberIcon} +1
            </button> :
            <button disabled >{oneLumberIcon} +1</button>
          }
          {giveTradeItem != "Brick" ?
            <button
              className={recieveTradeItem == "Brick" && "selected"}>
                {oneBrickIcon} +1
            </button> :
            <button disabled >{oneBrickIcon} +1</button>
          }
          {giveTradeItem != "Wool" ?
            <button
              className={recieveTradeItem == "Wool" && "selected"}>
                {oneWoolIcon} +1
            </button> :
            <button disabled >{oneWoolIcon} +1</button>
          }
          {giveTradeItem != "Grain" ?
            <button
              className={recieveTradeItem == "Grain" && "selected"}>
                {oneGrainIcon} +1
            </button> :
            <button disabled >{oneGrainIcon} +1</button>
          }
          {giveTradeItem != "Ore" ?
            <button
              className={recieveTradeItem == "Ore" && "selected"}>
                {oneOreIcon} +1
            </button> :
            <button disabled >{oneOreIcon} +1</button>
          }
          Trade Result
        </div>


*/