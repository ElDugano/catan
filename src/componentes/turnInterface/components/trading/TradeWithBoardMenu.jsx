import { useState, useContext } from "react"
import { PortOwnerContext } from "../../../../state/portOwner/PortOwnerContext"
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { TurnStateContext } from "../../../../state/turnState/TurnStateContext";
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext";

export default function TradeWithBoardMenu() {
  const { doesPlayerOwnStandardPort,
          doesPlayerOwnWoolPort,
          doesPlayerOwnGrainPort,
          doesPlayerOwnLumberPort,
          doesPlayerOwnBrickPort,
          doesPlayerOwnOrePort} = useContext(PortOwnerContext);
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);
  const { setTurnStateToIdle } = useContext(TurnStateContext);
  const { /*getAPlayersResourceCards,*/ tradeResources } = useContext(PlayerResourceCardsContext);

  const defaultTradeCost = doesPlayerOwnStandardPort(currentPlayerTurn)  ? 3 : 4; 
  const woolPortTradeCost = doesPlayerOwnWoolPort(currentPlayerTurn) ? 2 : defaultTradeCost;
  const grainPortTradeCost = doesPlayerOwnGrainPort(currentPlayerTurn) ? 2 : defaultTradeCost;
  const lumberPortTradeCost = doesPlayerOwnLumberPort(currentPlayerTurn) ? 2 : defaultTradeCost;
  const brickPortTradeCost = doesPlayerOwnBrickPort(currentPlayerTurn) ? 2 : defaultTradeCost;
  const orePortTradeCost = doesPlayerOwnOrePort(currentPlayerTurn) ? 2 : defaultTradeCost;

  const [giveTradeItem, setGiveTradeItem] = useState(null);
  const [recieveTradeItem, setRecieveTradeItem] = useState(null);

  //This needs to do error checking compared to how many resources the player actually hase
  const completeTrade = () => {
    console.log("We are doing the trade!")
    let amountToTrade;
    switch (giveTradeItem) {
      case "Wool":
        amountToTrade = woolPortTradeCost;
        break;
      case "Grain":
        amountToTrade = grainPortTradeCost;
        break;
      case "Lumber":
        amountToTrade = lumberPortTradeCost;
        break;
      case "Brick":
        amountToTrade = brickPortTradeCost;
        break;
      case "Ore":
        amountToTrade = orePortTradeCost;
        break;
    }

    tradeResources(currentPlayerTurn,{[giveTradeItem]:amountToTrade},null,{[recieveTradeItem]:1});

    setTurnStateToIdle();
  }
  return(
    <>
      <h3>Trade with the board. {doesPlayerOwnStandardPort(currentPlayerTurn)  ? "He owns a sweet port" : "He don't own shit."}</h3>
      <h4>You will trade away to the port</h4>
      <button onClick={() => setGiveTradeItem("Wool")}>{woolPortTradeCost} Wool</button>
      <button onClick={() => setGiveTradeItem("Grain")}>{grainPortTradeCost} Grain</button>
      <button onClick={() => setGiveTradeItem("Lumber")}>{lumberPortTradeCost} Lumber</button>
      <button onClick={() => setGiveTradeItem("Brick")}>{brickPortTradeCost} Brick</button>
      <button onClick={() => setGiveTradeItem("Ore")}>{orePortTradeCost} Ore</button>
      {giveTradeItem != null && "You are trading away "+giveTradeItem}
      <h4>You will recieve back</h4>
      <button onClick={() => setRecieveTradeItem("Wool")}>1 Wool</button>
      <button onClick={() => setRecieveTradeItem("Grain")}>1 Grain</button>
      <button onClick={() => setRecieveTradeItem("Lumber")}>1 Lumber</button>
      <button onClick={() => setRecieveTradeItem("Brick")}>1 Brick</button>
      <button onClick={() => setRecieveTradeItem("Ore")}>1 Ore</button>
      {recieveTradeItem != null && "You will recieve back "+recieveTradeItem}
      <br />
      {(giveTradeItem != null && recieveTradeItem != null) && <button onClick={completeTrade}>Do the trade!</button>}
      <button onClick={() => setTurnStateToIdle()}>Go Back</button>
    </>
  )
}