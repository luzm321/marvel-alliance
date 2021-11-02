import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import FaveDeck from "./FaveDeck";
import "./FaveDeck.css";
import { getAllFaveDecks } from "../../modules/faveDeckManager";
import faveDecksLogo from "../../images/faveDecksLogo.PNG";

const FaveDeckList = () => {
    
  const [faveDecks, setFaveDecks] = useState([]);
  const history= useHistory();

  const getUserFaveDecks = () => {
    getAllFaveDecks().then(faveDecks => setFaveDecks(faveDecks));
  };

  useEffect(() => {
    getUserFaveDecks();
  }, []);

  return (
    <div>
        <img className="faveDecksLogo" src={faveDecksLogo} alt="Favorite Decks" />
        <div className="decks">
            <div className="deckComponent">
                {console.log('user fave decks', faveDecks)}
                {faveDecks.map((faveDeck) => (
                    <FaveDeck faveDeck={faveDeck} key={faveDeck.id} setFaveDecks={setFaveDecks} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default FaveDeckList;