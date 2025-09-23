import { useState, useContext } from "react"
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerColorContext } from "../../../../state/playerColor/PlayerColorContext";
import { TurnStateContext } from "../../../../state/turnState/TurnStateContext";
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext";
import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext";
import TradeWithBoardMenu from "./TradeWithBoardMenu";
import TradeWithPlayerMenu from "./tradeWithPlayerMenu";

import "./tradeMenu.css";

import lumberIcon from "../../../../assets/lumberIcon.svg";
import brickIcon from "../../../../assets/brickIcon.svg";
import woolIcon from "../../../../assets/woolIcon.svg";
import grainIcon from "../../../../assets/grainIcon.svg";
import oreIcon from "../../../../assets/oreIcon.svg";

export default function TradeMenu() {

  const { clientPlayerNumber, playerOrder } = useContext(CurrentPlayerTurnContext);
  const { playerColor } = useContext(PlayerColorContext);
  const { setTurnStateToIdle } = useContext(TurnStateContext);
  const { getAPlayersResourceCards } = useContext(PlayerResourceCardsContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);


  const oneLumberIcon = <img src={lumberIcon} />;
  const oneBrickIcon = <img src={brickIcon} />;
  const oneWoolIcon = <img src={woolIcon} />;
  const oneGrainIcon = <img src={grainIcon} />;
  const oneOreIcon = <img src={oreIcon} />;

  const playerResources = getAPlayersResourceCards(clientPlayerNumber);

  const [tradePartner, setTradePartner] = useState(null);
  const [giveResources, setGiveResources] = useState({Lumber:0,Brick:0,Wool:0,Grain:0,Ore:0})
  const [recieveResources, setRecieveResources] = useState({Lumber:0,Brick:0,Wool:0,Grain:0,Ore:0})
    //Remove this one ASAP.

  const toggleTradePartner = (newPartner) => {
      //TODO: This doesn't need to be a toggle, really.
    if (newPartner == tradePartner)
      setTradePartner(null);
    else
      setTradePartner(newPartner);
    setGiveResources({Lumber:0,Brick:0,Wool:0,Grain:0,Ore:0});
    setRecieveResources({Lumber:0,Brick:0,Wool:0,Grain:0,Ore:0});
  }

  const TradePartnerSelectMenu = () => {
    let content = [];
    if (tradePartner != null)
      content.push(<button key={crypto.randomUUID()} onClick={() => toggleTradePartner(null)}>Port</button>);
    playerOrder.forEach((playerNumber) => {
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


  const initiateTrade = () => {
    console.log("SHALL WE TRADE");
    //Check to see if we are offering or just doing the trade.
    addToMessagePayloadToHost({header: "Trade Resources"});
    if (tradePartner == null)
      addToMessagePayloadToHost(
        { tradeResourceCards:
          { 
            giveTradeItem: giveResources,
            recieveTradeItem: recieveResources,
            tradeTargetPlayer: null//Can be a player number, but should always be null here as otherwise we are asking to trade.
          }
        }
      );
    else  //This should be offering a trade, not forcing it.
      addToMessagePayloadToHost(
        { tradeResourceCards:
          { 
            giveTradeItem: giveResources,
            recieveTradeItem: recieveResources,
            tradeTargetPlayer: tradePartner
          }
        }
      );
    sendTheMessages();
    setTurnStateToIdle();
  }

  let resultIconStyle = {Lumber:"",Brick:"",Wool:"",Grain:"",Ore:""};
  for ( let resource in resultIconStyle ) {
    if ( giveResources[resource] > 0 )
      resultIconStyle[resource] = "negativeNumber"
    else if (recieveResources[resource] > 0 )
      resultIconStyle[resource] = "positiveNumber"
  }

  return(
    <>
      <h3>Trade with {tradePartner != null ? "Player "+tradePartner : "The Port"}</h3>
      <TradePartnerSelectMenu />
      {tradePartner == null ?
        <TradeWithBoardMenu
          key={crypto.randomUUID()}
          giveResources={giveResources}
          setGiveResources={setGiveResources}
          recieveResources={recieveResources}
          setRecieveResources={setRecieveResources}
        /> :
        <TradeWithPlayerMenu
          key={crypto.randomUUID()}
          giveResources={giveResources}
          setGiveResources={setGiveResources}
          recieveResources={recieveResources}
          setRecieveResources={setRecieveResources}
          tradePartner={tradePartner}
        /> 
      }
        Trade Result
        <div className={"tradeWithBoardMenu"}>
          <div className={"tradeResult"}>
            <div className={resultIconStyle.Lumber}>{oneLumberIcon} {playerResources.Lumber - giveResources.Lumber + recieveResources.Lumber}</div>
            <div className={resultIconStyle.Brick}>{oneBrickIcon} {playerResources.Brick - giveResources.Brick + recieveResources.Brick}</div>
            <div className={resultIconStyle.Wool}>{oneWoolIcon} {playerResources.Wool - giveResources.Wool + recieveResources.Wool}</div>
            <div className={resultIconStyle.Grain}>{oneGrainIcon} {playerResources.Grain - giveResources.Grain + recieveResources.Grain}</div>
            <div className={resultIconStyle.Ore}>{oneOreIcon} {playerResources.Ore - giveResources.Ore + recieveResources.Ore}</div>
          </div>
        </div>
        <div className="proceedBackButtonHolder">
          <button onClick={() => setTurnStateToIdle()}>Back</button>
          {(giveResources.Lumber + giveResources.Brick + giveResources.Wool + giveResources.Grain + giveResources.Ore != 0 &&
            recieveResources.Lumber + recieveResources.Brick + recieveResources.Wool + recieveResources.Grain + recieveResources.Ore != 0) ?
            <button onClick={initiateTrade}>Make Trade</button> :
            <button disabled>Make Trade</button>}
        </div>
    </>
  )
}