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

export default function Ports() {
  const { portTiles } = useContext(PortTilesContext);
  
  let content = [];
  Object.keys(portTiles).forEach(x => {
    Object.keys(portTiles[x]).forEach(y => {
      if (portTiles[x][y].type != "Ocean") {
        let translateValue = "translate(" + (x*30) + "," + (y*50) + ")";

        //Set the sail icon.
        let saleIcon = null;
        switch (portTiles[x][y].type) {
          case "Lumber":
            saleIcon=<image href={lumberIcon} width="20" height="20" x={x*30+20} y={y*50+20}/>;
          break;
          case "Brick":
            saleIcon=<image href={brickIcon} width="20" height="20" x={x*30+20} y={y*50+20}/>;
          break;
          case "Wool":
            saleIcon=<image href={woolIcon} width="20" height="20" x={x*30+20} y={y*50+20}/>;
          break;
          case "Grain":
            saleIcon=<image href={grainIcon} width="20" height="20" x={x*30+20} y={y*50+20}/>;
          break;
          case "Ore":
            saleIcon=<image href={oreIcon} width="20" height="20" x={x*30+20} y={y*50+20}/>;
          break;
        }

        //Set the port Direction.
        let portIcon = null;
        if(x <= 1)
          portIcon=<image href={sidePortIcon} width="60" height="70" x={x*30} y={y*50} />;
        else if(x >= 11)
          portIcon=<image href={sidePortIcon} width="60" height="70" x={x*30} y={y*50} transform={"rotate(180 "+((x*30)+30)+" "+((y*50)+35)+")"}/>;
        else if (x==2 && y==5 || x<6 && y==6)
          portIcon=<image href={angePortIcon} width="60" height="70" x={x*30} y={y*50} />;
        else if (x==10 && y==5 || x>6 && y==6)
          portIcon=<image href={angePortIcon} width="60" height="70" x={-x*30-60} y={y*50} transform={"scale(-1,1)"} />;
        else if (x==2 && y==1 || x<6 && y==0)
          portIcon=<image href={angePortIcon} width="60" height="70" x={-x*30-60} y={y*50} transform={"rotate(180 "+((x*30)+30)+" "+((y*50)+35)+") scale(-1,1)"} />;
        else// if (x==10 && y==5 || x>6 && y==0)
          portIcon=<image href={angePortIcon} width="60" height="70" x={x*30} y={y*50} transform={"rotate(180 "+((x*30)+30)+" "+((y*50)+35)+")"} />;
        
        content.push(
          <g key={crypto.randomUUID()}>
            {/*<polygon 
              className="hex"
              points="30,70 60,50 60,20 30,0 0,20 0,50"
              transform={translateValue}
            />*/}
              <image href={shipIcon} width="60" height="70" transform={translateValue}/>
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