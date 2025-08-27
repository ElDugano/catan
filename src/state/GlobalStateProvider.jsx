import { GameState } from './gameState/GameState.jsx'
import { CurrentPlayer } from './currentPlayer/CurrentPlayer.jsx'
import { TurnState } from './turnState/TurnState.jsx'

export default function GlobalStateProvider({ children }) {
  return (
    <GameState>
      <TurnState>
        <CurrentPlayer>
          { children }
        </CurrentPlayer>
      </TurnState>
    </GameState>
  )
}