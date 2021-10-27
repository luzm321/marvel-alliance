//using MarvelAlliance.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net.Http;
//using System.Text.Json;
//using System.Threading.Tasks;

//namespace MarvelAlliance
//{
//    public class SuperHeroProcessor
//    {
//        // Sends a GET request for a SuperHeroSearchResponse (retrieve a hero):
//        public static async Task<SuperHeroSearchResponse> GetHero(string heroName)
//        {
//            //"x-rapidapi-key": "e12f972de0msh5f3353dde969f09p1be95bjsna98e93807839"
//            //"x-rapidapi-host": "superhero-search.p.rapidapi.com"
//            string url = $"https://superhero-search.p.rapidapi.com/api/?hero={heroName}";
//            // opens up a new request/call based on SuperHeroSearchAPIClient and waits for the response
//            // and enclosing using statement will self-close/dispose the request at the end to clean up code and port:

//            //SuperHeroSearchResponse hero = null;
//            //The GetAsync method sends the HTTP GET request. When the method completes, it returns an HttpResponseMessage
//            //that contains the HTTP response. If the status code in the response is a success code, the response body contains
//            //the JSON representation of a hero. Call ReadAsAsync to deserialize the JSON payload to a SuperHeroSearchResponse instance.
//            using (HttpResponseMessage response = await SuperHeroSearchAPIHelper.SuperHeroSearchAPIClient.GetAsync(url))
//            {
//                if (response.IsSuccessStatusCode)
//                {
//                    //hero = await response.Content.ReadAsAsync<SuperHeroSearchResponse>();
//                    var json = await response.Content.ReadAsStreamAsync();
//                    var heroData = await JsonSerializer.DeserializeAsync<SuperHeroSearchResponse>(json);

//                    //foreach (var result in heroData.Powerstats)
//                    //{
//                    //    Console.WriteLine(result.Strength, result.Speed, result.Power);
//                    //}

//                    return heroData;

//                    //SuperHeroSearchResponse hero = await response.Content.ReadAsStringAsync<SuperHeroSearchResponse>();
//                }
//                else
//                {
//                    throw new Exception(response.ReasonPhrase);
//                    //return hero;
//                }
//            }
//        }
//    }
//}
