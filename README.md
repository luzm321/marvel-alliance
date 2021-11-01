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

> Users can perform CRUD operations on a deck and card along with playing a game against a simple AI (NPC) that attacks the opponent when it's their turn. Each defending character card's health points are decremented based on the attacking character's calculated power points. The player that has no cards left in their hand loses the game. 

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
