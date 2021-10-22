using MarvelAlliance.Models;
using System.Collections.Generic;

namespace MarvelAlliance.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}

