import { useContext } from "react";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext.js";
import { PlayerColorContext } from "../../../../state/playerColor/PlayerColorContext.js";
import "./clientHud.css"

import lumberIcon from "../../../../assets/lumberIcon.svg"
import brickIcon from "../../../../assets/brickIcon.svg"
import woolIcon from "../../../../assets/woolIcon.svg"
import grainIcon from "../../../../assets/grainIcon.svg"
import oreIcon from "../../../../assets/oreIcon.svg"



const ClientHud = () => {
  const { clientPlayerNumber } = useContext(CurrentPlayerTurnContext);
  const { playerResourceCards, previouslyGainedResources } = useContext(PlayerResourceCardsContext);
  const { playerColor } = useContext(PlayerColorContext);

  if (clientPlayerNumber == null)
    return;
  let localPlayerColor = playerColor[clientPlayerNumber];
  return (
    <div className={"clientHud clientHudPlayerColor"+localPlayerColor}>
      <div className={"clientHudTitle"}>Your Resources</div>
      <div className={"clientHudPlayerResources"}>
        <div className={"clieentHudResourceTotal"}><img src={lumberIcon} />{playerResourceCards[clientPlayerNumber].Lumber}</div>
        <div className={"clieentHudResourceTotal"}><img src={brickIcon} />{playerResourceCards[clientPlayerNumber].Brick}</div>
        <div className={"clieentHudResourceTotal"}><img src={woolIcon} />{playerResourceCards[clientPlayerNumber].Wool}</div>
        <div className={"clieentHudResourceTotal"}><img src={grainIcon} />{playerResourceCards[clientPlayerNumber].Grain}</div>
        <div className={"clieentHudResourceTotal"}><img src={oreIcon} />{playerResourceCards[clientPlayerNumber].Ore}</div>
      </div>
      <div className={"recievedResources"}>
        <div className={"resourcesGained resourceGainedLumber"}>
          {"Lumber" in previouslyGainedResources[clientPlayerNumber] && "+"+previouslyGainedResources[clientPlayerNumber].Lumber}
        </div>
        <div className={"resourcesGained resourceGainedBrick"}>
          {"Brick" in previouslyGainedResources[clientPlayerNumber] && "+"+previouslyGainedResources[clientPlayerNumber].Brick}
        </div>
        <div className={"resourcesGained resourceGainedWool"}>
          {"Wool" in previouslyGainedResources[clientPlayerNumber] && "+"+previouslyGainedResources[clientPlayerNumber].Wool}
        </div>
        <div className={"resourcesGained resourceGainedWheat"}>
          {"Grain" in previouslyGainedResources[clientPlayerNumber] && "+"+previouslyGainedResources[clientPlayerNumber].Grain}
        </div>
        <div className={"resourcesGained resourceGainedOre"}>
          {"Ore" in previouslyGainedResources[clientPlayerNumber] && "+"+previouslyGainedResources[clientPlayerNumber].Ore}
        </div>
      </div>
    </div>
  )
}

export default ClientHud