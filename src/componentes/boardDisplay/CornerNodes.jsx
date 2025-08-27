import { useContext } from 'react'
import { TurnStateContext } from "../../state/turnState/TurnStateContext";
import BuildSettlementButtons from './BuildSettlementButtons';


export default function CornerNodes(props) {
  const {turnState}= useContext(TurnStateContext);

  let boardContent=[];
  for (let x=1; x <= 12; x++) {
    for (let y=0; y <= 7; y++) {
      let centerX = x*30+30;
      let centerY = (x%2 !== 0 && y%2 == 0) || (x%2 == 0 && y%2 !== 0) ? y*50 : y*50+20;
      console.log(turnState);
      if(turnState == "building a settlement")
        boardContent.push(<BuildSettlementButtons x={x} y={y} centerX={centerX} centerY={centerY} key={crypto.randomUUID()} tileNodeClickFunction={props.tileNodeClickFunction} tileCornerNodes={props.tileCornerNodes} />);
    }
  }
  return (boardContent);
}