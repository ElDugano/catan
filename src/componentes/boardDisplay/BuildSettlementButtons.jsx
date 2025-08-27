//This doesn't work right now.

export default function BuildSettlementButtons(props) {
  if(props.tileCornerNodes[props.x][props.y].value == "Land") {
    if( !(
      props.tileCornerNodes[props.x+1][props.y].owner != "none" ||
      props.tileCornerNodes[props.x-1][props.y].owner != "none" ||
      ((props.x+props.y)%2 == 1 && props.tileCornerNodes[props.x][props.y-1].owner != "none") ||
      ((props.x+props.y)%2 == 0 && props.tileCornerNodes[props.x][props.y+1].owner != "none"))
    ) {
      return(
        <circle
          id={"tileCornerNode-"+props.x+"-"+props.y}

          onClick={() => {props.tileNodeClickFunction(props.x,props.y, "Settlement")}}
          r="5"
          cx={props.centerX}
          cy={props.centerY}
          className="cornerNodeBuildable"
        />
      );
    }
  }
  return;
}