using Microsoft.Extensions.Configuration;
using MarvelAlliance.Models;
using MarvelAlliance.Utils;

namespace MarvelAlliance.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirstName, LastName, UserName, Email, FirebaseUserId, DateCreated
                        FROM UserProfile
                        WHERE FirebaseUserId = @firebaseuserId";

                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UserProfile (FirstName, LastName, UserName, Email, FirebaseUserId, DateCreated)
                        OUTPUT INSERTED.ID
                        VALUES (@firstName, @lastName, @userName, @email, @firebaseUserId, @dateCreated)";

                    DbUtils.AddParameter(cmd, "@firstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@lastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@userName", userProfile.UserName);
                    DbUtils.AddParameter(cmd, "@email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@firebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@dateCreated", userProfile.DateCreated);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
