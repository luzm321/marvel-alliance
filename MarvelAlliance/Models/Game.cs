using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MarvelAlliance.Models
{
    public class Game
    {
        public int Id { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        [Required]
        public int DeckId { get; set; }

        [Required]
        public string IsWon { get; set; }

        public DateTime CompletionDate { get; set; }
    }
}
