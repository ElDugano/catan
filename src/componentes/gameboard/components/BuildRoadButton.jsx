import { useState, useEffect } from "react";
export default function BuildRoadButton(props) {
  const [recentlyTouched, setRecentlyTouched] = useState(false);
    useEffect(()=>{
      if (recentlyTouched == true) {
        setTimeout(() => {setRecentlyTouched(false)},200);
      }
    },[recentlyTouched]);

  return (
    <line
      key={crypto.randomUUID()}
      x1={props.lineStartX}
      y1={props.lineStartY}
      x2={props.lineEndX}
      y2={props.lineEndY}
      className="roadNodeBuildable"
      stroke="white"
      strokeWidth={10}
      strokeLinecap="round"
      onClick={() => props.roadNodeClickFunction()}
      onTouchStart={() => setRecentlyTouched(true)}
      onTouchEnd={() => recentlyTouched == true && props.roadNodeClickFunction()}
    />)
}