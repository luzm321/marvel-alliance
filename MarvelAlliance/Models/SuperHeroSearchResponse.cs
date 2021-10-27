using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarvelAlliance.Models
{
    // represents the shape of the JSON response returned from the API call:
    public class SuperHeroSearchResponse
    {
        public string Name { get; set; }
        public PowerStats Powerstats { get; set; }
        public Images Images { get; set; }
    }
}
