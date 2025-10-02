import backgroundMap from "./assets/gameboard.png"

import HostTiles from "./HostTiles"
import HostCities from './HostCities.jsx';
import HostRoads from './HostRoads.jsx';

export default function HostGameboard() {

  return(
    <svg viewBox="0 0 1920 1080">
      <image href={backgroundMap} width={'1920'} height={'1080'} />
      <g>
        <HostRoads y={1} />
        <HostCities y={1} />
        <HostTiles y={1} />
        <HostRoads y={2} />
        <HostCities y={2} />
        <HostTiles y={2} />
        <HostRoads y={3} />
        <HostCities y={3} />
        <HostTiles y={3} />
        <HostRoads y={4} />
        <HostCities y={4} />
        <HostTiles y={4} />
        <HostRoads y={5} />
        <HostCities y={5} />
        <HostTiles y={5} />
        <HostRoads y={6} />
        <HostCities y={6} />
      </g>
    </svg>
  )
}

        {/*<TileCornerNodes>
          <LandTiles>
            <PortTiles>
              <ThiefLocation>
                <LandTileNumbers>*/}

                {/*</LandTileNumbers>
              </ThiefLocation>
            </PortTiles>
          </LandTiles>
        </TileCornerNodes>*/}