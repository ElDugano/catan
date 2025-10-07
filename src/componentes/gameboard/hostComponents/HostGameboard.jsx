import backgroundMap from "./assets/gameboard.png"

import HostTiles from "./HostTiles"
import HostCities from './HostCities.jsx';
import HostRoads from './HostRoads.jsx';
import HostTileNumbers from "./HostTileNumbers.jsx";
import HostPorts from "./HostPorts.jsx";
import HostBanditIcon from "./HostBanditIcon.jsx";

import rightRoadSprite from './assets/rightRoadSprite.png'
import verticalRoadSprite from './assets/verticalRoadSprite.png'

import rightRoadBlue from   './assets/roads/rightRoadSprite-blue.png'
import rightRoadRed from    './assets/roads/rightRoadSprite-red.png'
import rightRoadIndigo from './assets/roads/rightRoadSprite-indigo.png'
import rightRoadYellow from './assets/roads/rightRoadSprite-yellow.png'
import rightRoadOrange from './assets/roads/rightRoadSprite-orange.png'
import rightRoadGreen from  './assets/roads/rightRoadSprite-green.png'

import downRoadBlue from   './assets/roads/verticalRoadSprite-blue.png'
import downRoadRed from    './assets/roads/verticalRoadSprite-red.png'
import downRoadIndigo from './assets/roads/verticalRoadSprite-indigo.png'
import downRoadYellow from './assets/roads/verticalRoadSprite-yellow.png'
import downRoadOrange from './assets/roads/verticalRoadSprite-orange.png'
import downRoadGreen from  './assets/roads/verticalRoadSprite-green.png'



