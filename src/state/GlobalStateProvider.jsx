import { GameState } from './gameState/GameState.jsx'
import { TurnState } from './turnState/TurnState.jsx'
import { NumberOfPlayers } from './numberOfPlayers/NumberOfPlayers.jsx'
import { CurrentPlayerTurn } from './currentPlayerTurn/CurrentPlayerTurn.jsx'
import { PlayerColor } from './playerColor/PlayerColor.jsx'
import { PlayerAvailableBuildings } from './playerAvailableBuildings/PlayerAvailableBuildings.jsx'
import { LastBuiltObject } from './lastBuiltObject/LastBuiltObject.jsx'
import { TileCornerNodes } from './tileCornerNodes/TileCornerNodes.jsx'

export default function GlobalStateProvider({ children }) {
  return (
    <GameState>
      <NumberOfPlayers>
        <TurnState>
          <CurrentPlayerTurn>
            <PlayerColor>
              <PlayerAvailableBuildings>
                <LastBuiltObject>
                  <TileCornerNodes>
                    { children }
                  </TileCornerNodes>
                </LastBuiltObject>
              </PlayerAvailableBuildings>
            </PlayerColor>
          </CurrentPlayerTurn>
        </TurnState>
      </NumberOfPlayers>
    </GameState>
  )
}