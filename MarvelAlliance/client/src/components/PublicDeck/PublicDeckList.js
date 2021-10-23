import React, { useEffect, useState } from "react";
import PublicDeck from "./PublicDeck";
import "./PublicDeck.css"
import { getAllDecks } from "../../modules/deckManager";

const PublicDeckList = () => {
    // Array destructuring initializes variables and useState() hook returns an array of 2 things: the initial value of the state variable
    // that is set by what passed to the hook and a function/method that updates that state/variable
  const [publicDecks, setPublicDecks] = useState([]);



  const getPublicDecks = () => {
    getAllDecks().then(publicDecks => setPublicDecks(publicDecks));
  };

  useEffect(() => {
    getPublicDecks();
  }, []);


  return (
    <div>
        <img className="publicDecksLogo" src="./images/decksLogo.PNG" alt="Public Decks" />
        <div className="publicDecks">
            <div className="publicDeckComponent">
                {console.log('public decks', publicDecks)}
                {publicDecks.map((publicDeck) => (
                    <PublicDeck publicDeck={publicDeck} key={publicDeck.id} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default PublicDeckList;