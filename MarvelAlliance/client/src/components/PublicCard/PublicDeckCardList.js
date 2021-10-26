import React, { useEffect, useState } from "react";
import { getCardsByDeckId } from "../../modules/cardManager";
import PublicDeckCard from "./PublicDeckCard";
import { useParams, useHistory } from "react-router-dom";
import "./PublicDeckCard.css";

const PublicDeckCardList = () => {
    // Array destructuring initializes variables and useState() hook returns an array of 2 things: the initial value of the state variable
    // that is set by what passed to the hook and a function/method that updates that state/variable
  const [cards, setCards] = useState([]);

  const {deckId} = useParams();
  const history = useHistory();

  const getCards = () => {
    getCardsByDeckId(deckId).then(cards => setCards(cards));
  };

  useEffect(() => {
    getCards();
  }, []);


  return (
    <div>
        <div className="container">
            <h1 className="publicCardHeading">Public Cards:</h1><br/>
            {/* <img className="myCardsLogo" src="./images/cardsLogo.PNG" alt="Public Cards" /> */}
            <div className="container justify-content-center">
                {console.log(cards)}
                {cards.length !== 0 ?
                cards.map((card) => {
                    return <PublicDeckCard card={card} key={card.id} />})
                    :
                    <h1 className="noCardsHeader">No Cards Yet</h1>
                }
            </div>
            <br/>
            <button className="button is-rounded is-light is-outlined returnDeckButton" onClick={() => {history.push(`/publicDecks`)}}>Return to Public Decks</button>
        </div>
    </div>
  );
};

export default PublicDeckCardList;