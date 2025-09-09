import { useState } from "react"
import NetworkingHostSetup from "../networking/NetworkingHostSetup";
import NetworkingClientSetup from "../networking/NetworkingClientSetup";

export default function GameSetup() {
  const [isHost, setIsHost] = useState(null);
  console.log(isHost);

  return (
    <>
      <h1>Welcome to catan</h1>
      <button onClick={() => setIsHost(true)}>Boardgame Display</button>
      <button onClick={() => setIsHost(false)}>Be a player</button>
      {isHost == true && <NetworkingHostSetup />}
      {isHost == false && <NetworkingClientSetup />}
    </>
  )
}