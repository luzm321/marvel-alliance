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
