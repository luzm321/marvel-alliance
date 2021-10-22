﻿using Microsoft.Extensions.Configuration;
using MarvelAlliance.Models;
using MarvelAlliance.Utils;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;

namespace MarvelAlliance.Repositories
{
    public class DeckRepository : BaseRepository, IDeckRepository
    {
        public DeckRepository(IConfiguration configuration) : base(configuration) { }

        // Get List of All Decks:
        public List<Deck> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, UserProfileId, Title, Details
                                        FROM Deck;";

                    var reader = cmd.ExecuteReader();

                    var decks = new List<Deck>();
                    while (reader.Read())
                    {
                        decks.Add(NewDeckFromReader(reader));
                    }

                    reader.Close();

                    return decks;
                }
            }
        }

        // Retrieve list of user's decks based on userProfileId:
        public List<Deck> GetDecksByCurrentUser(int currentUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, UserProfileId, Title, Details
                                        FROM Deck
                                        WHERE @id = UserProfileId
                                        ORDER BY Title";

                    DbUtils.AddParameter(cmd, "@id", currentUserId);

                    var reader = cmd.ExecuteReader();

                    var userDecks = new List<Deck>();
                    while (reader.Read())
                    {
                        userDecks.Add(NewDeckFromReader(reader));
                    }

                    reader.Close();

                    return userDecks;
                }
            }
        }

        // Private, abstracted helper method to retrieve new Deck from SqlDataReader
        private Deck NewDeckFromReader(SqlDataReader reader)
        {
            return new Deck()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                Title = DbUtils.GetString(reader, "Title"),
                Details = DbUtils.GetString(reader, "Details"),
            };
        }

    }
}