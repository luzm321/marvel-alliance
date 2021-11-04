using Microsoft.Extensions.Configuration;
using MarvelAlliance.Models;
using MarvelAlliance.Utils;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;

namespace MarvelAlliance.Repositories
{
    public class FavoriteDeckRepository : BaseRepository, IFavoriteDeckRepository
    {
        public FavoriteDeckRepository(IConfiguration configuration) : base(configuration) { }

        // Retrieve List of All Favorite Decks:
        public List<FavoriteDeck> GetAllFaveDecksByUser(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT fd.Id [fdId], fd.DeckId, fd.UserProfileId, 
                                               d.Id [dId], d.Title, d.Details
                                        FROM FavoriteDeck fd
                                        INNER JOIN Deck d 
                                        ON fd.DeckId =  d.Id 
                                        WHERE @Id = fd.UserProfileId
                                        ORDER BY d.Title";

                    DbUtils.AddParameter(cmd, "@Id", userProfileId);

                    var reader = cmd.ExecuteReader();

                    var faveDecks = new List<FavoriteDeck>();
                    while (reader.Read())
                    {
                        faveDecks.Add(NewFaveDeckFromReader(reader));
                    }

                    reader.Close();

                    return faveDecks;
                }
            }
        }

        // Retrieve a FavoriteDeck by Id:
        public FavoriteDeck GetFaveDeckById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT fd.Id [fdId], fd.DeckId, fd.UserProfileId, 
                                                d.Id [dId], d.Title, d.Details
                                        FROM FavoriteDeck fd
                                        INNER JOIN Deck d
                                        ON fd.DeckId = d.Id
                                        WHERE fd.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    FavoriteDeck faveDeck = null;

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            faveDeck = NewFaveDeckFromReader(reader);
                        }
                    }
                    return faveDeck;
                }
            }
        }

        // Add New FavoriteDeck:
        public void AddFaveDeck(FavoriteDeck favoriteDeck)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO FavoriteDeck (UserProfileId, DeckId)
                        OUTPUT INSERTED.ID
                        VALUES (@userProfileId, @deckId)";

                    DbUtils.AddParameter(cmd, "@userProfileId", favoriteDeck.UserProfileId);
                    DbUtils.AddParameter(cmd, "@deckId", favoriteDeck.DeckId);

                    favoriteDeck.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        // Delete Existing FavoriteDeck:
        public void DeleteFaveDeck(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM FavoriteDeck
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // Private, abstracted helper method to retrieve new FavoriteDeck from SqlDataReader
        private FavoriteDeck NewFaveDeckFromReader(SqlDataReader reader)
        {
            return new FavoriteDeck()
            {
                Id = DbUtils.GetInt(reader, "fdId"),
                DeckId = DbUtils.GetInt(reader, "DeckId"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                Deck = new Deck()
                {
                    Title = DbUtils.GetString(reader, "Title"),
                    Details = DbUtils.GetString(reader, "Details"),
                }
            };
        }
    }
}
