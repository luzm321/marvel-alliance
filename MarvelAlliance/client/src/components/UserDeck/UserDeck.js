import React, { useState, useEffect } from "react";
import { deleteDeck, getCurrentUserDecks, getDeckById } from "../../modules/deckManager";
import { addFaveDeck, deleteFaveDeck } from "../../modules/faveDeckManager";
import "./UserDeck.css";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserDeck = ({ userDeck, setUserDecks, isFavorite, faveDeck }) => {

  const [currentDeck, setCurrentDeck] = useState(userDeck);

  const history = useHistory();

  useEffect(() => {
    getDeckById(currentDeck.id)
  }, []);

  // Method for deleting a deck with sweetalert2 npm alert for form validation implemented:
  const handleDeleteDeck = () => {
    Swal.fire({
      title: "Are you certain you want to delete this deck?",
      icon: "warning",
      confirmButtonColor: "#20B2AA",
      showCancelButton: true,
      cancelButtonColor: "#CD5C5C",
      confirmButtonText: "Yes, I'm certain!"
    }).then((response) => {
      if (response.isConfirmed) {
        deleteDeck(currentDeck.id).then(() => {
          Swal.fire(
            'Deleted!',
            'Thanos snapped his fingers and removed deck from collection!',
            'success'
          )
        }).then(() => {
            getCurrentUserDecks()
            .then(userDecks => setUserDecks(userDecks))
        });
        history.push("/myDecks")
      };
    });
  };

  // ADD FAVORITE DECK
  const saveFaveDeck = () => {
    const newFaveDeck = {
        deckId: currentDeck.id,
      // id and userProfileId: handled by back-end
    };
        
        addFaveDeck(newFaveDeck).then(() => {
          // update userDecks state in UserDeckList parent component to re-render changes
          getCurrentUserDecks().then(userDecks => setUserDecks(userDecks));
        });
  };

  // REMOVE FAVORITE DECK
  const removeFaveDeck = () => {
    deleteFaveDeck(faveDeck.id).then(() => {
      // update userDecks state in UserDeckList parent component to re-render changes
      getCurrentUserDecks().then(userDecks => setUserDecks(userDecks));
    });
  };

  const checkState = () => {
    console.log("deck", userDeck, "is true", isFavorite);
  }

  return (
    <div className="deckBox">
        <div className="card deckContainer">
            <header className="card-header">
                <p className="card-header-title cardHeader">
                  <Link to={`/myDecks/${currentDeck.id}/cards`}>
                    {currentDeck.title}
                  </Link>
                </p>
            </header>
            <div className="card-content">
                <div className="content cardContent">
                    {currentDeck.details}           
                </div>
            </div>
            {
              isFavorite ? 
                <footer className="card-footer">
                  <a onClick={() => {removeFaveDeck()}} className="card-footer-item footerItem">
                      Unworthy<img className="hammerIconDeck" src="https://img.icons8.com/fluency/48/000000/thor-hammer.png"/>
                  </a>
                  <a onClick={() => {history.push(`/myDecks/edit/${currentDeck.id}`)}} className="card-footer-item footerItem">
                      Edit<img className="pencilIconDeck" src="https://img.icons8.com/ios-glyphs/30/000000/pencil--v1.png"/>
                  </a>
                  <a onClick={() => {handleDeleteDeck()}} className="card-footer-item footerItem">
                      Delete<img className="trashIconDeck" src="https://img.icons8.com/material/24/000000/trash--v1.png"/>
                  </a>
                </footer>
              :
                <footer className="card-footer">
                  <a onClick={() => {saveFaveDeck()}} className="card-footer-item footerItem">
                      Worthy<img className="hammerIconDeck" src="https://img.icons8.com/glyph-neue/48/000000/thor-hammer.png"/>
                  </a>
                  <a onClick={() => {history.push(`/myDecks/edit/${currentDeck.id}`)}} className="card-footer-item footerItem">
                      Edit<img className="pencilIconDeck" src="https://img.icons8.com/ios-glyphs/30/000000/pencil--v1.png"/>
                  </a>
                  <a onClick={() => {handleDeleteDeck()}} className="card-footer-item footerItem">
                      Delete<img className="trashIconDeck" src="https://img.icons8.com/material/24/000000/trash--v1.png"/>
                  </a>
                </footer>
            }
        </div>           
    </div>
  );
};

export default UserDeck;