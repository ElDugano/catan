import { useContext } from "react"
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext";
import { PlayerResourceCardsContext } from "../../../../state/playerResourceCards/PlayerResourceCardsContext";


import lumberIcon from "../../../../assets/lumberIcon.svg";
import brickIcon from "../../../../assets/brickIcon.svg";
import woolIcon from "../../../../assets/woolIcon.svg";
import grainIcon from "../../../../assets/grainIcon.svg";
import oreIcon from "../../../../assets/oreIcon.svg";

export default function TradeResult(props) {
  const { getAPlayersResourceCards } = useContext(PlayerResourceCardsContext);
  const { clientPlayerNumber } = useContext(CurrentPlayerTurnContext);

  const playerResources = getAPlayersResourceCards(clientPlayerNumber);

  const oneLumberIcon = <img src={lumberIcon} />;
  const oneBrickIcon = <img src={brickIcon} />;
  const oneWoolIcon = <img src={woolIcon} />;
  const oneGrainIcon = <img src={grainIcon} />;
  const oneOreIcon = <img src={oreIcon} />;

  let resultIconStyle = {Lumber:"",Brick:"",Wool:"",Grain:"",Ore:""};
  for ( let resource in resultIconStyle ) {
    if ( props.giveResources[resource] > 0 )
      resultIconStyle[resource] = "negativeNumber"
    else if (props.recieveResources[resource] > 0 )
      resultIconStyle[resource] = "positiveNumber"
  }

  return(
    <>
      Trade Result
      <div className={"tradeWithBoardMenu"}>
        <div className={"tradeResult"}>
          <div className={resultIconStyle.Lumber}>{oneLumberIcon} {playerResources.Lumber - props.giveResources.Lumber + props.recieveResources.Lumber}</div>
          <div className={resultIconStyle.Brick}>{oneBrickIcon} {playerResources.Brick - props.giveResources.Brick + props.recieveResources.Brick}</div>
          <div className={resultIconStyle.Wool}>{oneWoolIcon} {playerResources.Wool - props.giveResources.Wool + props.recieveResources.Wool}</div>
          <div className={resultIconStyle.Grain}>{oneGrainIcon} {playerResources.Grain - props.giveResources.Grain + props.recieveResources.Grain}</div>
          <div className={resultIconStyle.Ore}>{oneOreIcon} {playerResources.Ore - props.giveResources.Ore + props.recieveResources.Ore}</div>
        </div>
      </div>
    </>
  )
}