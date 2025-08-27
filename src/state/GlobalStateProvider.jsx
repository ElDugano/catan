import { GameState } from './gameState/GameState.jsx'
import { CurrentPlayer } from './currentPlayer/CurrentPlayer.jsx'
import { TurnState } from './turnState/TurnState.jsx'
import { PlayerColor } from './playerColor/PlayerColor.jsx'
import { PlayerAvailableBuildings } from './playerAvailableBuildings/PlayerAvailableBuildings.jsx'

export default function GlobalStateProvider({ children }) {
  return (
    <GameState>
      <TurnState>
        <CurrentPlayer>
          <PlayerColor>
            <PlayerAvailableBuildings>
              { children }
            </PlayerAvailableBuildings>
          </PlayerColor>
        </CurrentPlayer>
      </TurnState>
    </GameState>
  )
}