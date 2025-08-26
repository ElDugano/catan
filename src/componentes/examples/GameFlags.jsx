import { GameFlagsContext } from './GameFlagsContext.js'

import gameFlags from '../assets/data/gameFlags.json';

export const GameFlags = ({ children }) => {
  return (
      <GameFlagsContext.Provider value={gameFlags}>
        {children}
      </GameFlagsContext.Provider>
  )
}