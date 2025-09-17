import { useState, useEffect } from 'react'
import Peer from 'peerjs';

export default function NetworkingClientSetup(props) {
  const [myPeerID, setMyPeerID] = useState(null);
  const [peer, setPeer] = useState(null);
  const [connectionIDInput, setConnectionIDInput] = useState("");
  const [connectionID, setConnectionID] = useState(null);

  useEffect(() => {




    //if(myPeerID == null) {
    //  var newPeer = new Peer();
    //  newPeer.on('open', function(id) {
    //    console.log("The peerID is: "+id);
    //    setMyPeerID(id);
    //    setPeer(newPeer);
    //  })
    //  newPeer.on('error', (err) => {
    //    alert(err.type);//network.
    //    if (err.type === "network"){
    //      setTimeout(reconnect, 5000);
    //    }
    //      
    //  })

    //  function reconnect() {
    //    //var newPeer = new Peer();
    //    //newPeer.on('open', function(id) {
    //    //  console.log("The peerID is: "+id);
    //    //  setMyPeerID(id);
    //    //  setPeer(newPeer);
    //    //})
    //    alert("reconnect called, going to try to reconnect");
    //    alert(props.hostPeerIDPrefix+connectionID);
    //    let newConn = peer.connect(props.hostPeerIDPrefix+connectionID);//connectionID doesn't get passed correctly into here.
    //        //When this first gets setup, connectionID is going to be blank, because this sets up at the start of the whole thing.
    //    props.setNewestConn(newConn);
    //  }
    //}


    const setupConnection = () => {
      console.log("setupConnection Called");
      console.log(connectionID);
      
      let newPeerPromise = new Promise((resolve/*, reject*/) => {
        console.log("start");
        var newPeer = new Peer();
        newPeer.on('open', function(id) {
          console.log("The peerID is: "+id);
          setMyPeerID(id);
          setPeer(newPeer);
          resolve(newPeer);
        })
        newPeer.on('error', (err) => {
          alert(err.type);//network.
          if (err.type === "network"){
            setTimeout(setupConnection, 5000);
          }
        })
        console.log("Here")
      })
      newPeerPromise.then(peer =>{
        console.log("Got to the promis result.");
        console.log(connectionID);
        console.log(peer);
        let newConn = peer.connect(connectionID);
        console.log("Step");
        props.setNewestConn(newConn);
        console.log("Got here?");
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