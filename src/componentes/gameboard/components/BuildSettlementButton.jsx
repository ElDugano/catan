import { useState, useEffect } from "react";

export default function BuildSettlementButton(props) {
  const [recentlyTouched, setRecentlyTouched] = useState(false);
  useEffect(()=>{
    if (recentlyTouched == true) {
      setTimeout(() => {setRecentlyTouched(false)},200);
    }
  },[recentlyTouched]);
  console.log(recentlyTouched);
 
  return(
    <circle
      onClick={() => props.clickable && props.tileNodeClickFunction()}
      onTouchStart={() => props.clickable && setRecentlyTouched(true)}
      onTouchEnd={() => (props.clickable && recentlyTouched == true) && props.tileNodeClickFunction()}
      r="5"
      cx={props.centerX}
      cy={props.centerY}
      className={"cornerNodeBuildable " + props.class}
    />
  );
}