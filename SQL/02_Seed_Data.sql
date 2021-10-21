USE [MarvelAlliance];
GO

set identity_insert [UserProfile] on
insert into [UserProfile] (Id, FirstName, LastName, UserName, Email, FirebaseUserId, DateCreated) values (1, 'Luz', 'Madrazo', 'luzm321', 'luz@marvelalliance.com', 'rsuPE7RNrCZ02vcZl2zWs3lrNZP2', '2021-10-19');
insert into [UserProfile] (Id, FirstName, LastName, UserName, Email, FirebaseUserId, DateCreated) values (2, 'Stephen', 'Strange', 'Dr.Strange', 'strange@marvelalliance.com', 'bf8rZQB6e0TDnqalVyEhqwcNwIE2', '2021-10-20');
set identity_insert [UserProfile] off

set identity_insert [Deck] on
insert into [Deck] ([Id], [UserProfileId], [Title], [Details])
values (1, 1, 'Avengers', 'My Top 3 Avenger Members.'), (2, 2, 'Villains', 'My Top 3 Marvel Villains.'), (3, 1, 'Tech Deck', 'My Top 3 Tech Characters.');
set identity_insert [Deck] off

set identity_insert [Card] on
insert into [Card] ([Id], [DeckId], [CharacterName], [Health], [Power], [Speed], [Strength], [Image], [Description])
values (1, 1, 'Dr. Strange', 200, 100, 12, 10, 'https://quizizz.com/media/resource/gs/quizizz-media/questions/61a05dbf-b3f1-4929-9f6b-9aa4db6b9d16?w=90&h=90', 'Doctor Stephen Strange is a talented neurosurgeon who, after a tragic car accident, must put ego aside and learn the secrets of a hidden world of mysticism and alternate dimensions.'), 
(2, 2, 'Loki', 200, 100, 46, 63, 'https://www.denofgeek.com/wp-content/uploads/2018/11/loki_9.jpg?fit=1200%2C834', 'Loki, Prince of Asgard, Odinson, rightful heir of Jotunheim, and God of Mischief, is burdened with glorious purpose. His desire to be a king drives him to sow chaos in Asgard. In his lust for power, he extends his reach to Earth.'), 
(3, 3, 'Vision', 200, 100, 54, 72, 'https://c4.wallpaperflare.com/wallpaper/517/1022/343/avengers-age-of-ultron-the-avengers-paul-bettany-the-vision-wallpaper-preview.jpg', 'The metal monstrosity called Ultron created the synthetic humanoid known as the Vision from the remains of the original android Human Torch of the 1940s to serve as a vehicle of vengeance against the Avengers.'),
(4, 1, 'Scarlet Witch', 200, 100, 29, 10, 'https://www.looper.com/img/gallery/the-untold-truth-of-the-scarlet-witch/l-intro-1610729387.jpg', 'Wanda Maximoff aka the Scarlet Witch is a Romani Transian Sorceress with reality-altering powers and the younger twin sister of the speedster Quicksilver. She and her brother were once believed to have been Mutant children of Magneto');
set identity_insert [Card] off

set identity_insert [FavoriteDeck] on
insert into [FavoriteDeck] ([Id], [DeckId], [UserProfileId])
values (1, 1, 1);
set identity_insert [FavoriteDeck] off

set identity_insert [Game] on
insert into [Game] ([Id], [UserProfileId], [DeckId], [IsWon], [CompletionDate])
values (1, 1, 1, 'true', 2021-10-20);
set identity_insert [Game] off