import React, { useEffect, useState } from "react";
import Deck from "./Deck";
import { getCurrentUserDecks } from "../../modules/deckManager";

const DeckList = () => {
    // Array destructuring initializes variables and useState() hook returns an array of 2 things: the initial value of the state variable
    // that is set by what passed to the hook and a function/method that updates that state/variable
  const [decks, setDecks] = useState([]);



  const getUserDecks = () => {
    getCurrentUserDecks().then(decks => setDecks(decks));
  };

  useEffect(() => {
    getUserDecks();
  }, []);


  return (
    <div>
        <img className="myDecksLogo" src="./images/myDecksLogo.PNG" alt="My Decks" />
        <div className="decks">
            <div className="">
                {console.log(decks)}
                {decks.map((deck) => (
                    <Deck deck={deck} key={deck.id} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default DeckList;