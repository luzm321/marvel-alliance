import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import FaveDeck from "./FaveDeck";
import "./FaveDeck.css";
import { getAllFaveDecks } from "../../modules/faveDeckManager";
import faveDecksLogo from "../../images/faveDecksLogo.PNG";
import {StyleRoot} from 'radium';
import { ZoomInDownAnimation } from "../Animations/AnimationHelper";

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
    <StyleRoot style={ZoomInDownAnimation(3)}>
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
    </StyleRoot>
  );
};

export default FaveDeckList;