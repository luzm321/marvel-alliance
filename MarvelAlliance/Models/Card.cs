using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace MarvelAlliance.Models
{
    public class Card
    {
        public int Id { get; set; }

        [Required]
        public int DeckId { get; set; }

        [Required(ErrorMessage = "Hmmm... You should really add a Character Name...")]
        [DisplayName("Character Name")]
        public string CharacterName { get; set; }

        [Required]
        public int Health { get; set; }

        [Required]
        public int Power { get; set; }

        [Required]
        public int Speed { get; set; }

        [Required]
        public int Strength { get; set; }

        [Required]
        public string Image { get; set; }

        [Required]
        public string Description { get; set; }
    }
}