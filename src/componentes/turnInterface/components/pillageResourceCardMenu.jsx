import { useContext } from "react"
import { TurnStateContext } from "../../../state/turnState/TurnStateContext"
import { PlayerResourceCardsContext } from "../../../state/playerResourceCards/PlayerResourceCardsContext";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext";

export default function PillageResourceCardMenu() {
  const { setTurnStateToIdle } = useContext(TurnStateContext);
  const { plunderedResourcePlayers, getAllPlayersTotalResourceCards, stealRandomCardFromPlayer } = useContext(PlayerResourceCardsContext);
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);

  let content=[];

  function stealCardsOnClick(victimPlayer){
    stealRandomCardFromPlayer(currentPlayerTurn, victimPlayer);
    setTurnStateToIdle();
  }

  const AllPlayersTotalCards = getAllPlayersTotalResourceCards();
  plunderedResourcePlayers.forEach((isPlayerPillaged, possibleVictimPlayer) => {
    console.log("Starting to see who needs to hand over cards.");
    if (isPlayerPillaged && possibleVictimPlayer != currentPlayerTurn){
      console.log(possibleVictimPlayer + " might need to hand over a card.");
      content.push(
        <div key={crypto.randomUUID()}>
          Remove cards from Player {possibleVictimPlayer}? The player has {AllPlayersTotalCards[possibleVictimPlayer] == 1 ? "1 card" : AllPlayersTotalCards[possibleVictimPlayer] + " cards"}.
          <button onClick={() => {stealCardsOnClick(possibleVictimPlayer)}}>Rob Player {possibleVictimPlayer}</button>
        </div>
      )
    }
    //THIS NEEDS TO DO SOME ERROR CHECKING.
    //If a player has 0 cards, then don't display them.
    //Don't display self as a target? (I think that should be taken care of, but I haven't tested it at the time of writing this)
    //If there are no options, then you just need to move onto the next stage of the game.
  })

  return (
    <>
    <h3>Pick the poor fool you wish to pillage a resource from.</h3>
    {content}
    <button onClick={()=> setTurnStateToIdle()}>Just get me out of here, please.</button>
    </>
  )
}