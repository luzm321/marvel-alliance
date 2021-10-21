using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MarvelAlliance.Models
{
    public class Deck
    {
        public int Id { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        [Required(ErrorMessage = "Please provide a Title!")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Please provide Details!")]
        public string Details { get; set; }
    }
}





