using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarvelAlliance.Models
{
    public class SuperHeroSearchResponse
    {
        public string Name { get; set; }
        public List<PowerStats> Powerstats { get; set; }
        public List<Images> Images { get; set; }
    }
}
