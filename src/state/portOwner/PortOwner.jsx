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
    console.log("setPort was called", player, portType);
    switch(portType) {
      case "Standard":{
        console.log("Updating Standard");
        let newStandardPortOwners = [...standardPortOwner];
        newStandardPortOwners[player] = true;
        setStandardPortOwner(newStandardPortOwners);
        return {standardPortOwner:newStandardPortOwners};}
      case "Wool":
        setWoolPortOwner(player);
        return {woolPortOwner:player};
      case "Grain":
        setGrainPortOwner(player);
        return {grainPortOwner:player};
      case "Lumber":
        setLumberPortOwner(player);
        return {lumberPortOwner:player};
      case "Brick":
        setBrickPortOwner(player);
        return {brickPortOwner:player};
      case "Ore":
        setOrePortOwner(player);
        return {orePortOwner:player};
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
        setPortOwner,
        setStandardPortOwner,
        setWoolPortOwner,
        setGrainPortOwner,
        setLumberPortOwner,
        setBrickPortOwner,
        setOrePortOwner,
        standardPortOwner,
        woolPortOwner,
        grainPortOwner,
        lumberPortOwner,
        brickPortOwner,
        orePortOwner
      }}>
        {children}
      </PortOwnerContext.Provider>
    )
  }