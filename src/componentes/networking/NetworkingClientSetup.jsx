import { useState, useEffect } from 'react'
import Peer from 'peerjs';

export default function NetworkingClientSetup(props) {
  const [ connectionIDInput, setConnectionIDInput] = useState("");
  const [ hostConnectionID, setHostConnectionID] = useState(null);

  const [ connected, setConnected] = useState(false);
  const [ peer, setPeer ] = useState(null);
  const [ peerID, setPeerID ] = useState(null);

  useEffect(() => {

    const reconnect = () => {
      setConnected(false);
      setPeer(null)
    }

    const setupPeer = () => {
      var newPeer = (peerID == null ? new Peer() : new Peer(peerID));
      newPeer.on('open', function(id) {
          console.log("The peerID is: "+id);
          setPeer(newPeer);
          setPeerID(id);
        })
    }

    const connSetup = () => {
      peer.on('error', (err) => {
        alert(err.type);//network.
        if (err.type === "network"){
          reconnect()
        }
      })
      let newConn = peer.connect(hostConnectionID);
      props.setNewestConn(newConn);
      setConnected(true);
    }

    if (peer == null && hostConnectionID != null)
      setupPeer();
    if (peer != null && hostConnectionID != null && connected == false)
      connSetup();

  }, [hostConnectionID, connected, peer, peerID, props]);

  const connectionButton= () => {
    setHostConnectionID(props.hostPeerIDPrefix+connectionIDInput.toUpperCase());
    console.log("Clicked connection button.");
    console.log(props.hostPeerIDPrefix+connectionIDInput);
  }

  if (peerID == null)
    return (
  <>
    <h2>Hello Player</h2>
    Input the ID you see on the screen below.<br />
    
    <label>Connection ID: <input style={{textTransform: "uppercase"}} value={connectionIDInput} name="connectionID" onChange={e => setConnectionIDInput(e.target.value)} /></label><br />
    <button onClick={connectionButton}>Connect</button>
  </>
  )
  else if (connected == false && peerID != null)
  return (
    <div className={"fadeMainInterface"}>
      <h1 style={{lineHeight:"100vh", width:"100vw", textAlign:"center"}}>RECONNECTING</h1>
    </div>
  )
  else
    return(<></>)
}