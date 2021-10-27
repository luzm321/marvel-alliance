import { getToken } from "./authManager";

const heroUrl = '/api/superHeroSearch';

export const getMarvelCharacterByName = (characterName, publicKey) => {
    return getToken().then((token) => {
      return fetch(`${heroUrl}/getHero/?heroName=${characterName}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json())
            .then((heroApiData) => {
                return fetch(`${heroUrl}/getHeroDescription/?heroName=${characterName}&publicKey=${publicKey}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res2 => res2.json())
                    .then((marvelApiData) => {
                        // bracket notation creates a new key "description" in the heroApiData where the result of marvelApiData will be its value.
                        // this way, what is sent/returned is only one object instead of an array of 2 objects from the chained API requests.
                        heroApiData["description"] = marvelApiData.data.results[0].description
                        console.log("heroApiData", heroApiData);
                        return heroApiData
                    });
            })      
    });
};