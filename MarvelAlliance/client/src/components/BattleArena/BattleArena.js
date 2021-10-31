import React, {useState, useEffect } from "react";
import { getCurrentUserDecks } from "../../modules/deckManager";
import { getCardsByDeckId } from "../../modules/cardManager";
import DeckDetail from "./DeckDetail";
import "./BattleArena.css";
import battleArenaLogo from "../../images/battleArenaLogo.PNG";

const BattleArena = () => {

    const [decks, setDecks] = useState([]);
    const [showGameViewModal, setShowGameViewModal] = useState(false)

    const [deckSelection, setDeckSelection] = useState({
        isDeckSelected: false,
        deckId: 0,
        cards: [],
        chosenDeck: {}
    });

    useEffect(() => {
        getCurrentUserDecks()
        .then(userDecks => setDecks(userDecks));
    }, []);

    const handleDeckSelection = (event) => {
        //deck object target of even when selected from dropdown:
        const deck = event;
        const newGame = {...deckSelection}
        getCardsByDeckId(deck.id).then(deckCards => {
        // if user clicks on the same deck again, value of isDeckSelected will stay false so deck detail component is not rendered
            if (newGame["deckId"] === deck.id) {
                newGame["deckId"] = deck.id;
                newGame["isDeckSelected"] = false;
                newGame["cards"] = deckCards;
                newGame["chosenDeck"] = deck;
            // else, change value of isDeckSelected property to true to render the DeckDetail component
            } else {
                newGame["deckId"] = deck.id
                newGame["isDeckSelected"] = true
                newGame["cards"] = deckCards
                newGame["chosenDeck"] = deck;
            }
             //setting state with new values
             setDeckSelection(newGame)
        });
    };

    return (
        <div>
            <img className="battleArenaLogo" src={battleArenaLogo} alt="Battle Arena" />
            <div className="deckDropdown">
                <label className="deckLabel" htmlFor="deckSelection">Select Deck: </label>
                <div className="select is-rounded select is-danger deckSelectDiv">
                    <select onChange={(event) =>  { 
                        // Need to use JSON.parse() method on the event.target.value because we need to extract the data without strings 
                        // for the id and event object which will contain the chosen deck object itself
                        let parsedEventTargetValue = JSON.parse(event.target.value);
                        handleDeckSelection(parsedEventTargetValue)}} className="deckSelect" id="deckId" >
                        <option className="chooseDeck" defaultValue value="0">Deck Title...</option>
                            {
                                decks.map(deck => {
                                // Need to use JSON.stringify() method on the deck object because the value attribute needs the value to be a string
                                    return <option key={deck.id} value={JSON.stringify(deck)}>{deck.title}</option>
                                })
                            }
                    </select>
                </div>
            </div>
            {/* Ternary below will conditionally render the DeckDetail component based on boolean value of isDeckSelected property*/}
            <div>
                {
                    deckSelection.isDeckSelected ? 
                        <DeckDetail deckSelection={deckSelection} setShowGameViewModal={setShowGameViewModal}/> 
                    : 
                    null
                }
            </div>
        </div>
    );
};

export default BattleArena;