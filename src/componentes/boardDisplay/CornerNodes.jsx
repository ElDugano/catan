export default function CornerNodes(props) {
  let boardContent=[];
  for (let x=1; x <= 12; x++) {
    for (let y=0; y <= 7; y++) {
      let centerX = x*30+30;
      let centerY = (x%2 !== 0 && y%2 == 0) || (x%2 == 0 && y%2 !== 0) ? y*50 : y*50+20;
      let translateValue = "translate(" + (centerX-6.5) + "," + (centerY-7) + ") scale(.05)";
      if(props.tileCornerNodes[x][y].value == "Land") {
        if( !(
          props.tileCornerNodes[x+1][y].value == "Settlement" ||
          props.tileCornerNodes[x+1][y].value == "City" ||
          props.tileCornerNodes[x-1][y].value == "Settlement" ||
          props.tileCornerNodes[x-1][y].value == "City" ||
          ((x+y)%2 == 1 && props.tileCornerNodes[x][y-1].value == "Settlement") ||
          ((x+y)%2 == 1 && props.tileCornerNodes[x][y-1].value == "City") ||
          ((x+y)%2 == 0 && props.tileCornerNodes[x][y+1].value == "Settlement") ||
          ((x+y)%2 == 0 && props.tileCornerNodes[x][y+1].value == "City"))
        ) {
          boardContent.push(
            <circle
              id={"tileCornerNode-"+x+"-"+y}
              key={crypto.randomUUID()}
              onClick={() => {props.tileNodeClickFunction(x,y)}}
              r="5"
              cx={centerX}
              cy={centerY}
              className="cornerNodeBuildable"
            />
          );
        }
      }
      if(props.tileCornerNodes[x][y].value == "Settlement") {
        boardContent.push(
          <path
            id={"tileCornerSettlement-"+x+"-"+y}
            key={crypto.randomUUID()}
            fill={props.playerColor[props.tileCornerNodes[x][y].owner]}
            transform={translateValue} 
            d="M224,115.53906V208a16.01833,16.01833,0,0,1-16,16H48a16.01833,16.01833,0,0,1-16-16V115.53857a16.03346,16.03346,0,0,1,5.23633-11.83837l79.99414-72.73438a15.93607,15.93607,0,0,1,21.52637-.001l80.00683,72.73536.001.001A16.03466,16.03466,0,0,1,224,115.53906Z"
          />
        );
      }
    }
  }
  return (boardContent);
}