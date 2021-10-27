using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarvelAlliance.Models
{
    public class RandomHeroAndVillainResponse
    {
        public string Name { get; set; }
        public RandomPowerStats Powerstats { get; set; }
        public RandomHeroAndVillainImages Images { get; set; }
        public Biography Biography { get; set; }
    }
}
