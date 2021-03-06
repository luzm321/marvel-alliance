import React, { useEffect, useState } from "react";
import { getCardsByDeckId } from "../../modules/cardManager";
import UserDeckCard from "./UserDeckCard";
import { useParams, useHistory } from "react-router-dom";
import "./UserDeckCard.css";
import myCardsLogo from "../../images/myCardsLogo.PNG";
import noCardsLogo from "../../images/noCardsLogo.PNG";
import CardSearch from "./CardSearch";
import {StyleRoot} from 'radium';
import { LightSpeedInAnimation } from "../Animations/AnimationHelper";


const UserDeckCardList = () => {
    // Array destructuring initializes variables and useState() hook returns an array of 2 things: the initial value of the state variable
    // that is set by what passed to the hook and a function/method that updates that state/variable:
  const [cards, setCards] = useState([]);

  const {deckId} = useParams();
  const history = useHistory();

  const getCards = () => {
    getCardsByDeckId(deckId).then(cards => setCards(cards));
  };

  useEffect(() => {
    // if user cards array is empty, get user cards on initial render:
    if (cards.length === 0) {
      getCards();
    }
    // if there are any changes in cards state, re-render component when a new card is added to the deck
    // if (cards.length !== cards.length) {
    //   console.log('cards state updated!');
    //   getCards().then((cards) => setCards(cards));
    // }
    // listen for changes in cards state and re-render
  }, [cards]);


  return (
    <StyleRoot style={LightSpeedInAnimation(3)}>
      <div>
          <div className="container">
              <img className="myCardsLogo" src={myCardsLogo} alt="My Cards" />
              <div className="addDeckDiv">
                {
                  cards.length < 3 ? 
                      <button className="button is-light is-outlined is-rounded addDeckBut" 
                        onClick={() => {history.push(`/myDecks/${deckId}/cards/create`)}}>
                            Assemble Card<img className="createIcon" src="https://img.icons8.com/offices/80/000000/cards.png" />
                      </button>
                    : 
                      null
                }
              </div>
              <div className="container">
                <div className="row justify-content-center">
                    <CardSearch cards={cards} setCards={setCards}/>
                </div>
              </div>
              <div className="container justify-content-center">
                  {cards.length !== 0 ?
                  cards.map((card) => {
                      return <UserDeckCard card={card} key={card.id} setCards={setCards} />})
                      :
                      <img className="noCardsLogo" src={noCardsLogo} alt="No Cards Yet" />
                  }
              </div>
              <br/>
              <button className="button is-rounded is-light is-outlined returnDeckBut" onClick={() => {history.push(`/myDecks`)}}>
                Return to My Decks<img className="antMan" src="https://media.fortniteapi.io/images/cosmetics/d17d07e48bf17aef5e5ae6e65ee830c3/v2/background.png" alt="Ant-Man" />
              </button>
          </div>
      </div>
    </StyleRoot>
  );
};

export default UserDeckCardList;