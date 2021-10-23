import React, { useEffect, useState } from "react";
import UserDeck from "./UserDeck";
import "./UserDeck.css"
import { getCurrentUserDecks } from "../../modules/deckManager";

const UserDeckList = () => {
    // Array destructuring initializes variables and useState() hook returns an array of 2 things: the initial value of the state variable
    // that is set by what passed to the hook and a function/method that updates that state/variable
  const [userDecks, setUserDecks] = useState([]);



  const getUserDecks = () => {
    getCurrentUserDecks().then(userDecks => setUserDecks(userDecks));
  };

  useEffect(() => {
    getUserDecks();
  }, []);


  return (
    <div>
        <img className="myDecksLogo" src="./images/myDecksLogo.PNG" alt="My Decks" />
        <div className="decks">
            <div className="deckComponent">
                {console.log('user decks', userDecks)}
                {userDecks.map((userDeck) => (
                    <UserDeck userDeck={userDeck} key={userDeck.id} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default UserDeckList;