import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../modules/authManager";
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "./Header.css";

const Header = ({ isLoggedIn }) => {
    // using the <Link> component import from the react router instead of anchor tags for navigation
    // and use the "to" attribute to specify where we want the link to take the user to:
  return (
    <nav className="navbar">

      {isLoggedIn &&
        <>
          <Link to="/" className="navbarLogo">
            <img className="marvelLogo" src="./images/MarvelAllianceLogo.PNG" alt="Marvel Alliance" />
          </Link>
          <ul className="">
            <li className="navItem">
              <Link to="/" className="navLink">
                Home
              </Link>
            </li>
            <li className="myDecksNav">
              <Link to="/myDecks" className="myDecksNavLink">
                My Decks
              </Link>
            </li>
          </ul>
          <Link to="/login">
            <Button variant="contained" color="error" aria-current="page" className="logOut"
              style={{ margin: "2em 0em 0em 75em" }} onClick={logout}>Logout</Button>
              <IconButton style={{ margin: "0em 0em 0em 44em", fontFamily: "Kaushan Script, cursive" }} aria-label="exittoappicon" color="error">
                <ExitToAppIcon />
              </IconButton>
          </Link>
        </>
      }

      {!isLoggedIn &&
        <>
            <Link className="signIn" to="/login">
              Login
            </Link>
        
            <Link className="register" to="/register">
              Register
            </Link>
        </>
      }
    </nav>
  );
};

export default Header;