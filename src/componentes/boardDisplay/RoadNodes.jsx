export default function RoadNodes(props) {
  let boardContent=[];
  let className = "roadNodeBuildable";
  let strokeWidth = 4;
  for (let x=1; x <= 12; x++) {
    for (let y=1; y <= 6; y++) {
      if (props.tileCornerNodes[x][y].value != "Ocean")
      {
        if((x+y)%2 == 0) {
          if(props.tileCornerNodes[x+1][y].value != "Ocean")
            boardContent.push(
              <line
                key={crypto.randomUUID()}
                x1={(x+2)*30-9}
                y1={y*50+6}
                x2={(x+1)*30+9}
                y2={y*50+20-6}
                className={className}
                strokeWidth={strokeWidth}
              />
            );
          if(props.tileCornerNodes[x][y+1].value != "Ocean")
            boardContent.push(
              <line
                key={crypto.randomUUID()}
                x1={(x+1)*30}
                y1={y*50+20+9}
                x2={(x+1)*30}
                y2={(y+1)*50-9}
                className={className}
                strokeWidth={strokeWidth}
              />
            );
        }
        else {
          if(props.tileCornerNodes[x+1][y].value != "Ocean")
            boardContent.push(
              <line
                key={crypto.randomUUID()}
                x1={(x+2)*30-9}
                y1={y*50+20-6}
                x2={(x+1)*30+9}
                y2={y*50+6}
                className={className}
                strokeWidth={strokeWidth}
              />
            );
        }
      }
    }
  }
  return boardContent;
}