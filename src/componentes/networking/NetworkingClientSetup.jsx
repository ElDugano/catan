import { useState, useEffect } from 'react'
import Peer from 'peerjs';

export default function NetworkingClientSetup(props) {
  const [myPeerID, setMyPeerID] = useState(null);
  const [peer, setPeer] = useState(null);
  const [connectionIDInput, setConnectionIDInput] = useState("");
  const [connectionID, setConnectionID] = useState(null);

  useEffect(() => {
    const setupConnection = () => {
      let newPeerPromise = new Promise((resolve/*, reject*/) => {
        console.log("start");
        var newPeer = new Peer();
        newPeer.on('open', function(id) {
          console.log("The peerID is: "+id);
          setMyPeerID(id);
          setPeer(newPeer);
          resolve(newPeer);
        })
        //newPeer.on('error', (err) => {
        //  alert(err.type);//network.
        //  if (err.type === "network"){
        //    setTimeout(setupConnection, 5000);
        //  }
        //})
        console.log("Here")
      })
      newPeerPromise.then(peer =>{
        let newConn = peer.connect(connectionID);
        props.setNewestConn(newConn);
      })
    }

    const reconnect = () => {
      let newPeerPromise = new Promise((resolve/*, reject*/) => {
        console.log("start");
        var newPeer = new Peer(myPeerID);
        newPeer.on('open', function() {
          setPeer(newPeer);
          resolve(newPeer);
        })
        newPeer.on('error', (err) => {
          alert(err.type);
          if (err.type === "network"){
            setTimeout(reconnect, 1000);
          }
        })
      })
      newPeerPromise.then(peer =>{
        let newConn = peer.connect(connectionID);
        props.setNewestConn(newConn);
      })
    }

    if (peer != null) {
      peer.on('error', (err) => {
        alert(err.type);
        alert("First One of these");
        if (err.type === "network"){
          setTimeout(reconnect, 1000);
        }
      })
    }


    if (connectionID != null && myPeerID == null)
      setupConnection();

  }, [connectionID, myPeerID, peer, props]);

  const connectionButton= () => {
    setConnectionID(props.hostPeerIDPrefix+connectionIDInput);
    console.log("Clicked connection button.");
    console.log(props.hostPeerIDPrefix+connectionIDInput);
  }



  return (
    <>
      <h2>Hello Player</h2>
      Input the ID you see on the screen below.<br />
      <label>Connection ID: <input value={connectionIDInput} name="connectionID" onChange={e => setConnectionIDInput(e.target.value)} /></label><br />
      <button onClick={connectionButton}>Connect</button>
    </>
  )
}