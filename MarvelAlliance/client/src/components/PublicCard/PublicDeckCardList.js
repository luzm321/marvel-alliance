import React, { useEffect, useState } from "react";
import { getCardsByDeckId } from "../../modules/cardManager";
import PublicDeckCard from "./PublicDeckCard";
import { useParams, useHistory } from "react-router-dom";
import "./PublicDeckCard.css";
import publicCardsLogo from "../../images/publicCardsLogo.PNG";
import noCardsLogo from "../../images/noCardsLogo.PNG";

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
            <img className="myCardsLogo" src={publicCardsLogo} alt="My Cards" />
            <div className="container justify-content-center">
                {console.log(cards)}
                {cards.length !== 0 ?
                cards.map((card) => {
                    return <PublicDeckCard card={card} key={card.id} />})
                    :
                    // <h1 className="noCardsHeader">No Cards Yet</h1>
                    <img className="noCardsLogo" src={noCardsLogo} alt="No Cards Yet" />
                }
            </div>
            <br/>
            <button className="button is-rounded is-light is-outlined returnDeckButton" onClick={() => {history.push(`/publicDecks`)}}>
              Return to Public Decks<img className="antMan" src="https://media.fortniteapi.io/images/cosmetics/d17d07e48bf17aef5e5ae6e65ee830c3/v2/background.png" alt="Ant-Man" />
            </button>
        </div>
    </div>
  );
};

export default PublicDeckCardList;