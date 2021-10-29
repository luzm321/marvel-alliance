import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Home/Home";
import UserDeckList from "./UserDeck/UserDeckList";
import PublicDeckList from "./PublicDeck/PublicDeckList";
import UserDeckCardList from "./UserCard/UserDeckCardList";
import PublicDeckCardList from "./PublicCard/PublicDeckCardList";
import DeckForm from "./UserDeck/DeckForm";
import UserDeckCardForm from "./UserCard/UserDeckCardForm";
import BattleArena from "./BattleArena/BattleArena";

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

        <Route path="/myDecks/create" exact>
          {isLoggedIn ? <DeckForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/myDecks/edit/:deckId(\d+)" exact>
          {isLoggedIn ? <DeckForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/myDecks/:deckId(\d+)/cards" exact>
          {isLoggedIn ? <UserDeckCardList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/myDecks/:deckId(\d+)/cards/create" exact>
          {isLoggedIn ? <UserDeckCardForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/publicDecks" exact>
          {isLoggedIn ? <PublicDeckList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/publicDecks/:deckId(\d+)/cards" exact>
          {isLoggedIn ? <PublicDeckCardList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/battleArena" exact>
          {isLoggedIn ? <BattleArena /> : <Redirect to="/login" />}
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