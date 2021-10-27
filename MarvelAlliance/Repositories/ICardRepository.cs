using MarvelAlliance.Models;
using System.Collections.Generic;

namespace MarvelAlliance.Repositories
{
    public interface ICardRepository
    {
        List<Card> GetCardsByDeckId(int deckId);
        void AddCard(Card card);
    }
}
