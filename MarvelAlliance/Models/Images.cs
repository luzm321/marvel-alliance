using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarvelAlliance.Models
{
    // represents the shape of the JSON response returned from the API call:
    public class Images
    {
        public string Xs { get; set; }
        public string Sm { get; set; }
        public string Md { get; set; }
        public string Lg { get; set; }
    }
}
