using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MarvelAlliance.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Hmmm... You should really add a First Name...")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Hmmm... You should really add a Last Name...")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Hmmm... You should really add a username...")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Please provide an email address!")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        public DateTime DateCreated { get; set; }
    }
}




