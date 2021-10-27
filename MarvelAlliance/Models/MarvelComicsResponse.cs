﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarvelAlliance.Models
{
    // represents the shape of the JSON response returned from the API call:
    public class MarvelComicsResponse
    {
        public MarvelComicsData Data { get; set; }
    }
}