export default function HostGameboard() {
  const  roadSprites = {
    Blue:  {right:rightRoadBlue, down: downRoadBlue},
    Red:   {right:rightRoadRed, down: downRoadRed},
    Indigo:{right:rightRoadIndigo, down: downRoadIndigo},
    Yellow:{right:rightRoadYellow, down: downRoadYellow},
    Orange:{right:rightRoadOrange, down: downRoadOrange},
    Green: {right:rightRoadGreen, down: downRoadGreen}
  }

  const rightRoadOffset = 
  [
    [{x:0,y:0},{x:0,y:0}    ,{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0}    ,{x:0,y:0}     ,{x:150, y:305},{x:115, y:450},{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0}    ,{x:335, y:165},{x:310, y:305},{x:275, y:450},{x:250, y:590},{x:0,y:0}     ,{x:0,y:0}],
    [{x:0,y:0},{x:500, y:25},{x:485, y:165},{x:460, y:305},{x:440, y:450},{x:420, y:590},{x:400, y:735},{x:0,y:0}],
    [{x:0,y:0},{x:645, y:25},{x:630, y:165},{x:615, y:305},{x:600, y:450},{x:590, y:590},{x:575, y:735},{x:0,y:0}],
    [{x:0,y:0},{x:780, y:25},{x:775, y:165},{x:770, y:305},{x:765, y:450},{x:760, y:590},{x:760, y:735},{x:0,y:0}],
    [{x:0,y:0},{x:920, y:25},{x:920, y:165},{x:925, y:305},{x:930, y:450},{x:935, y:590},{x:935, y:735},{x:0,y:0}],
    [{x:0,y:0},{x:1050,y:25},{x:1065,y:165},{x:1080,y:305},{x:1095,y:450},{x:1105,y:590},{x:1115,y:735},{x:0,y:0}],
    [{x:0,y:0},{x:1195,y:25},{x:1210,y:165},{x:1235,y:305},{x:1260,y:450},{x:1275,y:590},{x:1295,y:735},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0}    ,{x:1360,y:165},{x:1390,y:305},{x:1420,y:450},{x:1445,y:590},{x:0,y:0}     ,{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0}    ,{x:0,y:0}     ,{x:1540,y:305},{x:1580,y:450},{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0}    ,{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}     ,{x:0,y:0}]
  ];
  const downRoadOffset = 
  [
    [{x:0,y:0},{x:0   ,y:0} ,{x:0   ,y:0}  ,{x:0,   y:0}  ,{x:0   ,y:0}  ,{x:0   ,y:0}  ,{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0   ,y:0} ,{x:0   ,y:0}  ,{x:60,  y:375},{x:0   ,y:0}  ,{x:0   ,y:0}  ,{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0   ,y:0} ,{x:255 ,y:235},{x:0   ,y:0}  ,{x:185 ,y:520},{x:0   ,y:0}  ,{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:430,y:95} ,{x:0   ,y:0}  ,{x:380 ,y:375},{x:0   ,y:0}  ,{x:330 ,y:660},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0   ,y:0} ,{x:555 ,y:235},{x:0   ,y:0}  ,{x:520 ,y:520},{x:0   ,y:0}  ,{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:715 ,y:95},{x:0   ,y:0}  ,{x:695 ,y:375},{x:0   ,y:0}  ,{x:680 ,y:660},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0   ,y:0} ,{x:855 ,y:235},{x:0   ,y:0}  ,{x:855 ,y:520},{x:0   ,y:0}  ,{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:1000,y:95},{x:0   ,y:0}  ,{x:1015,y:375},{x:0   ,y:0}  ,{x:1035,y:660},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0   ,y:0} ,{x:1160,y:235},{x:0   ,y:0}  ,{x:1190,y:520},{x:0   ,y:0}  ,{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:1280,y:95},{x:0   ,y:0}  ,{x:1335,y:375},{x:0   ,y:0}  ,{x:1385,y:660},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0   ,y:0} ,{x:1458,y:235},{x:0,   y:0}  ,{x:1525,y:520},{x:0   ,y:0}  ,{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0   ,y:0} ,{x:0   ,y:0}  ,{x:1650,y:375},{x:0   ,y:0}  ,{x:0   ,y:0}  ,{x:0,y:0},{x:0,y:0}]
  ];

  return(
    <svg viewBox="0 0 1920 1080">
      <image href={backgroundMap} width={'1920'} height={'1080'} />
      <g>
        <HostPorts />
        <HostCities y={1} />
        <HostTiles y={1} />
        <HostRoads y={2} rightRoadSprite={rightRoadSprite} rightRoadOffset={rightRoadOffset} verticalRoadSprite={verticalRoadSprite} downRoadOffset={downRoadOffset} roadSprites={roadSprites} />
        <HostCities y={2} />
        <HostTiles y={2} />
        <HostRoads y={3} rightRoadSprite={rightRoadSprite} rightRoadOffset={rightRoadOffset} verticalRoadSprite={verticalRoadSprite} downRoadOffset={downRoadOffset} roadSprites={roadSprites} />
        <HostCities y={3} />
        <HostTiles y={3} />
        <HostRoads y={4} rightRoadSprite={rightRoadSprite} rightRoadOffset={rightRoadOffset} verticalRoadSprite={verticalRoadSprite} downRoadOffset={downRoadOffset} roadSprites={roadSprites} />
        <HostCities y={4} />
        <HostTiles y={4} />
        <HostRoads y={5} rightRoadSprite={rightRoadSprite} rightRoadOffset={rightRoadOffset} verticalRoadSprite={verticalRoadSprite} downRoadOffset={downRoadOffset} roadSprites={roadSprites} />
        <HostCities y={5} />
        <HostTiles y={5} />
        <HostRoads y={6} rightRoadSprite={rightRoadSprite} rightRoadOffset={rightRoadOffset} verticalRoadSprite={verticalRoadSprite} downRoadOffset={downRoadOffset} roadSprites={roadSprites} />
        <HostCities y={6} />
        <HostTileNumbers />
        <HostBanditIcon />
      </g>
    </svg>
  )
}