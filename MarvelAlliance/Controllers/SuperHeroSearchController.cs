using MarvelAlliance.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace MarvelAlliance.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SuperHeroSearchController : ControllerBase
    {
        // Retrieving hero from SuperHeroSearch API
        // https://localhost:5001/api/superHeroSearch/getHero
        [HttpGet("getHero")]
        public async Task<SuperHeroSearchResponse> GetHero(string heroName)
        {
            SuperHeroSearchResponse characterData = null;

            string heroApiurl = $"https://superhero-search.p.rapidapi.com/api/?hero={heroName}";

            //The GetAsync method sends the HTTP GET request. When the method completes, it returns an HttpResponseMessage
            //that contains the HTTP response. If the status code in the response is a success code, the response body contains
            //the JSON representation of a hero. Call ReadAsAsync to deserialize the JSON payload to a SuperHeroSearchResponse instance.
            //opens up a new request/call based on SuperHeroSearchAPIClient and waits for the response
            //and enclosing using statement will self-close/dispose the request at the end to clean up code and port:
            using HttpResponseMessage response = await SuperHeroSearchAPIHelper.InitializeClient(true).GetAsync(heroApiurl);
                if (response.IsSuccessStatusCode)
                {
                var jsonstring = await response.Content.ReadAsStringAsync();
                characterData = JsonConvert.DeserializeObject<SuperHeroSearchResponse>(jsonstring);
                Console.WriteLine(characterData);
                return characterData;       
                }
                else
                {
                    throw new Exception(response.ReasonPhrase);
                }
        }

        // Retrieving hero from Marvel Comics API
        // https://localhost:5001/api/superHeroSearch/getHeroDescription
        [HttpGet("getHeroDescription")]
        public async Task<MarvelComicsResponse> GetHeroDescription(string heroName, string publicKey)
        {
            MarvelComicsResponse marvelApiCharacterData = null;
            DateTime currentDate;
            currentDate = DateTime.Now;
            string timeStamp = currentDate.ToString("yyyyMMddHHmmssfff");
            var hash = System.HashCode.Combine<string, string, string>(timeStamp, publicKey, "adbf4771abaedb731f7057c28146782337b6b1b1");

            string marvelApiurl = $"https://gateway.marvel.com/v1/public/characters?nameStartsWith={heroName}&apikey={publicKey}&hash={hash}";

            HttpResponseMessage marvelApiResponse = await SuperHeroSearchAPIHelper.InitializeClient(false).GetAsync(marvelApiurl);
            if (marvelApiResponse.IsSuccessStatusCode)
            {

                var jsonstring2 = await marvelApiResponse.Content.ReadAsStringAsync();
                marvelApiCharacterData = JsonConvert.DeserializeObject<MarvelComicsResponse>(jsonstring2);
                return marvelApiCharacterData;
            }
            else
            {
                throw new Exception(marvelApiResponse.ReasonPhrase);
            }
        }

        [HttpGet("getRandomHeroes")]
        public async Task<SuperHeroSearchResponse> GetRandomHeroes()
        {
            SuperHeroSearchResponse characterData = null;

            string heroApiurl = $"https://superhero-search.p.rapidapi.com/api/heroes";
            
            using HttpResponseMessage response = await SuperHeroSearchAPIHelper.InitializeClient(true).GetAsync(heroApiurl);
            if (response.IsSuccessStatusCode)
            {
                var jsonstring = await response.Content.ReadAsStringAsync();
                characterData = JsonConvert.DeserializeObject<SuperHeroSearchResponse>(jsonstring);
                Console.WriteLine(characterData);
                return characterData;
            }
            else
            {
                throw new Exception(response.ReasonPhrase);
            }
        }
    }
}
