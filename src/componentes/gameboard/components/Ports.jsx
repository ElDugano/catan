import { useContext } from "react";
import { PortTilesContext } from "../state/portTiles/PortTilesContext";

export default function Ports() {
  const { portTiles } = useContext(PortTilesContext);
  console.log(portTiles);

  let content = [];
  Object.keys(portTiles).forEach(x => {
    Object.keys(portTiles[x]).forEach(y => {
      console.log(portTiles[x][y].type);
      if (portTiles[x][y].type != "Ocean") {
        let translateValue = "translate(" + (x*30) + "," + (y*50) + ")";
        content.push(
          <g key={crypto.randomUUID()}>
            <polygon 
              className="hex"
              points="30,70 60,50 60,20 30,0 0,20 0,50"
              transform={translateValue}
            />
            <circle
              r="7"
              cx={portTiles[x][y].port1.x*30+30}
              cy={( portTiles[x][y].port1.x%2 !== 0 &&
                    portTiles[x][y].port1.y%2 == 0) ||
                    ( portTiles[x][y].port1.x%2 == 0 &&
                      portTiles[x][y].port1.y%2 !== 0) ? portTiles[x][y].port1.y*50 : portTiles[x][y].port1.y*50+20}
              fill="black"
            />
            <circle
              r="7"
              cx={portTiles[x][y].port2.x*30+30}
              cy={( portTiles[x][y].port2.x%2 !== 0 &&
                    portTiles[x][y].port2.y%2 == 0) ||
                    ( portTiles[x][y].port2.x%2 == 0 &&
                      portTiles[x][y].port2.y%2 !== 0) ? portTiles[x][y].port2.y*50 : portTiles[x][y].port2.y*50+20}
              fill="black"
            />
          </g>
        )
      }
    })
  })
  return(
    <>
    {content}
    </>
  )
}