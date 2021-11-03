using MarvelAlliance.Models;
using System.Collections.Generic;

namespace MarvelAlliance.Repositories
{
    public interface ICardRepository
    {
        List<Card> GetCardsByDeckId(int deckId);
        List<Card> SearchCards(string criterion, int deckId);
        Card GetCardById(int id);
        void AddCard(Card card);
        void DeleteCard(int id);
        void PatchCard(Card card);
    }
}
