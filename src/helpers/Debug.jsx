import { useContext } from 'react';
import { TurnStateContext } from '../state/turnState/TurnStateContext.js';
import { NetworkingMessageSenderContext } from '../componentes/networking/Host/NetworkingMessageSenderContext.js';

export default function Debug() {
  const {isTurnStateRollingTheDice} = useContext(TurnStateContext);

  const { addToMessagePayloadToHost, sendTheMessages } = useContext(NetworkingMessageSenderContext);

  let Roll7Button = "";
  if (isTurnStateRollingTheDice()) {
    Roll7Button = (
      <button onClick={() => {
        addToMessagePayloadToHost({cheat:"Roll 7"});
        sendTheMessages();
      }}>Roll 7</button>
    );
  }
  let GiveResourcesButton = (
    <button onClick={() => {
      addToMessagePayloadToHost({cheat:"Give Resources To Current Player"});
      sendTheMessages();
    }}>Add 5 Resources to Current Player</button>
  )

  return (
    <>
    {Roll7Button}
    {GiveResourcesButton}
    </>
  )
}