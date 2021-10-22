import React from "react";
import "./Deck.css";

const Deck = ({ deck }) => {
  return (
    <div className="deckBox">
        <div class="card deckContainer">
            <header class="card-header">
                <p class="card-header-title cardHeader">
                {deck.title}
                </p>
                {/* <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button> */}
            </header>
            <div class="card-content">
                <div class="content cardContent">
                    {deck.details}           
                </div>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item">Worthy</a>
                <a href="#" class="card-footer-item">Edit</a>
                <a href="#" class="card-footer-item">Delete</a>
            </footer>
        </div>           
    </div>
  );
};

export default Deck;