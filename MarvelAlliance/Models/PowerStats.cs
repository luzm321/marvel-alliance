using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarvelAlliance.Models
{
    // represents the shape of the JSON response returned from the API call:
    public class PowerStats
    {
        //public int intelligence { get; set; }
        public int Strength { get; set; }
        public int Speed { get; set; }
        //public int durability { get; set; }
        public int Power { get; set; }
        //public int combat { get; set; }
    }
}


