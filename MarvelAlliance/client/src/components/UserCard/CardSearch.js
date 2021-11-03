import React from "react";
import { searchCards } from "../../modules/cardManager";
import "./UserDeckCard.css";


const CardSearch = ({ cards, setCards }) => {

    // method retrieves the deckId value from the card object to ensure user can only filter/search through private cards
    // associated with a user's deck:
    const getDeckId = () => {
        let deckId;
        if (cards.length > 0) {
            deckId = parseInt(cards[0].deckId);
        } else {
            deckId = 0;
        }
        return deckId;
    };

    return (
        <div className="searchDiv">
            <div className="searchBar">
                <div className="search">Search Card:
                    <img className="searchIcon" src="https://img.icons8.com/ultraviolet/48/4a90e2/search--v1.png" alt="search icon"/>
                </div>
                <input type="text"
                    className="input--wide"
                    onKeyUp={(event) => {
                        let deckId = getDeckId();
                        searchCards(event.target.value, deckId).then((cardResults) => {
                            setCards(cardResults);
                        });
                    }}
                    placeholder="Search for a card..." />
            </div>
        </div>
    )
};

export default CardSearch;