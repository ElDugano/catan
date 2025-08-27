export default function BuildRoadButton(props) {
  return (
    <line
      key={crypto.randomUUID()}
      x1={props.lineStartX}
      y1={props.lineStartY}
      x2={props.lineEndX}
      y2={props.lineEndY}
      className="roadNodeBuildable"
      stroke="white"
      strokeWidth={6}
      strokeLinecap="round"
      onClick={() => props.roadNodeClickFunction()}
    />)
}