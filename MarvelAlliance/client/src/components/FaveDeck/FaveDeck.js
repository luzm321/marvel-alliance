import React, { useState, useEffect } from "react";
import { deleteFaveDeck, getAllFaveDecks, getFaveDeckById } from "../../modules/faveDeckManager";
import "./FaveDeck.css";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";

const FaveDeck = ({ faveDeck, setFaveDecks }) => {

  const [favoriteDeck, setFavoriteDeck] = useState(faveDeck);

  const history = useHistory();

  useEffect(() => {
    getFaveDeckById(favoriteDeck.id)
  }, []);

  // Method for deleting a fave deck with sweetalert2 npm alert for form validation implemented:
  const handleDeleteFaveDeck = () => {
    Swal.fire({
      title: "Are you certain you want to remove this deck as a favorite?",
      icon: "warning",
      confirmButtonColor: "#20B2AA",
      showCancelButton: true,
      cancelButtonColor: "#CD5C5C",
      confirmButtonText: "Yes, I'm certain!"
    }).then((response) => {
      if (response.isConfirmed) {
        deleteFaveDeck(favoriteDeck.id).then(() => {
          Swal.fire(
            'Deleted unworthy deck!',
            'Thanos snapped his fingers and removed favorite deck from collection!',
            'success'
          )
        }).then(() => {
            getAllFaveDecks()
            .then(userFaveDecks => setFaveDecks(userFaveDecks))
        });
        history.push("/faveDecks")
      };
    });
};

  return (
    <div className="deckBox">
        <div className="card deckContainer">
            <header className="card-header">
                <p className="card-header-title cardHeader">
                    <Link to={`/faveDecks/${favoriteDeck.id}/cards`}>
                        {favoriteDeck?.deck?.title}
                    </Link>
                </p>
            </header>
            <div className="card-content">
                <div className="content cardContent">
                    {favoriteDeck?.deck?.details}           
                </div>
            </div>
            <footer className="card-footer">
                <a href="#" className="card-footer-item footerItem">
                    Unworthy<img className="hammerIconDeck" src="https://img.icons8.com/fluency/48/000000/thor-hammer.png"/>
                </a>
            </footer>
        </div>           
    </div>
  );
};

export default FaveDeck;