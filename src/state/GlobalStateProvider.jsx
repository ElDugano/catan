import { GameState } from './gameState/GameState.jsx'
import { TurnState } from './turnState/TurnState.jsx'
import { NumberOfPlayers } from './numberOfPlayers/NumberOfPlayers.jsx'
import { CurrentPlayerTurn } from './currentPlayerTurn/CurrentPlayerTurn.jsx'
import { PlayerColor } from './playerColor/PlayerColor.jsx'
import { PlayerAvailableBuildings } from './playerAvailableBuildings/PlayerAvailableBuildings.jsx'

export default function GlobalStateProvider({ children }) {
  return (
    <GameState>
      <NumberOfPlayers>
        <TurnState>
          <CurrentPlayerTurn>
            <PlayerColor>
              <PlayerAvailableBuildings>
                { children }
              </PlayerAvailableBuildings>
            </PlayerColor>
          </CurrentPlayerTurn>
        </TurnState>
      </NumberOfPlayers>
    </GameState>
  )
}