import { useContext } from "react"
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { NetworkingMessageSenderContext } from "../../../networking/Host/NetworkingMessageSenderContext";

export default function RobAPlayer() {
  const { robbingTargetPlayers, getAllPlayersTotalResourceCards } = useContext(PlayerResourceCardsContext);
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);
  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);


  let content=[];

  function stealACardOnClick(victimPlayer){
    console.log("Steal a card from ", victimPlayer);
    addToMessagePayloadToHost({header: "Stealing A Card"});
    addToMessagePayloadToHost({stealACard:victimPlayer});
    sendTheMessages();
  }

  const AllPlayersTotalCards = getAllPlayersTotalResourceCards();
  robbingTargetPlayers.forEach((isPlayerPillaged, possibleVictimPlayer) => {
    if (isPlayerPillaged && possibleVictimPlayer != currentPlayerTurn){
      if(AllPlayersTotalCards[possibleVictimPlayer] != 0){
      content.push(
        <div key={crypto.randomUUID()}>
          Remove cards from Player {possibleVictimPlayer}? The player has {AllPlayersTotalCards[possibleVictimPlayer] == 1 ? "1 card" : AllPlayersTotalCards[possibleVictimPlayer] + " cards"}.
          <button onClick={() => {stealACardOnClick(possibleVictimPlayer)}}>Rob Player {possibleVictimPlayer}</button>
        </div>
      )}
    }
  })
  if (content.length===0){
    const nobodyToRob = () => {
      addToMessagePayloadToHost({header: "Nobody To Rob"});
      addToMessagePayloadToHost({nobodyToRob:true});
      sendTheMessages();
    }
    return (
    <>
      You had nobody to rob. <button onClick={nobodyToRob}>Continue</button>
    </>
    )
  }
  return (
    <>
    <h3>Pick the poor fool you wish to pillage a resource from.</h3>
    {content}
    </>
  )
}