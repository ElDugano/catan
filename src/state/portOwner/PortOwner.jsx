import { useState } from 'react'
import { PortOwnerContext } from './PortOwnerContext.js';

export const PortOwner = ({ children }) => {
  const [standardPortOwner, setStandardPortOwner] = useState([false,false,false,false]);
  const [woolPortOwner, setWoolPortOwner] = useState(null);
  const [grainPortOwner, setGrainPortOwner] = useState(null);
  const [lumberPortOwner, setLumberPortOwner] = useState(null);
  const [brickPortOwner, setBrickPortOwner] = useState(null);
  const [orePortOwner, setOrePortOwner] = useState(null);

  const doesPlayerOwnStandardPort = (player) => {return standardPortOwner[player] == true ? true : false};
  const doesPlayerOwnWoolPort     = (player) => {return woolPortOwner == player ? true : false};
  const doesPlayerOwnGrainPort    = (player) => {return grainPortOwner == player ? true : false};
  const doesPlayerOwnLumberPort   = (player) => {return lumberPortOwner == player ? true : false};
  const doesPlayerOwnBrickPort    = (player) => {return brickPortOwner == player ? true : false};
  const doesPlayerOwnOrePort      = (player) => {return orePortOwner == player ? true : false};

  const setPortOwner = (player, portType) => {
    switch(portType) {
      case "Standard":{
        let newStandardPortOwners = [...standardPortOwner];
        newStandardPortOwners[player] = true;
        setStandardPortOwner(newStandardPortOwners);
        break;}
      case "Wool":
        setWoolPortOwner(player);
        break;
      case "Grain":
        setGrainPortOwner(player);
        break;
      case "Lumber":
        setLumberPortOwner(player);
        break;
      case "Brick":
        setBrickPortOwner(player);
        break;
      case "Ore":
        setOrePortOwner(player);
        break;
    }
  }

    return (
      <PortOwnerContext.Provider value={{
        doesPlayerOwnStandardPort,
        doesPlayerOwnWoolPort,
        doesPlayerOwnGrainPort,
        doesPlayerOwnLumberPort,
        doesPlayerOwnBrickPort,
        doesPlayerOwnOrePort,
        setPortOwner
      }}>
        {children}
      </PortOwnerContext.Provider>
    )
  }