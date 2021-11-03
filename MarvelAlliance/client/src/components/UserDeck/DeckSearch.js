//Component's responsibility is to capture the text input from the user. As the user types, the searchTerms state variable must 
//immediately be updated in the parent component:


import React from "react";
import { searchDecks } from "../../modules/deckManager";
import "./UserDeck.css";


const DeckSearch = ({ userDecks, setUserDecks }) => {

    // method retrieves the userProfileId value from the userDeck object to ensure user can only filter/search through privately owned decks:
    const getUserProfileId = () => {
        let userProfileId;
        if (userDecks.length > 0) {
            userProfileId = parseInt(userDecks[0].userProfileId);
        } else {
            userProfileId = 0;
        }
        return userProfileId;
    };

    return (
        <div className="searchDiv">
            <div className="searchBar">
                <div className="search">Search Deck:
                    <img className="searchIcon" src="https://img.icons8.com/ultraviolet/48/4a90e2/search--v1.png" alt="search icon"/>
                </div>
                <input type="text"
                    className="input--wide"
                    onKeyUp={(event) => {
                        let userProfileId = getUserProfileId();
                        searchDecks(event.target.value, userProfileId).then((deckResults) => {
                            setUserDecks(deckResults);
                        });
                    }}
                    placeholder="Search for a deck..." />
            </div>
        </div>
    )
};

export default DeckSearch;