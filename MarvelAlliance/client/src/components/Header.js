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
    <>
      <nav className="navbar navBarContainer" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          {isLoggedIn &&
            <div>
                <div className="navbar-start">
                    <div className="">
                      <Link to="/" className="">
                        <img className="marvel-logo" src="./images/MarvelAllianceLogo.PNG" alt="Marvel Alliance" />
                      </Link>
                    </div>

                    <div className="navbar-item navItem">
                      <Link to="/" className="navLink">
                        Home
                      </Link>
                    </div>

                    <div className="navbar-item myDecksNav">
                      <Link to="/myDecks" className="myDecksNavLink">
                        My Decks
                      </Link>
                    </div>

                    <div className="navbar-item publicDecksNav">
                      <Link to="/publicDecks" className="publicDecksNavLink">
                        Public Decks
                      </Link>
                    </div>
                </div>
            </div>
          }

          {isLoggedIn &&
            <div className="navbar-end">
              <div className="navbar-item">
              <Link to="/login">
                      <Button variant="contained" color="error" aria-current="page" className="logOut"
                        style={{ margin: "0em 0em 0em 58em", fontFamily: "Kaushan Script, cursive" }} onClick={logout}>Logout</Button>
                        <IconButton style={{ fontFamily: "Kaushan Script, cursive" }} aria-label="exittoappicon" color="error">
                          <ExitToAppIcon />
                        </IconButton>
                    </Link>
              </div>
            </div>
          }
        </div>
      </nav>

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

    </>
  );
};

export default Header;