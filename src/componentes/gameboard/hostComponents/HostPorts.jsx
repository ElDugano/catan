import { useContext } from "react";
import { PortTilesContext } from "../state/portTiles/PortTilesContext";

import shipIcon from "../../../assets/shipIcon.svg"
import sidePortIcon from "../../../assets/sidePortIcon.svg"
import angePortIcon from "../../../assets/angePortIcon.svg"
import lumberIcon from "../../../assets/lumberIcon.svg"
import brickIcon from "../../../assets/brickIcon.svg"
import woolIcon from "../../../assets/woolIcon.svg"
import grainIcon from "../../../assets/grainIcon.svg"
import oreIcon from "../../../assets/oreIcon.svg"

export default function HostPorts() {
  const { portTiles } = useContext(PortTilesContext);
  
  let content = [];
  Object.keys(portTiles).forEach(x => {
    Object.keys(portTiles[x]).forEach(y => {
      if (portTiles[x][y].type != "Ocean") {
        let translateValue = "translate(" + (x*155-30) + "," + (y*145-100) + ")";

        //Set the sail icon.
        let saleIcon = null;
        switch (portTiles[x][y].type) {
          case "Lumber":
            saleIcon=<image href={lumberIcon} width="60" height="60" x={x*155-30+60} y={y*145-40}/>;
          break;
          case "Brick":
            saleIcon=<image href={brickIcon} width="60" height="60" x={x*155-30+60} y={y*145-40}/>;
          break;
          case "Wool":
            saleIcon=<image href={woolIcon} width="60" height="60" x={x*155-30+60} y={y*145-40}/>;
          break;
          case "Grain":
            saleIcon=<image href={grainIcon} width="60" height="60" x={x*155-30+60} y={y*145-40}/>;
          break;
          case "Ore":
            saleIcon=<image href={oreIcon} width="60" height="60" x={x*155-30+60} y={y*145-40}/>;
          break;
        }

        //Set the port Direction.
        let portIcon = null;
        if(x <= 1)
          portIcon=<image href={sidePortIcon} width="180" height="210" x={x*155-30} y={y*145-100} />;
        else if(x >= 11)
          portIcon=<image href={sidePortIcon} width="180" height="210" x={x*155-30} y={y*145-100} transform={"rotate(180 "+((x*155-30)+72.5)+" "+((y*145-100)+105)+")"}/>;
        else if (x==2 && y==5 || x<6 && y==6)
          portIcon=<image href={angePortIcon} width="180" height="210" x={x*155-30} y={y*145-100} />;
        else if (x==10 && y==5 || x>6 && y==6)
          portIcon=<image href={angePortIcon} width="180" height="210" x={-x*155-30-90} y={y*145-100} transform={"scale(-1,1)"} />;
        else if (x==2 && y==1 || x<6 && y==0)
          portIcon=<image href={angePortIcon} width="180" height="210" x={-x*155-30-90} y={y*145-100} transform={"rotate(180 "+((x*155-30)+72.5)+" "+((y*145-100)+105)+") scale(-1,1)"} />;
        else// if (x==10 && y==5 || x>6 && y==0)
          portIcon=<image href={angePortIcon} width="180" height="210" x={x*155-30} y={y*145-100} transform={"rotate(180 "+((x*155-30)+72.5)+" "+((y*145-100)+105)+")"} />;
        
        content.push(
          <g key={crypto.randomUUID()}>
            {/*<polygon 
              className="hex"
              points="30,70 60,50 60,20 30,0 0,20 0,50"
              transform={translateValue}
            />*/}
              <image href={shipIcon} width="180" height="210" transform={translateValue}/>
              {saleIcon != null && saleIcon}
              {portIcon != null && portIcon}
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