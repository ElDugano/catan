import { useState, useContext } from "react"
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerColorContext } from "../../../../state/playerColor/PlayerColorContext";
import { TurnStateContext } from "../../../../state/turnState/TurnStateContext";
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext";
import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext";
import TradeWithBoardMenu from "./TradeWithBoardMenu";
import TradeWithPlayerMenu from "./tradeWithPlayerMenu";
import TradeResult from "./TradeResult";

import "./tradeMenu.css";

export default function TradeMenu() {

  const { clientPlayerNumber, playerOrder } = useContext(CurrentPlayerTurnContext);
  const { playerColor } = useContext(PlayerColorContext);
  const { setTurnStateToIdle, setTurnStateToReviewingTradeOffer } = useContext(TurnStateContext);
  const { updateTradeOffer } = useContext(PlayerResourceCardsContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

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
    console.log(tradePartner)
    //Check to see if we are offering or just doing the trade.
    addToMessagePayloadToHost({header: "Trade Resources"});
    if (tradePartner == null) {
      addToMessagePayloadToHost(
        { tradeResourceCards:
          { 
            giveTradeItem: giveResources,
            recieveTradeItem: recieveResources,
            tradeTargetPlayer: null//Can be a player number, but should always be null here as otherwise we are asking to trade.
          }
        }
      );
      setTurnStateToIdle();
    }
    else { //This should be offering a trade, not forcing it.
      addToMessagePayloadToHost(
        { offerTrade:
          { 
            giveTradeItem: giveResources,
            recieveTradeItem: recieveResources,
            tradeTargetPlayer: tradePartner
          }
        }
      );
      setTurnStateToReviewingTradeOffer();
      updateTradeOffer(clientPlayerNumber, giveResources, tradePartner, recieveResources);
        //I could update this backwards to make the next menu easier. Or the reverse.
    }
    sendTheMessages();
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
      <TradeResult giveResources={giveResources} recieveResources={recieveResources} />
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