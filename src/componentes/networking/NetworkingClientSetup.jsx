import { useState, useEffect } from 'react'
import Peer from 'peerjs';

export default function NetworkingClientSetup() {
  const [myPeerID, setMyPeerID] = useState(null);     //This is the browser's own connection ID.
  const [peer, setPeer] = useState(null);             //Can connect to other peers and listen for connections
  //const [newestConn, setNewestConn] = useState(null);
  const [conn, setConn] = useState(null);               //This is the connection to another peer.
  const [connectionID, setConnectionID] = useState(""); //This is taken from the input field.

  const hostPeerIDPrefix = "elduganocatangame-";

  useEffect(() => {
    if(myPeerID == null) {
      var newPeer = new Peer();
      newPeer.on('open', function(id) {
        console.log("The peerID is: "+id);
        setMyPeerID(id);
        setPeer(newPeer);
      })
    }
    if(conn != null){
      conn.on('open', function() {
        // Receive messages
        conn.on('data', function(data,) {
          console.log('Received:', data);
        });

        // Send a test message
        conn.send("I am a player who has just joined the game!");
      });
      //let newConn = [...conn];
      //newConn.push(newestConn);
      //setConn(newConn);
      //setNewestConn(null);
    }
  }, [myPeerID, conn]);

  const connectionButton= () => {
    //This is the client side.
    console.log("Clicked connection button.");
    //let connectionID = hostPeerIDPrefix+connectionID;
    console.log(hostPeerIDPrefix+connectionID);
    let newConn = peer.connect(hostPeerIDPrefix+connectionID);
    //setNewestConn(newConn);
    setConn(newConn);
  }
  const sendAnotherMessageButton = () => {
    conn.send("Do you read me? You were the first connector.");
  }

  return (
    <>
      <h2>Hello Player</h2>
      Input the ID you see on the screen below.<br />
      <label>Connection ID: <input value={connectionID} name="connectionID" onChange={e => setConnectionID(e.target.value)} /></label><br />
      <button onClick={connectionButton}>Connect</button>
      <button onClick={sendAnotherMessageButton}>Send Another Message</button>
    </>
  )
}