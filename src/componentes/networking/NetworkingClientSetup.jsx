import { useState, useEffect } from 'react'
import Peer from 'peerjs';

export default function NetworkingClientSetup(props) {
  const [myPeerID, setMyPeerID] = useState(null);
  const [peer, setPeer] = useState(null);
  const [connectionID, setConnectionID] = useState("");

  useEffect(() => {
    if(myPeerID == null) {
      var newPeer = new Peer();
      newPeer.on('open', function(id) {
        console.log("The peerID is: "+id);
        setMyPeerID(id);
        setPeer(newPeer);
      })
      newPeer.on('error', (err) => {
        alert(err.type);//network.
        if (err.type === "network"){
          setTimeout(reconnect, 5000);
        }
          
      })

      function reconnect() {
        //var newPeer = new Peer();
        //newPeer.on('open', function(id) {
        //  console.log("The peerID is: "+id);
        //  setMyPeerID(id);
        //  setPeer(newPeer);
        //})
        alert("reconnect called, going to try to reconnect");
        alert(props.hostPeerIDPrefix+connectionID);
        let newConn = peer.connect(props.hostPeerIDPrefix+connectionID);//connectionID doesn't get passed correctly into here.
            //When this first gets setup, connectionID is going to be blank, because this sets up at the start of the whole thing.
        props.setNewestConn(newConn);
      }
    }

  }, [myPeerID, connectionID, peer, props]);

 const connectionButton= () => {
   console.log("Clicked connection button.");
   console.log(props.hostPeerIDPrefix+connectionID);
   let newConn = peer.connect(props.hostPeerIDPrefix+connectionID);
   props.setNewestConn(newConn);
 }

  return (
    <>
      <h2>Hello Player</h2>
      Input the ID you see on the screen below.<br />
      <label>Connection ID: <input value={connectionID} name="connectionID" onChange={e => setConnectionID(e.target.value)} /></label><br />
      <button onClick={connectionButton}>Connect</button>
    </>
  )
}