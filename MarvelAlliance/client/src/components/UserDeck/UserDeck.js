import React from "react";
import "./UserDeck.css";
import { useHistory } from "react-router";

const UserDeck = ({ userDeck }) => {

  const history = useHistory();

  return (
    <div className="deckBox">
        <div className="card deckContainer">
            <header className="card-header">
                <p className="card-header-title cardHeader">
                {userDeck.title}
                </p>
            </header>
            <div className="card-content">
                <div className="content cardContent">
                    {userDeck.details}           
                </div>
            </div>
            <footer className="card-footer">
                <a href="#" className="card-footer-item">Worthy</a>
                <a onClick={() => {history.push(`/myDecks/edit/${userDeck.id}`)}} className="card-footer-item">Edit</a>
                <a href="#" className="card-footer-item">Delete</a>
            </footer>
        </div>           
    </div>
  );
};

export default UserDeck;