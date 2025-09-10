import { Networking } from '../componentes/networking/State/Networking.jsx'
import { NetworkingMessageSender } from '../componentes/networking/Host/NetworkingMessageSender.jsx'
import { GameState } from './gameState/GameState.jsx'
import { TurnState } from './turnState/TurnState.jsx'
import { CurrentPlayerTurn } from './currentPlayerTurn/CurrentPlayerTurn.jsx'
import { PlayerColor } from './playerColor/PlayerColor.jsx'
import { PlayerAvailableBuildings } from './playerAvailableBuildings/PlayerAvailableBuildings.jsx'
import { Dice } from './dice/Dice.jsx'
import { PlayerResourceCards } from './playerResourceCards/PlayerResourceCards.jsx'
import { DevelopmentCards } from './developmentCards/DevelopmentCards.jsx'
import { ScoreBoard } from './scoreBoard/ScoreBoard.jsx'
import { PortOwner } from './portOwner/PortOwner.jsx'

export default function GlobalStateProvider({ children }) {
  return (
      <CurrentPlayerTurn>
        <PlayerColor>{/* These two above should just be grouped together. */}
          <Networking>
            <NetworkingMessageSender>
              <GameState>
                <TurnState>
                  <PlayerAvailableBuildings>
                    <PlayerResourceCards>
                      <DevelopmentCards>
                        <Dice>
                          <ScoreBoard>
                            <PortOwner>
                              { children }
                            </PortOwner>
                          </ScoreBoard>
                        </Dice>
                      </DevelopmentCards>
                    </PlayerResourceCards>
                  </PlayerAvailableBuildings>
                </TurnState>
              </GameState>
            </NetworkingMessageSender>
          </Networking>
        </PlayerColor>
      </CurrentPlayerTurn>
  )
}