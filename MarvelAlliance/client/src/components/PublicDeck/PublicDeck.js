import React from "react";
import "./PublicDeck.css";

const PublicDeck = ({ publicDeck }) => {
  return (
    <div className="publicDeckBox">
        <div className="card publicDeckContainer">
            <header className="card-header">
                <p className="card-header-title publicCardHeader">
                {publicDeck.title}
                </p>
            </header>
            <div className="card-content">
                <div className="content publicCardContent">
                    {publicDeck.details}           
                </div>
            </div>
            {/* <footer className="card-footer">
                <a href="#" className="card-footer-item">Worthy</a>
                <a href="#" className="card-footer-item">Edit</a>
                <a href="#" className="card-footer-item">Delete</a>
            </footer> */}
        </div>           
    </div>
  );
};

export default PublicDeck;