import React from "react";
import "./UserDeck.css";

const UserDeck = ({ userDeck }) => {
  return (
    <div className="deckBox">
        <div className="card deckContainer">
            <header className="card-header">
                <p className="card-header-title cardHeader">
                {userDeck.title}
                </p>
                {/* <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button> */}
            </header>
            <div className="card-content">
                <div className="content cardContent">
                    {userDeck.details}           
                </div>
            </div>
            <footer className="card-footer">
                <a href="#" className="card-footer-item">Worthy</a>
                <a href="#" className="card-footer-item">Edit</a>
                <a href="#" className="card-footer-item">Delete</a>
            </footer>
        </div>           
    </div>
  );
};

export default UserDeck;