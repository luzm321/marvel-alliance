using MarvelAlliance.Models;
using System.Collections.Generic;

namespace MarvelAlliance.Repositories
{
    public interface IDeckRepository
    {
        List<Deck> GetAll();
        List<Deck> GetDecksByCurrentUser(int currentUserId);
        List<Deck> SearchDecks(string criterion, int userProfileId);
        Deck GetDeckById(int id);
        void AddDeck(Deck deck);
        void UpdateDeck(Deck deck);
        void DeleteDeck(int id);
    }
}
