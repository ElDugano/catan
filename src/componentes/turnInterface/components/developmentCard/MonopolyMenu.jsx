import { useContext } from "react"
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext"
import { TurnStateContext } from "../../../../state/turnState/TurnStateContext";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";

import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext";


export default function MonopolyMenu() {
  const { setTurnStateToIdle } = useContext(TurnStateContext);

  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);



  const playMonopoly = (resource) => {
    addToMessagePayloadToHost({header: "Play Monopoly Card"});
    addToMessagePayloadToHost({playMonopoly: resource});
    sendTheMessages();
    setTurnStateToIdle();
  }

  return(
  <>
    <h3>Select a resource to monopolize</h3>
    <button onClick={() => playMonopoly("Lumber")}>Lumber</button>
    <button onClick={() => playMonopoly("Brick")}>Brick</button>
    <button onClick={() => playMonopoly("Wool")}>Wool</button>
    <button onClick={() => playMonopoly("Grain")}>Grain</button>
    <button onClick={() => playMonopoly("Ore")}>Ore</button>
  </>
  )
}