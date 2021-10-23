import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import UserDeckList from "./UserDeck/UserDeckList";
import PublicDeckList from "./PublicDeck/PublicDeckList";

export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route path="/myDecks" exact>
          {isLoggedIn ? <UserDeckList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/publicDecks" exact>
          {isLoggedIn ? <PublicDeckList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login/>
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
}