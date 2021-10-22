import React from "react";

const Deck = ({ deck }) => {
  return (
    <div>
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                {deck.title}
                </p>
                <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </header>
            <div class="card-content">
                <div class="content">
                    {deck.details}
                    <a href="#">#Marvel Alliance</a>             
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