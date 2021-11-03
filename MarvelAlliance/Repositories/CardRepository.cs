using Microsoft.Extensions.Configuration;
using MarvelAlliance.Models;
using MarvelAlliance.Utils;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;

namespace MarvelAlliance.Repositories
{
    public class CardRepository : BaseRepository, ICardRepository
    {
        public CardRepository(IConfiguration configuration) : base(configuration) { }

        // Retrieve list of cards associated with a deck:
        public List<Card> GetCardsByDeckId(int deckId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, DeckId, CharacterName, Health, Power, Speed, Strength, Image, Description
                                        FROM Card
                                        WHERE @id = DeckId
                                        ORDER BY CharacterName";

                    DbUtils.AddParameter(cmd, "@id", deckId);

                    var reader = cmd.ExecuteReader();

                    var cards = new List<Card>();
                    while (reader.Read())
                    {
                        cards.Add(NewCardFromReader(reader));
                    }

                    reader.Close();

                    return cards;
                }
            }
        }

        // Query string example: Method to search cards in app by CharacterName:
        public List<Card> SearchCards(string criterion, int deckId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, DeckId, CharacterName, Health, Power, Speed, Strength, Image, Description
                                        FROM Card
                                        WHERE DeckId = @Id 
                                        AND CharacterName LIKE @Criterion";

                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
                    DbUtils.AddParameter(cmd, "@Id", deckId);

                    var cards = new List<Card>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        cards.Add(NewCardFromReader(reader));
                    }

                    reader.Close();

                    return cards;

                }
            }
        }

        // Retrieve a Card by Id:
        public Card GetCardById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, DeckId, CharacterName, Health, Power,
                                               Speed, Strength, Image, Description
                                        FROM Card
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Card card = null;

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            card = NewCardFromReader(reader);
                        }
                    }
                    return card;
                }
            }
        }

        // Add New Card:
        public void AddCard(Card card)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Card (DeckId, CharacterName, Health, Power, Speed, Strength, Image, Description)
                        OUTPUT INSERTED.ID
                        VALUES (@deckId, @characterName, @health, @power, @speed, @strength, @image, @description)";

                    DbUtils.AddParameter(cmd, "@deckId", card.DeckId);
                    DbUtils.AddParameter(cmd, "@characterName", card.CharacterName);
                    DbUtils.AddParameter(cmd, "@health", card.Health);
                    DbUtils.AddParameter(cmd, "@power", card.Power);
                    DbUtils.AddParameter(cmd, "@speed", card.Speed);
                    DbUtils.AddParameter(cmd, "@strength", card.Strength);
                    DbUtils.AddParameter(cmd, "@image", card.Image);
                    DbUtils.AddParameter(cmd, "@description", card.Description);

                    card.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        // Delete Existing Card:
        public void DeleteCard(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Card
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // Patch Description Property of Existing Card:
        public void PatchCard(Card card)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Card
                                        SET Description = @description
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@description", card.Description);
                    DbUtils.AddParameter(cmd, "@id", card.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // Private, abstracted helper method to retrieve new Card from SqlDataReader
        private Card NewCardFromReader(SqlDataReader reader)
        {
            return new Card()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                DeckId = DbUtils.GetInt(reader, "DeckId"),
                CharacterName = DbUtils.GetString(reader, "CharacterName"),
                Health = DbUtils.GetInt(reader, "Health"),
                Power = DbUtils.GetInt(reader, "Power"),
                Speed = DbUtils.GetInt(reader, "Speed"),
                Strength = DbUtils.GetInt(reader, "Strength"),
                Image = DbUtils.GetString(reader, "Image"),
                Description = DbUtils.GetString(reader, "Description"),
            };
        }
    }
}
