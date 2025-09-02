import { GameState } from './gameState/GameState.jsx'
import { TurnState } from './turnState/TurnState.jsx'
import { NumberOfPlayers } from './numberOfPlayers/NumberOfPlayers.jsx'
import { CurrentPlayerTurn } from './currentPlayerTurn/CurrentPlayerTurn.jsx'
import { PlayerColor } from './playerColor/PlayerColor.jsx'
import { PlayerAvailableBuildings } from './playerAvailableBuildings/PlayerAvailableBuildings.jsx'
import { Dice } from './dice/Dice.jsx'
import { PlayerResourceCards } from './playerResourceCards/PlayerResourceCards.jsx'

export default function GlobalStateProvider({ children }) {
  return (
    <GameState>
      <TurnState>
        <NumberOfPlayers>
          <CurrentPlayerTurn>
            <PlayerColor>
              <PlayerAvailableBuildings>
                <PlayerResourceCards>
                  <Dice>
                    { children }
                  </Dice>
                </PlayerResourceCards>
              </PlayerAvailableBuildings>
            </PlayerColor>
          </CurrentPlayerTurn>
        </NumberOfPlayers>
      </TurnState>
    </GameState>
  )
}