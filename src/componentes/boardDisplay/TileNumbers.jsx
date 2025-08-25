export default function TileNumbers({landTileNumbers}) {
  let boardContent=[];
  for (let tileNumber in landTileNumbers) {
    for (let key in landTileNumbers[tileNumber]) {
      let x =landTileNumbers[tileNumber][key]["x"];
      let y = landTileNumbers[tileNumber][key]["y"];
      let className="";
      if(tileNumber == 6 || tileNumber == 8) {
        className="bigNumber"
      }
      boardContent.push(
        <text key={crypto.randomUUID()} x={x*30+30}  y={y*50+40} className={className} textAnchor="middle">{tileNumber}</text>
      ) 
    }
  }
  return boardContent;
}