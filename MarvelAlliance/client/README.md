<table align="center"><tr><td>
      <img src="https://github.com/luzm321/marvel-alliance/blob/main/MarvelAlliance/client/src/images/MarvelAllianceLogo.PNG" width="300px" height="300px" alt="Marvel Alliance" />
</td></tr></table>

# Marvel Alliance

Full-Stack React + Web API Back-End Capstone Application

## Setup: Follow these steps exactly:

1. Use terminal to clone this repository
1. `cd` into the directory it creates (MarvelAlliance)

```
git clone git@github.com:luzm321/marvel-alliance.git
cd MarvelAlliance/
```

1. Run `start MarvelAlliance.sln` to open the project solution in Visual Studio.
1. In the terminal, `cd` into the SQL directory and copy the Create Table SQL script (01_Db_Create.sql)
1. Then, go to the project in Visual Studio and run the Create Table SQL script as a new query.
1. Next, go to the database the Create Table script generates (MarvelAlliance) in the SQL Server Object Explorer and add it to a new query
1. Afterwards, copy the Seed Data SQL script (02_Seed_Data.sql) and run the sript in the MarvelAlliance database
1. Run the program in Visual Studio (on port localhost:5001). This concludes the back-end portion setup.
1. For the front-end setup, `cd` into the MarvelAlliance/ directory and then `cd` into the client/ directory.
1. In the client directory, run `npm install` and wait for all dependencies to be installed.
1. Run `npm start` to verify that installation was successful. (This will run the client/React app on port localhost:3000)

## Inspiration for creating Marvel Alliance:

I love the Marvel franchise and enjoy watching the movies and learning about the characters in the Marvel universe. I wanted to build a simple, yet fun and interactive card game app that I can play and share with friends that involves Marvel characters which is inspired by the Pokemon Trading Card Game.

## What is Marvel Alliance?

Marvel Alliance is a turn-based strategy card game that utilizes Marvel characters with generated power stats to simulate an engaging, fun, and interactive card game experience.

This application is built for my Back-End Capstone project for Nashville Software School.

> Users can perform CRUD operations on a deckand card along with playing a game against simple AI (NPC) that attacks the opponent when it's their turn. Each defending character card's health points are decremented based on the attacking character's calculated power points. The player that has no cards left in their hand loses the game.

## Tech Stack:

> Built with:

- ASP.NET Core Web API for server-side portion
- SQL Server for database management
- ReactJS for client portion
- Firebase Auth leveraged for authentication and authorization of users
- Marvel Comics API and SuperHero Search API: Third-party APIs implemented in app to retrieve Marvel character data and powerstats
- Styled with Bulma/Material UI frameworks and CSS3
- SweetAlert2 npm for alerts
- react-animations/radium npm

## SQL Scripts:

