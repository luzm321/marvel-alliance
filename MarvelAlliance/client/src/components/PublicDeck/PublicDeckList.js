import React, { useEffect, useState } from "react";
import PublicDeck from "./PublicDeck";
import "./PublicDeck.css"
import { getAllDecks } from "../../modules/deckManager";
import publicDecksLogo from "../../images/publicDecksLogo.PNG";

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
        <img className="publicDecksLogo" src={publicDecksLogo} alt="Public Decks" />
        <div className="publicDecks">
            <div className="publicDeckComponent">
                {publicDecks.map((publicDeck) => (
                    <PublicDeck publicDeck={publicDeck} key={publicDeck.id} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default PublicDeckList;