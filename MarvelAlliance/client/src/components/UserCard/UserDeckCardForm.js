import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { getMarvelCharacterByName } from "../../modules/heroApiManager";
import { addCard } from "../../modules/cardManager";
import Swal from "sweetalert2";
import "./UserDeckCard.css";

const UserDeckCardForm = () => {

    //const [card, setCard] = useState({});
    const [character, setCharacter] = useState("");
    const [characterInfo, setCharacterInfo] = useState([]);

    const history = useHistory();
    //const [isLoading, setIsLoading] = useState(true); // submit button disabled until user has typed values for input fields on form
    //const { cardId } = useParams();
    const { deckId } = useParams();

    const handleSetCharacter = (event) => {
        setCharacter(event.target.value);
    };

    const getCharacter = () => {
        getMarvelCharacterByName(character, "8f26faf3d251d1c35383404a75368f3a").then((marvelCharacter) => {
          setCharacterInfo(marvelCharacter);
        })
    };

    // // When a field changes, update state. The return will re-render and display based on the values in state:
    // const handleInputChange = (event) => {
    //     /* When changing a state object or array,
    //     create a copy, make changes, and then set state.*/
    //     const newCard = { ...card }
    //     /* Dynamically set the properties of the card obj to the new corresponding values
    //     using object bracket notation. */
    //     newCard[event.target.id] = event.target.value
    //     // update state
    //     setCard(newCard)
    // };

    const saveNewCard = () => {
    //constructing character card object to save to db:
          const newCard = {
            deckId: deckId,
            characterName: characterInfo.name,
            //health: value generated by back-end
            power: characterInfo.powerstats.power,
            speed: characterInfo.powerstats.speed,
            strength: characterInfo.powerstats.strength,
            image: characterInfo.images.lg,
            description: characterInfo.description 
          }
          // Invoke addCard passing the new card object as an argument
          // Once complete, change the url and display the user card list
          addCard(newCard)
            .then(() => history.push(`/myDecks/${deckId}/cards`));
    };


    // // Reroute to My Decks page on cancel:
    // const handleClickCancel = () => {
    // // window.history.back();
    //     history.push(`/myDecks/${deckId}/cards`);
    // };

    return (
        <div>
            <div className="field cardForm">
                {/* <h1 className="cardForm__title">{ cardId ? "~Edit Card Description~" : "~New Card~" }</h1> */}
                <h1>New Card</h1>
                <input onChange={(event) => handleSetCharacter(event)} placeholder="Marvel Character Name..."></input>
                <button onClick={() => getCharacter()}>Get Character</button>
                <button onClick={() => saveNewCard()}>Add Character</button>
                <button className="button is-rounded is-light is-outlined returnDeckBut" onClick={() => {history.push(`/myDecks/${deckId}/cards`)}}>Return to My Cards</button>
            </div>
        </div>
    );
};


export default UserDeckCardForm;