using MarvelAlliance.Models;
using System.Collections.Generic;

namespace MarvelAlliance.Repositories
{
    public interface IFavoriteDeckRepository
    {
        List<FavoriteDeck> GetAllFaveDecksByUser(int userProfileId);
        FavoriteDeck GetFaveDeckById(int id);
        void AddFaveDeck(FavoriteDeck favoriteDeck);
        void DeleteFaveDeck(int id);
    }
}
