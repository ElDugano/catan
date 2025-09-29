import { useState, useEffect } from "react";
import Settlement from "./Settlement";

export default function BuildCityButton(props) {
  const [recentlyTouched, setRecentlyTouched] = useState(false);
  useEffect(()=>{
    if (recentlyTouched == true) {
      setTimeout(() => {setRecentlyTouched(false)},200);
    }
  },[recentlyTouched]);

  return(
    <g
      onClick={() => props.clickable && props.tileNodeClickFunction()}
      onTouchStart={() => props.clickable && setRecentlyTouched(true)}
      onTouchEnd={() => (props.clickable && recentlyTouched == true) && props.tileNodeClickFunction()}
    >
      <circle
        r="8"
        cx={props.centerX}
        cy={props.centerY}
        className={"cornerNodeBuildable " + props.class}
      />
      <Settlement
        centerX={props.centerX}
        centerY={props.centerY}
        owner={props.owner}
      />
    </g>
  );
}