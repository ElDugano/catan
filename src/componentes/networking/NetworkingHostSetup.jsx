import { useState, useEffect } from 'react'
import Peer from 'peerjs';

export default function NetworkingHostSetup() {
  const [myPeerID, setMyPeerID] = useState(null);     //This is the browser's own connection ID.
  const [peer, setPeer] = useState(null);             //Can connect to other peers and listen for connections
  const [newestConn, setNewestConn] = useState(null);
  const [conn, setConn] = useState([]);               //This is the connection to another peer.

  const hostPeerIDPrefix = "elduganocatangame-";

  useEffect(() => {
    if(myPeerID == null) {
      var shortID=makeid(6)
      var newPeer = new Peer(hostPeerIDPrefix+shortID);
      let newPeerPromise = new Promise((resolve/*, reject*/) => {
        newPeer.on('open', function(id) {
          console.log("The peerID is: "+id);
          resolve({peer:newPeer,peerId:id});
        });  
      })
      newPeerPromise.then(result =>{
        result.peer.on('connection', function(newConn) {
          console.log("We just connected!");
          setNewestConn(newConn);
        });
        setMyPeerID(shortID);
        setPeer(result.peer);
      });
    }

    if(newestConn != null){
      const playerNumber = conn.length;
      newestConn.on('open', function() {
        // Receive messages
        newestConn.on('data', function(data,) {
          //console.log('Received',newestConn.peer, data);
          console.log('Received from:',playerNumber,'. Message:', data);
        });

        // Send a test message messages
        newestConn.send("You have connected to the boardgame!");
      });
      let newConn = [...conn];
      newConn.push(newestConn);
      setConn(newConn);
      setNewestConn(null);
    }
  }, [myPeerID, conn, newestConn]);

  const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const sendAnotherMessageButton = () => {
    conn[0].send("Do you read me? You were the first player to connect to the game.");
    if (conn.length==2)
      conn[1].send("Do you read me? You were the second player to connect to the game.");
  }

  return (
    <>
      <h2>{myPeerID}</h2>
      Use this code to join the game!
      <button onClick={sendAnotherMessageButton}>Send Another Message</button>
    </>
  )
}