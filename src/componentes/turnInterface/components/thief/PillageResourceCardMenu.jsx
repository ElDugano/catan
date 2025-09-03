import { useContext } from "react"
import { TurnStateContext } from "../../../../state/turnState/TurnStateContext"
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { DiceContext } from "../../../../state/dice/DiceContext";

export default function PillageResourceCardMenu() {
  const { setTurnStateToIdle, setTurnStateToRollingTheDice } = useContext(TurnStateContext);
  const { plunderedResourcePlayers, getAllPlayersTotalResourceCards, stealRandomCardFromPlayer } = useContext(PlayerResourceCardsContext);
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);
  const { haveDiceBeenRolledThisTurn } = useContext(DiceContext);

  let content=[];

  function stealCardsOnClick(victimPlayer){
    stealRandomCardFromPlayer(currentPlayerTurn, victimPlayer);
    console.log(haveDiceBeenRolledThisTurn());
    if (haveDiceBeenRolledThisTurn())
      setTurnStateToIdle();
    else
      setTurnStateToRollingTheDice();
  }

  const AllPlayersTotalCards = getAllPlayersTotalResourceCards();
  plunderedResourcePlayers.forEach((isPlayerPillaged, possibleVictimPlayer) => {
    if (isPlayerPillaged && possibleVictimPlayer != currentPlayerTurn){
      if(AllPlayersTotalCards[possibleVictimPlayer] != 0){
      content.push(
        <div key={crypto.randomUUID()}>
          Remove cards from Player {possibleVictimPlayer}? The player has {AllPlayersTotalCards[possibleVictimPlayer] == 1 ? "1 card" : AllPlayersTotalCards[possibleVictimPlayer] + " cards"}.
          <button onClick={() => {stealCardsOnClick(possibleVictimPlayer)}}>Rob Player {possibleVictimPlayer}</button>
        </div>
      )}
    }
  })
  if (content.length===0){
    content.push(<span key={crypto.randomUUID()}>You had nobody to rob. <button onClick={()=> {setTurnStateToIdle()}}>Continue</button></span>)
  }

  return (
    <>
    <h3>Pick the poor fool you wish to pillage a resource from.</h3>
    {content}
    </>
  )
}