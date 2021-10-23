import React from "react";
import "./Deck.css";

const Deck = ({ deck }) => {
  return (
    <div className="deckBox">
        <div className="card deckContainer">
            <header className="card-header">
                <p className="card-header-title cardHeader">
                {deck.title}
                </p>
                {/* <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button> */}
            </header>
            <div className="card-content">
                <div className="content cardContent">
                    {deck.details}           
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

export default Deck;