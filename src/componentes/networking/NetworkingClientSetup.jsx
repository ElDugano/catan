import { useState, useEffect } from 'react'
import Peer from 'peerjs';

export default function NetworkingClientSetup(props) {
  const [connectionIDInput, setConnectionIDInput] = useState("");
  const [connectionID, setConnectionID] = useState(null);
  const [doOnce, setDoOnce] = useState(false);

  useEffect(() => {
    const setupConnection = (myPeerID = null) => {
      setDoOnce(true);
      let newPeerPromise = new Promise((resolve/*, reject*/) => {
        console.log("start");
        var newPeer;
        if (myPeerID == null)
          newPeer = new Peer();
        else
          newPeer = new Peer(myPeerID);
        newPeer.on('open', function(id) {
          console.log("The peerID is: "+id);
          resolve({peer:newPeer, id:id});
        })
      })
      newPeerPromise.then(peerInfo =>{
        console.log(peerInfo);
        peerInfo.peer.on('error', (err) => {
          alert(err.type);//network.
          if (err.type === "network"){
            setTimeout(setupConnection(peerInfo.id), 1000);
          }
        })

        let newConn = peerInfo.peer.connect(connectionID);
        props.setNewestConn(newConn);
      })
    }

    if (connectionID != null && doOnce == false){
      setupConnection();
    }
  }, [connectionID, props, doOnce]);

  const connectionButton= () => {
    setConnectionID(props.hostPeerIDPrefix+connectionIDInput.toUpperCase());
    console.log("Clicked connection button.");
    console.log(props.hostPeerIDPrefix+connectionIDInput);
  }
  return (
    <>
      <h2>Hello Player</h2>
      Input the ID you see on the screen below.<br />
      <label>Connection ID: <input style={{textTransform: "uppercase"}} value={connectionIDInput} name="connectionID" onChange={e => setConnectionIDInput(e.target.value)} /></label><br />
      <button onClick={connectionButton}>Connect</button>
    </>
  )
}