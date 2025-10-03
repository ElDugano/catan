import { useContext } from "react";

import { TurnStateContext } from "../../../../state/turnState/TurnStateContext.js"
import { DevelopmentCardsContext } from "../../../../state/developmentCards/DevelopmentCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";

import knightCard from "../../../../assets/developmentCards/knightCard.svg"
import monopolyCard from "../../../../assets/developmentCards/monopolyCard.svg"
import roadBuildingCard from "../../../../assets/developmentCards/roadBuildingCard.svg"
import yearOfPlentyCard from "../../../../assets/developmentCards/yearOfPlentyCard.svg"

export default function SelectDevelopmentCardMenu() {
  const { setTurnStateToConfirmPlayKnightDevelopmentCard,
          setTurnStateToConfirmPlayRoadBuilderDevelopmentCard,
          setTurnStateToConfirmPlayYearOfPlentyDevelopmentCard,
          setTurnStateToConfirmPlayMonopolyDevelopmentCard,
          setTurnStateToIdle } = useContext(TurnStateContext);

  const { doesPlayerOwnsKnightDevelopmentCard,
          doesPlayerOwnsRoadBuildingDevelopmentCard,
          doesPlayerOwnsYearOfPlentyDevelopmentCard,
          doesPlayerOwnsMonopolyDevelopmentCard,
          playerDevelopmentCardHand } = useContext(DevelopmentCardsContext);
  const { clientPlayerNumber } = useContext(CurrentPlayerTurnContext);

  const PlayKnightButton = doesPlayerOwnsKnightDevelopmentCard(clientPlayerNumber) ? <button onClick={() => setTurnStateToConfirmPlayKnightDevelopmentCard()}>Knight</button> :<button disabled>Knight</button>;
  const PlayRoadBuildingButton = doesPlayerOwnsRoadBuildingDevelopmentCard(clientPlayerNumber) ? <button onClick={() => setTurnStateToConfirmPlayRoadBuilderDevelopmentCard()}>Road Building</button> :<button disabled>Road Building</button>;
  const PlayYearOfPlentyButton = doesPlayerOwnsYearOfPlentyDevelopmentCard(clientPlayerNumber) ? <button onClick={() => setTurnStateToConfirmPlayYearOfPlentyDevelopmentCard()}>Year of Plenty</button> :<button disabled>Year of Plenty</button>;
  const PlayMonopolyButton = doesPlayerOwnsMonopolyDevelopmentCard(clientPlayerNumber) ? <button onClick={() => setTurnStateToConfirmPlayMonopolyDevelopmentCard()}>Monopoly</button> :<button disabled>Monopoly</button>;

  return (
    <div className={"selectDevelopmentCardMenu"}>
      <h3>Development Card</h3>
      <div className={"developmentCardRow"}>
        <div>
          {doesPlayerOwnsKnightDevelopmentCard(clientPlayerNumber) ?
            <img onClick={() => setTurnStateToConfirmPlayKnightDevelopmentCard()} className="available" src={knightCard} /> :
            <img className={"disabled"} src={knightCard} />
          }
          {playerDevelopmentCardHand[clientPlayerNumber]["Knight"] != 0 &&
            <div className={"developmentCardQuantity"}>{playerDevelopmentCardHand[clientPlayerNumber]["Knight"]}</div>
          }
        </div>
        <div>
          {doesPlayerOwnsRoadBuildingDevelopmentCard(clientPlayerNumber) ?
            <img onClick={() => setTurnStateToConfirmPlayRoadBuilderDevelopmentCard()} className="available" src={roadBuildingCard} /> :
            <img className={"disabled"} src={roadBuildingCard} />
          }
          {playerDevelopmentCardHand[clientPlayerNumber]["Road Building"] != 0 &&
            <div className={"developmentCardQuantity"}>{playerDevelopmentCardHand[clientPlayerNumber]["Road Building"]}</div>
          }
        </div>    
      </div>
      <div className={"developmentCardRow"}>
        <div>
          {doesPlayerOwnsYearOfPlentyDevelopmentCard(clientPlayerNumber) ?
            <img onClick={() => setTurnStateToConfirmPlayYearOfPlentyDevelopmentCard()} className="available" src={yearOfPlentyCard} /> :
            <img className={"disabled"} src={yearOfPlentyCard} />
          }
          {playerDevelopmentCardHand[clientPlayerNumber]["Year of Plenty"] != 0 &&
            <div className={"developmentCardQuantity"}>{playerDevelopmentCardHand[clientPlayerNumber]["Year of Plenty"]}</div>
          }
        </div>
        <div>
          {doesPlayerOwnsMonopolyDevelopmentCard(clientPlayerNumber) ?
            <img onClick={() => setTurnStateToConfirmPlayMonopolyDevelopmentCard()} className="available" src={monopolyCard} /> :
            <img className={"disabled"} src={monopolyCard} />
          }
          {playerDevelopmentCardHand[clientPlayerNumber]["Monopoly"] != 0 &&
            <div className={"developmentCardQuantity"}>{playerDevelopmentCardHand[clientPlayerNumber]["Monopoly"]}</div>
          }
        </div>
      </div>
      <button onClick={() => setTurnStateToIdle()}>Go Back</button>
    </div>

  )
}