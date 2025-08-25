export default function CreateTileCornerNodes() {
  let cornerNodes = [];
  for (let x=0; x<=12; x++) {
    let columnNodes = [];
    for (let y=0; y<=7; y++) {
      if (y == 0 ||
          y == 7 ||
          x == 0 ||
          x == 12 ||
          (y == 1 && x <= 2) ||
          (y == 1 && x >= 10) ||
          (y == 2 && x == 1) ||
          (y == 2 && x == 11) ||
          (y == 5 && x == 1) ||
          (y == 5 && x == 11) ||
          (y == 6 && x <= 2) ||
          (y == 6 && x >= 10)) {
            columnNodes.push({value:"Ocean"});
          }
      else {
        if((x+y)%2 !== 0 || y == 6) {  //Number is odd or the bottom row.
          columnNodes.push({
            value:"Land",
            owner:"none",
            rightRoadOwner:"none"
          });
        }
        else {  //Number is even
          columnNodes.push({
            value:"Land",
            owner:"none",
            rightRoadOwner:"none",
            bottomRoadOwner:"none"
          });
        }
      }
    }
    cornerNodes.push(columnNodes);
  }
  return cornerNodes;
}