Create Table Script - [Create Table Script](https://github.com/luzm321/marvel-alliance/blob/main/SQL/01_Db_Create.sql)

Add Seed Data Script - [Add Seed Data Script](https://github.com/luzm321/marvel-alliance/blob/main/SQL/02_Seed_Data.sql)

## Capstone ERD (Entity Relationship Diagram):

Link: https://dbdiagram.io/d/615a02ba825b5b01461ea916

<table align="center"><tr><td>
      <img src="https://github.com/luzm321/marvel-alliance/blob/main/MarvelAlliance/client/src/images/MarvelAllianceERD.PNG" alt="ERD" />
</td></tr></table>

## Capstone Wireframe:

Link: https://miro.com/app/board/o9J_lrXNzcA=/

<table align="center"><tr><td>
      <img src="https://github.com/luzm321/marvel-alliance/blob/main/MarvelAlliance/client/src/images/MarvelAllianceWireframe.PNG" alt="Wireframe" />
</td></tr></table>

## Home Page View:

<!-- ![Home Page View](./images/homePage.PNG "Home Page View for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/homePage.PNG" alt="Home Page View" width="520px" height="500px" />
</td></tr></table>

## Image Gallery:

<!-- ![Image Gallery](./images/imageGallery.PNG "Image Gallery for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/imageGallery.PNG" alt="Image Gallery" width="520px" height="500px" />
</td></tr></table>

<!-- ![Image Gallery](./images/imageGaller2y.PNG "Image Gallery for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/imageGallery2.PNG" alt="Image Gallery" width="520px" height="500px" />
</td></tr></table>

## Home Page View:

<!-- ![My Decks Page](./images/myDecksPage.PNG "My Decks Page for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/myDecksPage.PNG" alt="My Decks Page" width="520px" height="500px" />
</td></tr></table>

## My Decks View:

<!-- ![My Decks View](./images/homePage.PNG "My Decks View for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/myDecks.PNG" alt="My Decks View" width="520px" height="500px" />
</td></tr></table>

## My Cards Page:

<!-- ![My Cards Page](./images/myCardsPage.PNG "My Cards Page for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/myCardsPage.PNG" alt="My Cards Page" width="520px" height="500px" />
</td></tr></table>

## Marvel Character Card:

<!-- ![Character Card](./images/characterCard.PNG "Character Card for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/characterCard.PNG" alt="Character Card" width="520px" height="500px" />
</td></tr></table>

## Character Card Stats:

<!-- ![Character Card Stats](./images/homePage.PNG "Character Card Stats for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/characterCardStats.PNG" alt="Character Card Stats" width="520px" height="500px" />
</td></tr></table>

## Public Decks Page:

<!-- ![Public Decks Page](./images/publicDecksPage.PNG "Public Decks Page for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/publicDecksPage.PNG" alt="Public Decks Page" width="520px" height="500px" />
</td></tr></table>

## Public Cards Page:

<!-- ![Public Cards Page](./images/publicCardsPage.PNG "Public Cards Page for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/publicCardsPage.PNG" alt="Public Cards Page" width="520px" height="500px" />
</td></tr></table>

## Public Character Card:

<!-- ![Public Character Card Page](./images/publicCharacterCard.PNG "Public Character Card for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/publicCharacterCard.PNG" alt="Public Character Card" width="520px" height="500px" />
</td></tr></table>

## Public Character Stats:

<!-- ![Public Character Stats](./images/publicCharacterStats.PNG "Public Character Stats for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/publicCharacterStats.PNG" alt="Public Character Stats" width="520px" height="500px" />
</td></tr></table>

## Favorite Decks Page:

<!-- ![Favorite Decks Page](./images/favoriteDecksPage.PNG "Favorite Decks Page for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/favoriteDecksPage.PNG" alt="Favorite Decks Page" width="520px" height="500px" />
</td></tr></table>

## Favorite Cards Page:

<!-- ![Favorite Cards Page](./images/favoriteCardsPage.PNG "Favorite Cards Page for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/favoriteCardsPage.PNG" alt="Favorite Cards Page" width="520px" height="500px" />
</td></tr></table>

## Battle Arena Page:

<!-- ![Battle Arena Page](./images/battleArenaPage.PNG "Battle Arena Page for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/battleArenaPage.PNG" alt="Battle Arena Page" width="520px" height="500px" />
</td></tr></table>

## Deck Selection Details Page:

<!-- ![Deck Selection Details Page](./images/deckSelectionDetailPage.PNG "Deck Selectin Detail Page for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/deckSelectionDetailPage.PNG" alt="Deck Selection Detail Page" width="520px" height="500px" />
</td></tr></table>

## Heads Or Tails Selection:

<!-- ![Heads or Tails Selection](./images/headsOrTailsSelection.PNG "Heads or Tails Selection for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/headsOrTailsSelection.PNG" alt="Heads or Tails Selection" width="520px" height="500px" />
</td></tr></table>

## Game View:

<!-- ![Game View](./images/gameViewPage.PNG "Game View for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/gameViewPage.PNG" alt="Game View Page" width="520px" height="500px" />
</td></tr></table>

## Victory View:

<!-- ![Victory View](./images/winningView.PNG "Victory View for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/winningView.PNG" alt="Victory View" width="520px" height="500px" />
</td></tr></table>

## Defeat View:

<!-- ![Defeat View](./images/loseView.PNG "Defeat View for Marvel Alliance") -->
<table><tr><td>
      <img src="./images/loseView.PNG" alt="Defeat View" width="520px" height="500px" />
</td></tr></table>
