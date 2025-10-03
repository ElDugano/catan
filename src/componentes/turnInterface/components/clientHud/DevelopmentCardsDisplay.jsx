import { useContext } from "react"
import { DevelopmentCardsContext } from "../../../../state/developmentCards/DevelopmentCardsContext"
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext"
//import { TurnStateContext } from  "../../../../state/turnState/TurnStateContext"

import victoryPointCard from "../../../../assets/developmentCards/victoryPointCard.svg"
import knightCard from "../../../../assets/developmentCards/knightCard.svg"
import monopolyCard from "../../../../assets/developmentCards/monopolyCard.svg"
import roadBuildingCard from "../../../../assets/developmentCards/roadBuildingCard.svg"
import yearOfPlentyCard from "../../../../assets/developmentCards/yearOfPlentyCard.svg"

export default function DevelopmentCardsDisplay(props) {
  const { playerDevelopmentCardHand, playerDevelopmentCardJustPurchased } = useContext(DevelopmentCardsContext);
  const { clientPlayerNumber } = useContext(CurrentPlayerTurnContext);
  //const { setTurnStateToConfirmPlayKnightDevelopmentCard,
  //        setTurnStateToConfirmPlayRoadBuilderDevelopmentCard,
  //        setTurnStateToConfirmPlayYearOfPlentyDevelopmentCard,
  //        setTurnStateToConfirmPlayMonopolyDevelopmentCard } = useContext(TurnStateContext);
    //It would be nice to have this menu allow you to play these cards, but some extra logic needs to be put in, like, not letting you play one while in the middle of playing another one, or doing thief related things.
    //TurnStateRollingTheDice (For knight only)
    //Idle
    //BuildMenu
    //  Maybe any building state.
    //Selecting a Development Card.

  console.log("Development Cards Available to play:", playerDevelopmentCardHand);
  console.log("Development Cards Just Purchased", playerDevelopmentCardJustPurchased);
  
  return (
    <div className={"fadeMainInterface"}>
      <div className={"buildCostDisplay"}>
        <div className={"exitButton"} onClick={props.exitFunction}>X</div>
        <h3>Development<br />Cards</h3>
        <div className={"developmentCardRow"}>
          <div className={"developmentCardHolder"}>
            {(playerDevelopmentCardHand[clientPlayerNumber]["Monopoly"] != 0 || 
              playerDevelopmentCardJustPurchased[clientPlayerNumber]["Monopoly"] != 0) &&
              <div className={"developmentCardQuantity"}>
                {playerDevelopmentCardHand[clientPlayerNumber]["Monopoly"]}
              </div>
            }
            { playerDevelopmentCardJustPurchased[clientPlayerNumber]["Monopoly"] != 0 &&
              <div className={"developmentCardQuantityJustPurchased"}>
                +{playerDevelopmentCardJustPurchased[clientPlayerNumber]["Monopoly"]}
              </div>
            }
            { playerDevelopmentCardHand[clientPlayerNumber]["Monopoly"] != 0 ?
              <img src={monopolyCard} /> :
              <img className={"disabled"} src={monopolyCard} />
            }
          </div>
          <div className={"developmentCardHolder"}>
            {(playerDevelopmentCardHand[clientPlayerNumber]["Road Building"] != 0 || 
              playerDevelopmentCardJustPurchased[clientPlayerNumber]["Road Building"] != 0) &&
              <div className={"developmentCardQuantity"}>
                {playerDevelopmentCardHand[clientPlayerNumber]["Road Building"]}
              </div>
            }
            { playerDevelopmentCardJustPurchased[clientPlayerNumber]["Road Building"] != 0 &&
              <div className={"developmentCardQuantityJustPurchased"}>
                +{playerDevelopmentCardJustPurchased[clientPlayerNumber]["Road Building"]}
              </div>
            }
            { playerDevelopmentCardHand[clientPlayerNumber]["Road Building"] != 0 ?
              <img src={roadBuildingCard} /> :
              <img className={"disabled"} src={roadBuildingCard} />
            }
          </div>
          <div className={"developmentCardHolder"}>
            {(playerDevelopmentCardHand[clientPlayerNumber]["Year of Plenty"] != 0 || 
              playerDevelopmentCardJustPurchased[clientPlayerNumber]["Year of Plenty"] != 0) &&
              <div className={"developmentCardQuantity"}>
                {playerDevelopmentCardHand[clientPlayerNumber]["Year of Plenty"]}
              </div>
            }
            { playerDevelopmentCardJustPurchased[clientPlayerNumber]["Year of Plenty"] != 0 &&
              <div className={"developmentCardQuantityJustPurchased"}>
                +{playerDevelopmentCardJustPurchased[clientPlayerNumber]["Year of Plenty"]}
              </div>}
            { playerDevelopmentCardHand[clientPlayerNumber]["Year of Plenty"] != 0 ?
              <img src={yearOfPlentyCard} /> :
              <img className={"disabled"} src={yearOfPlentyCard} />
            }
          </div>
        </div>
        <div className={"developmentCardRow"}>
          <div className={"developmentCardHolder"}>
            {(playerDevelopmentCardHand[clientPlayerNumber]["Knight"] != 0 || 
              playerDevelopmentCardJustPurchased[clientPlayerNumber]["Knight"] != 0) &&
              <div className={"developmentCardQuantity"}>
                {playerDevelopmentCardHand[clientPlayerNumber]["Knight"]}
              </div>
            }
            {playerDevelopmentCardJustPurchased[clientPlayerNumber]["Knight"] != 0 &&
              <div className={"developmentCardQuantityJustPurchased"}>
                +{playerDevelopmentCardJustPurchased[clientPlayerNumber]["Knight"]}
              </div>}
            { playerDevelopmentCardHand[clientPlayerNumber]["Knight"] != 0 ?
              <img src={knightCard} /> :
              <img className={"disabled"} src={knightCard} />
            }
          </div>
          <div className={"developmentCardHolder"}>
            {(playerDevelopmentCardHand[clientPlayerNumber]["Victory Point"] != 0 || 
              playerDevelopmentCardJustPurchased[clientPlayerNumber]["Victory Point"] != 0) &&
              <div className={"developmentCardQuantity"}>
                {playerDevelopmentCardHand[clientPlayerNumber]["Victory Point"]}
              </div>
            }
            { playerDevelopmentCardJustPurchased[clientPlayerNumber]["Victory Point"] != 0 &&
              <div className={"developmentCardQuantityJustPurchased"}>
                +{playerDevelopmentCardJustPurchased[clientPlayerNumber]["Victory Point"]}
              </div>}
            { playerDevelopmentCardHand[clientPlayerNumber]["Victory Point"] != 0 ?
              <img src={victoryPointCard} /> :
              <img className={"disabled"} src={victoryPointCard} />
            }
          </div>
        </div>
        <button className="exitButton" onClick={props.exitFunction}>Exit</button>
      </div>
    </div>
  )
}