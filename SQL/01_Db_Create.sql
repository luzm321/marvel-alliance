USE [master]

IF db_id('MarvelAlliance') IS NULL
  CREATE DATABASE [MarvelAlliance]
GO

USE [MarvelAlliance]
GO

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Deck];
DROP TABLE IF EXISTS [Card];
DROP TABLE IF EXISTS [FavoriteDeck];
DROP TABLE IF EXISTS [Game];
GO


CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [UserName] nvarchar(255) UNIQUE NOT NULL,
  [Email] nvarchar(555) UNIQUE NOT NULL,
  [FirebaseUserId] nvarchar(28) NOT NULL,
  [DateCreated] DateTime NOT NULL,

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [Deck] (
  [Id] integer PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [UserProfileId] integer NOT NULL,
  [Title] nvarchar(255) NOT NULL,
  [Details] nvarchar(255) NOT NULL,

  CONSTRAINT [FK_Deck_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)
GO

CREATE TABLE [Card] (
  [Id] integer PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [DeckId] integer NOT NULL,
  [CharacterName] nvarchar(255) NOT NULL,
  [Health] int NOT NULL,
  [Power] int NOT NULL,
  [Speed] int NOT NULL,
  [Strength] int,
  [Image] nvarchar(255) NOT NULL,
  [Description] nvarchar(255) NOT NULL,

  CONSTRAINT [FK_Card_Deck] FOREIGN KEY ([DeckId]) REFERENCES [Deck] ([Id]) ON DELETE CASCADE
)
GO

CREATE TABLE [FavoriteDeck] (
  [Id] integer PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [DeckId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,

  CONSTRAINT [FK_FavoriteDeck_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_FavoriteDeck_Deck] FOREIGN KEY ([DeckId]) REFERENCES [Deck] ([Id]) ON DELETE CASCADE

)
GO

CREATE TABLE [Game] (
  [Id] integer PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [UserProfileId] integer NOT NULL,
  [DeckId] integer NOT NULL,
  [IsWon] nvarchar(255) NOT NULL,
  [CompletionDate] DateTime NOT NULL,

  CONSTRAINT [FK_Game_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Game_Deck] FOREIGN KEY ([DeckId]) REFERENCES [Deck] ([Id])
)
GO