import Settlement from "./Settlement";

export default function BuildCityButton(props) {
  return(
    <g onClick={() => props.tileNodeClickFunction()}>
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