import React from "react";
import "./PublicDeck.css";
import { Link } from "react-router-dom";

const PublicDeck = ({ publicDeck }) => {
  return (
    <div className="publicDeckBox">
        <div className="card publicDeckContainer">
            <header className="card-header">
                <p className="card-header-title publicCardHeader">
                    <Link to={`/publicDecks/${publicDeck.id}/cards`}>
                        {publicDeck.title}
                    </Link>
                </p>
            </header>
            <div className="card-content">
                <div className="content publicCardContent">
                    {publicDeck.details}           
                </div>
            </div>
        </div>           
    </div>
  );
};

export default PublicDeck;