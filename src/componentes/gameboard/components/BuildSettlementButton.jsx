export default function BuildSettlementButton(props) {
      return(
        <circle
          onClick={() => props.tileNodeClickFunction()}
          r="5"
          cx={props.centerX}
          cy={props.centerY}
          className={"cornerNodeBuildable " + props.class}
        />
      );
}