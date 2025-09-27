import { useContext } from "react"
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerInformationContext } from "../../../../state/playerInformation/PlayerInformationContext";

export default function TradePartnerSelectMenu(props) {
  const { clientPlayerNumber, playerOrder } = useContext(CurrentPlayerTurnContext);
  const { playerColor, playerName } = useContext(PlayerInformationContext);

  const setPlayer = (playerNumber) => {
    props.setOpenMenu();
    props.toggleTradePartner(playerNumber);
  }

  let content = [];
  if (props.tradePartner != null)
    content.push(<button key={crypto.randomUUID()} onClick={() => setPlayer(null)}>Trade with the Port</button>);
  playerOrder.forEach((playerNumber) => {
    if (playerNumber != clientPlayerNumber && playerNumber != props.tradePartner)
      content.push(
        <button
          key={crypto.randomUUID()}
          className={"playerButton"+playerColor[playerNumber]}
          onClick={() => setPlayer(playerNumber)}
        >
          Trade with {playerName[playerNumber]}
        </button>);
  })
  return (
    <div>
      {content}
    </div>
  )
}