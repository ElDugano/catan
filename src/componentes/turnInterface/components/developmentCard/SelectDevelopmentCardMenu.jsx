import { useContext } from "react";

import { TurnStateContext } from "../../../../state/turnState/TurnStateContext.js"
import { DevelopmentCardsContext } from "../../../../state/developmentCards/DevelopmentCardsContext.js";
import { CurrentPlayerTurnContext } from "../../../../state/currentPlayerTurn/CurrentPlayerTurnContext.js";

export default function SelectDevelopmentCardMenu() {
  const { setTurnStateToConfirmPlayKnightDevelopmentCard,
          setTurnStateToConfirmPlayRoadBuilderDevelopmentCard,
          setTurnStateToConfirmPlayYearOfPlentyDevelopmentCard,
          setTurnStateToConfirmPlayMonopolyDevelopmentCard,
          setTurnStateToIdle } = useContext(TurnStateContext);

  const { doesPlayerOwnsKnightDevelopmentCard,
          doesPlayerOwnsRoadBuildingDevelopmentCard,
          doesPlayerOwnsYearOfPlentyDevelopmentCard,
          doesPlayerOwnsMonopolyDevelopmentCard} = useContext(DevelopmentCardsContext);
  const { currentPlayerTurn } = useContext(CurrentPlayerTurnContext);

  const PlayKnightButton = doesPlayerOwnsKnightDevelopmentCard(currentPlayerTurn) ? <button onClick={() => setTurnStateToConfirmPlayKnightDevelopmentCard()}>Knight</button> :<button disabled>Knight</button>;
  const PlayRoadBuildingButton = doesPlayerOwnsRoadBuildingDevelopmentCard(currentPlayerTurn) ? <button onClick={() => setTurnStateToConfirmPlayRoadBuilderDevelopmentCard()}>Road Building</button> :<button disabled>Road Building</button>;
  const PlayYearOfPlentyButton = doesPlayerOwnsYearOfPlentyDevelopmentCard(currentPlayerTurn) ? <button onClick={() => setTurnStateToConfirmPlayYearOfPlentyDevelopmentCard()}>Year of Plenty</button> :<button disabled>Year of Plenty</button>;
  const PlayMonopolyButton = doesPlayerOwnsMonopolyDevelopmentCard(currentPlayerTurn) ? <button onClick={() => setTurnStateToConfirmPlayMonopolyDevelopmentCard()}>Monopoly</button> :<button disabled>Monopoly</button>;

  return (
    <>
    <h3>Select what develoment card you would like to player.</h3>
      {PlayKnightButton}
      {PlayRoadBuildingButton}
      {PlayYearOfPlentyButton}
      {PlayMonopolyButton}
      <button onClick={() => setTurnStateToIdle()}>Go Back</button>
    </>

  )
}