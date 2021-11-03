import React, { useEffect, useState } from "react";
import { getCardsByDeckId } from "../../modules/cardManager";
import FaveCard from "./FaveCard";
import { useHistory } from "react-router-dom";
import "./FaveCard.css";
import faveCardsLogo from "../../images/faveCardsLogo.PNG";
import {StyleRoot} from 'radium';
import { LightSpeedInAnimation } from "../Animations/AnimationHelper";



const FaveCardList = () => {

  const [faveCards, setFaveCards] = useState([]);

  const history = useHistory();

  const getFaveCards = () => {
    // retrieving deckId from faveDeck object that was set in localStorage when user clicks on deck title to render the cards 
    // associated with each favorite deck:
    let deckId = parseInt(JSON.parse(localStorage.getItem("faveDeck")).deckId);
    getCardsByDeckId(deckId).then(cards => setFaveCards(cards));
  };

  useEffect(() => {
    getFaveCards();
  }, []);


  return (
    <StyleRoot style={LightSpeedInAnimation(3)}>
      <div>
          <div className="container">
              <img className="faveCardsLogo" src={faveCardsLogo} alt="Favorite Cards" />
              <div className="container justify-content-center">
                  {
                      faveCards.map((faveCard) => {
                          return <FaveCard faveCard={faveCard} key={faveCard.id} />
                      })
                  }
              </div>
              <br/>
              <button className="button is-rounded is-light is-outlined returnDeckBut" onClick={() => {history.push(`/faveDecks`)}}>
                Return to Favorite Decks<img className="antMan" src="https://media.fortniteapi.io/images/cosmetics/d17d07e48bf17aef5e5ae6e65ee830c3/v2/background.png" alt="Ant-Man" />
              </button>
          </div>
      </div>
    </StyleRoot>
  );
};

export default FaveCardList;