import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import UserDeck from "./UserDeck";
import "./UserDeck.css";
import { getCurrentUserDecks } from "../../modules/deckManager";
import myDecksLogo from "../../images/myDecksLogo.PNG";

const UserDeckList = () => {
    // Array destructuring initializes variables and useState() hook returns an array of 2 things: the initial value of the state variable
    // that is set by what passed to the hook and a function/method that updates that state/variable
  const [userDecks, setUserDecks] = useState([]);
  const history= useHistory();

  const getUserDecks = () => {
    getCurrentUserDecks().then(userDecks => setUserDecks(userDecks));
  };

  useEffect(() => {
    getUserDecks();
  }, []);

  return (
    <div>
        <img className="myDecksLogo" src={myDecksLogo} alt="My Decks" />
        <div className="addDeckDiv">
          <button className="button is-light is-outlined is-rounded addDeckBut" 
            onClick={() => {history.push("/myDecks/create")}}>
                Assemble Deck<img className="createIcon" src="https://img.icons8.com/offices/80/000000/cards.png" />
          </button>
        </div>
        <div className="decks">
            <div className="deckComponent">
                {console.log('user decks', userDecks)}
                {userDecks.map((userDeck) => (
                    <UserDeck userDeck={userDeck} key={userDeck.id} setUserDecks={setUserDecks} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default UserDeckList;