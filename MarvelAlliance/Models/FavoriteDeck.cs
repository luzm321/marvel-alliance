using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MarvelAlliance.Models
{
    public class FavoriteDeck
    {
        public int Id { get; set; }

        [Required]
        public int DeckId { get; set; }

        [Required]
        public int UserProfileId { get; set; }      
    }
}
