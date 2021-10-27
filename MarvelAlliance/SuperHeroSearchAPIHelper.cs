using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace MarvelAlliance
{
    public static class SuperHeroSearchAPIHelper
    {
        //public static HttpClient SuperHeroSearchAPIClient { get; set; }

        public static HttpClient InitializeClient(bool checker)
        {
            //var uri = "https://superhero-search.p.rapidapi.com/api/?hero=scarlet witch";
            HttpClient client = new HttpClient();
            // relative uri/port for http requests empty because will be using 2 different APIs and HttpClient should only
            // be instantantiated once and reused throughout the application lifecycle and can help prevent
            // SocketException errors:
            //client.BaseAddress = new Uri("");
            //SuperHeroSearchAPIClient.BaseAddress = new Uri("");
            client.DefaultRequestHeaders.Clear();
            if (checker)
            {
                client.DefaultRequestHeaders.Add("x-rapidapi-host", "superhero-search.p.rapidapi.com");
                client.DefaultRequestHeaders.Add("x-rapidapi-key", "e12f972de0msh5f3353dde969f09p1be95bjsna98e93807839");
            } else
            {
                client.DefaultRequestHeaders.Add("Referer", "https://developer.marvel.com/");
            }
            // Set request header to accept JSON format
            client.DefaultRequestHeaders
                .Accept
                .Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            return client;
        }

    }
}
