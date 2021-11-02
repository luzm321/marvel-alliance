import React, { useEffect, useState } from "react";
import { getCardsByDeckId } from "../../modules/cardManager";
import FaveCard from "./FaveCard";
import { useParams, useHistory } from "react-router-dom";
import "./FaveCard.css";
import faveCardsLogo from "../../images/faveCardsLogo.PNG";



const FaveCardList = () => {

  const [faveCards, setFaveCards] = useState([]);

  const {deckId} = useParams();
  const history = useHistory();

  const getFaveCards = () => {
    getCardsByDeckId(deckId).then(cards => setFaveCards(cards));
  };

  useEffect(() => {
    getFaveCards();
  }, []);


  return (
    <div>
        <div className="container">
            <img className="faveCardsLogo" src={faveCardsLogo} alt="Favorite Cards" />
            <div className="container justify-content-center">
                {console.log('fave cards', faveCards)}
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
  );
};

export default FaveCardList;