import React, { useEffect, useState } from "react";
import { getCardsByDeckId } from "../../modules/cardManager";
import UserDeckCard from "./UserDeckCard";
import { useParams, useHistory } from "react-router-dom";
import "./UserDeckCard.css";

const UserDeckCardList = () => {
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
            <h1 className="cardHeading">My Cards:</h1><br/>
            {/* <img className="myCardsLogo" src="./images/myCardsLogo.PNG" alt="My Cards" /> */}
            <div className="container justify-content-center">
                {console.log(cards)}
                {cards.length !== 0 ?
                cards.map((card) => {
                    return <UserDeckCard card={card} key={card.id} />})
                    :
                    <h1 className="noCardsHeader">No Cards Yet</h1>
                }
            </div>
            <br/>
            <button className="button is-rounded is-light is-outlined returnDeckBut" onClick={() => {history.push(`/myDecks`)}}>Return to My Decks</button>
        </div>
    </div>
  );
};

export default UserDeckCardList;