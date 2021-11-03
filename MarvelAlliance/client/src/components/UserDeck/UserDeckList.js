import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import UserDeck from "./UserDeck";
import "./UserDeck.css";
import { getCurrentUserDecks } from "../../modules/deckManager";
import { getAllFaveDecks } from "../../modules/faveDeckManager";
import myDecksLogo from "../../images/myDecksLogo.PNG";

const UserDeckList = () => {
    // Array destructuring initializes variables and useState() hook returns an array of 2 things: the initial value of the state variable
    // that is set by what passed to the hook and a function/method that updates that state/variable
  const [userDecks, setUserDecks] = useState([]);
  const [faveDecks, setFaveDecks] = useState([]);
  const history= useHistory();

  const getUserDecks = () => {
    getCurrentUserDecks().then(userDecks => setUserDecks(userDecks));
  };

  useEffect(() => {
    getUserDecks();
    getAllFaveDecks().then(faveDecks => setFaveDecks(faveDecks));
    // listen for changes in userDecks state and re-render
  }, [userDecks]);

  // initial count value of i for the favorite decks array is zero;
  let i = 0;

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
                {
                      userDecks.map(userDeck => {
                        // matching id of deck to userFaveDeck deckId
                        let favoritedDecks = faveDecks.filter((userFaveDeck) => {
                          if (userDeck.id === userFaveDeck.deckId) {
                              return userFaveDeck;
                          }
                        });

                        let isFavorite;
                        // if the found user favorite decks array is empty and clicked, then the boolean value of the isFavorite prop passed
                        // to UserDeck component below will be true and app will render the colored thor hammer icon and unworthy button on deck
                          if (typeof favoritedDecks[i] !== 'undefined') {
                              if (favoritedDecks[i].deckId === userDeck.id) {
                                  isFavorite = true
                              }
                          // if the array is not empty when clicked, then the isFavorite prop passed to UserDeck component below will be 
                          // false and app will render the empty thor hammer icon and worthy button on the deck
                          } else {
                            isFavorite = false
                          };  
                                              
                        return <UserDeck userDeck={userDeck} key={userDeck.id} setUserDecks={setUserDecks} isFavorite={isFavorite} faveDeck={favoritedDecks[i]} />                                                                   
                      })
                }
            </div>
        </div>
    </div>
  );
};

export default UserDeckList;