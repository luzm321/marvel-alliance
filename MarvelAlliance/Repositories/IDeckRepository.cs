using MarvelAlliance.Models;
using System.Collections.Generic;

namespace MarvelAlliance.Repositories
{
    public interface IDeckRepository
    {
        List<Deck> GetAll();
        List<Deck> GetDecksByCurrentUser(int currentUserId);
        void AddDeck(Deck deck);

    }
}
