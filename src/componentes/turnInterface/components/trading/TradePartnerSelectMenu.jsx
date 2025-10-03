import { useContext, useState } from "react"
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerInformationContext } from "../../../../state/playerInformation/PlayerInformationContext";

export default function TradePartnerSelectMenu(props) {
  const { clientPlayerNumber, playerOrder } = useContext(CurrentPlayerTurnContext);
  const { playerColor, playerName } = useContext(PlayerInformationContext);

  const [openMenu, setOpenMenu] = useState(false);

  const setPlayer = (playerNumber) => {
    setOpenMenu(false);
    props.toggleTradePartner(playerNumber);
  }

  const toggleOpenMenu = () => {
    if (openMenu)
      setOpenMenu(false);
    else
      setOpenMenu(true);
  }

  let content = [];
  if (props.tradePartner != null)
    content.push(
      <button key={crypto.randomUUID()} onClick={() => setPlayer(null)}>
        <div></div>
        <span className="portColor">The Port</span>
      </button>
    );
  playerOrder.forEach((playerNumber) => {
    if (playerNumber != clientPlayerNumber && playerNumber != props.tradePartner)
      content.push(
        <button key={crypto.randomUUID()} onClick={() => setPlayer(playerNumber)} >
          <div></div>
          <span className={"playerTextColor"+playerColor[playerNumber]}>{playerName[playerNumber]}</span>
        </button>);
  })
  return (
    <div className={"tradePartnerSelect"}>
      <button onClick={() => toggleOpenMenu()} className={openMenu == true && "menuOpen"}>
        <div>Trade With </div>
        {props.tradePartner != null ?
          <span className={"playerTextColor"+playerColor[props.tradePartner]}>{playerName[props.tradePartner]}</span> :
          <span className="portColor">The Port</span>}
        {openMenu == true ?
          <i class="arrow down"></i> :
          <i class="arrow right"></i>
        }
        </button>
      <div className="tradePartnerSelectMenu">
        {openMenu == true && content}
      </div>
    </div>
  )
}