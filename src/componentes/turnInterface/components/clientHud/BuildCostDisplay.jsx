import lumberIcon from "../../../../assets/lumberIcon.svg"
import brickIcon from "../../../../assets/brickIcon.svg"
import woolIcon from "../../../../assets/woolIcon.svg"
import grainIcon from "../../../../assets/grainIcon.svg"
import oreIcon from "../../../../assets/oreIcon.svg"

export default function BuildcostDisplay(props) {
  return (
    <div className={"fadeMainInterface"}>
      <div className={"buildCostDisplay"}>
        <div className={"exitButton"} onClick={props.exitFunction}>X</div>
        <h3>Building Cost</h3>
        <hr />
        <div className={"buildItem"}>Road</div>
        <div className={"costRow"}>
          <div className="victoryPointText">0 Victory Points</div>
          <div>
            <img className="resourceIcon" src={lumberIcon} />
            <img className="resourceIcon" src={brickIcon} />
          </div>
        </div>
        <hr />
        <div className={"buildItem"}>Settlement</div>
        <div className={"costRow"}>
          <div className="victoryPointText">1 Victory Points</div>
          <div>
            <img className="resourceIcon" src={lumberIcon} />
            <img className="resourceIcon" src={brickIcon} />
            <img className="resourceIcon" src={woolIcon} />
            <img className="resourceIcon" src={grainIcon} />
          </div>
        </div>
        <hr />
        <div className={"buildItem"}>City</div>
        <div className={"costRow"}>
          <div className="victoryPointText">
            2 Victory Points
          </div>
          <div>
            <img className="resourceIcon" src={grainIcon} />
            <img className="resourceIcon" src={grainIcon} />
            <img className="resourceIcon" src={oreIcon} />
            <img className="resourceIcon" src={oreIcon} />
            <img className="resourceIcon" src={oreIcon} />
          </div>
        </div>
        <hr />
        <div className={"buildItem"}>Development Card</div>
        <div className={"costRow"}>
          <div className="victoryPointText">? Victory Points</div>
          <div>
            <img className="resourceIcon" src={woolIcon} />
            <img className="resourceIcon" src={grainIcon} />
            <img className="resourceIcon" src={oreIcon} />
          </div>
        </div>
        <button className="exitButton" onClick={props.exitFunction}>Exit</button>
      </div>
    </div>
  )
}