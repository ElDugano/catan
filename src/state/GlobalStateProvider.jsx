import { GameState } from './gameState/GameState.jsx'
import { TurnState } from './turnState/TurnState.jsx'
import { NumberOfPlayers } from './numberOfPlayers/NumberOfPlayers.jsx'
import { CurrentPlayerTurn } from './currentPlayerTurn/CurrentPlayerTurn.jsx'
import { PlayerColor } from './playerColor/PlayerColor.jsx'
import { PlayerAvailableBuildings } from './playerAvailableBuildings/PlayerAvailableBuildings.jsx'
import { Dice } from './dice/dice.jsx'

export default function GlobalStateProvider({ children }) {
  return (
    <GameState>
      <TurnState>
        <NumberOfPlayers>
          <CurrentPlayerTurn>
            <PlayerColor>
              <PlayerAvailableBuildings>
                <Dice>
                  { children }
                </Dice>
              </PlayerAvailableBuildings>
            </PlayerColor>
          </CurrentPlayerTurn>
        </NumberOfPlayers>
      </TurnState>
    </GameState>
  )
}