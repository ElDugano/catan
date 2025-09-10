import { useState, useEffect } from 'react'
import Peer from 'peerjs';

export default function NetworkingHostSetup(props) {
  const [myPeerID, setMyPeerID] = useState(null);
    //This doesn't really need to be held in state. but something is likely needed to be held in state.
    //Maybe if I make this a memo?

  useEffect(() => {
    if(myPeerID == null) {
      var shortID=makeid(6)
      var newPeer = new Peer(props.hostPeerIDPrefix+shortID);
      let newPeerPromise = new Promise((resolve/*, reject*/) => {
        newPeer.on('open', function(id) {
          console.log("The peerID is: "+id);
          resolve({peer:newPeer,peerId:id});
        });  
      })
      newPeerPromise.then(result =>{
        result.peer.on('connection', function(newConn) {
          console.log("We just connected!");
          props.setNewestConn(newConn);
        });
        setMyPeerID(shortID);
      });
    }
  }, [myPeerID, props]);

  const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  return (
    <>
      <h2>{myPeerID}</h2>
      Use this code to join the game!
    </>
  )
}