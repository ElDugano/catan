import { useContext } from "react";
import { DevelopmentCardsContext } from "../../../../state/developmentCards/DevelopmentCardsContext.js";

import victoryPointCard from "../../../../assets/developmentCards/victoryPointCard.svg"
import knightCard from "../../../../assets/developmentCards/knightCard.svg"
import monopolyCard from "../../../../assets/developmentCards/monopolyCard.svg"
import roadBuildingCard from "../../../../assets/developmentCards/roadBuildingCard.svg"
import yearOfPlentyCard from "../../../../assets/developmentCards/yearOfPlentyCard.svg"


export default function NewestDevelopmentCardReceived() {
  const { newestDevelopmentCardRecieved, setNewestDevelopmentCardRecieved } = useContext(DevelopmentCardsContext);

  let cardDisplay = null;
  switch (newestDevelopmentCardRecieved) {
    case "Knight":
      cardDisplay = <img src={knightCard} />
    break;
    case "Monopoly":
      cardDisplay = <img src={monopolyCard} />
    break;
    case "Road Building":
      cardDisplay = <img src={roadBuildingCard} />
    break;
    case "Year of Plenty":
      cardDisplay = <img src={yearOfPlentyCard} />
    break;
    case "Victory Point":
      cardDisplay = <img src={victoryPointCard} />
    break;
  }
  
  if (newestDevelopmentCardRecieved != null)
    return(
  <div className={"fadeMainInterfaceRecieveCard"}>
    <div className={"recieveCardInterface"}>
      <h3>Development Card Recieved</h3>
      {cardDisplay}
      <button className={"acknowledgeButton"} onClick={() => setNewestDevelopmentCardRecieved(null)}>Thanks!</button>
    </div>
  </div>
  )
  else
    return(<></>);
}