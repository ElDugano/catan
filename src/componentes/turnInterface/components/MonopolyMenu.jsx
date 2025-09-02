import { useContext } from "react"
import { PlayerResourceCardsContext } from "../../../state/playerResourceCards/PlayerResourceCardsContext"
import { TurnStateContext } from "../../../state/turnState/TurnStateContext";
import { CurrentPlayerTurnContext } from "../../../state/currentPlayerTurn/CurrentPlayerTurnContext";

export default function MonopolyMenu() {
  const { monopolizeLumber,
          monopolizeBrick,
          monopolizeWool,
          monopolizeGrain,
          monopolizeOre} = useContext(PlayerResourceCardsContext)
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext); 
  const { setTurnStateToIdle } = useContext(TurnStateContext);

  function selectMonopolizeLumber() {
    monopolizeLumber(currentPlayerTurn);
    setTurnStateToIdle();
  }
  function selectMonopolizeBrick() {
    monopolizeBrick(currentPlayerTurn);
    setTurnStateToIdle();
  }
  function selectMonopolizeWool() {
    monopolizeWool(currentPlayerTurn);
    setTurnStateToIdle();
  }
  function selectMonopolizeGrain() {
    monopolizeGrain(currentPlayerTurn);
    setTurnStateToIdle();
  }
  function selectMonopolizeOre() {
    monopolizeOre(currentPlayerTurn);
    setTurnStateToIdle();
  }

  return(
  <>
    <h3>Select a resource to monopolize</h3>
    <button onClick={() => selectMonopolizeLumber()}>Lumber</button>
    <button onClick={() => selectMonopolizeBrick()}>Brick</button>
    <button onClick={() => selectMonopolizeWool()}>Wool</button>
    <button onClick={() => selectMonopolizeGrain()}>Grain</button>
    <button onClick={() => selectMonopolizeOre()}>Ore</button>
  </>
  )
}