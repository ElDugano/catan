import { useContext } from "react";
import NetworkingSetup from "../networking/NetworkingSetup"
import { NetworkingContext } from "../networking/State/NetworkingContext";

import GameSetupHost from "./GameSetupHost";
import GameSetupClient from "./GameSetupClient";

export default function GameSetup() {
  const { isHost } = useContext(NetworkingContext);
 

  return (
    <>
    <h1>Welcome to catan</h1>
      <NetworkingSetup />
      {(isHost == true) ? <GameSetupHost /> :  <GameSetupClient />} 
    </>
  )
}