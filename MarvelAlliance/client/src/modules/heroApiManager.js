import { getToken } from "./authManager";
import { calculateHealth } from "./../components/BattleArena/StatCalculations.js";

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

export const getRandomHeroes = () => {
  return getToken().then((token) => {
    return fetch(`${heroUrl}/getRandomHeroes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("An unknown error occurred while trying to get all 20 random heroes.");
      }
    });
  });
};

export const getRandomVillains = () => {
  return getToken().then((token) => {
    return fetch(`${heroUrl}/getRandomVillains`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("An unknown error occurred while trying to get all 20 random villains.");
      }
    });
  });
};

export const createNPCHand = () => {
  return getRandomHeroes().then((randomMarvelHeroes) => {
    console.log("random heroes", randomMarvelHeroes);
    return getRandomVillains().then((randomMarvelVillains) => {
      console.group("random villains", randomMarvelVillains);
      // Adding all heroes and villains to 1 single array
      let combineHeroesAndVillainsArrays = new Promise((resolve) => {
        let loop = () => { 
          randomMarvelVillains.forEach((villain) => {
            randomMarvelHeroes.push(villain);
          });
        }
        resolve(loop());
      });
      
      return combineHeroesAndVillainsArrays.then(() => {
        // selecting 3 random ones from the array
        console.log('all characters array', randomMarvelHeroes);
        let allCharactersArray = randomMarvelHeroes;
        return getThreeCharacterSelectionsFromArray(allCharactersArray);
      })

    });
  });
};

const getThreeCharacterSelectionsFromArray = (charactersArray) => {
  let indexOfCharacterSelected;
  // First Character
  let firstCharacterSelected = charactersArray[Math.floor(Math.random()*charactersArray.length)]
  indexOfCharacterSelected = findIndexOfCharacterInArray(charactersArray, firstCharacterSelected);
  charactersArray = removeCharacterFromArray(indexOfCharacterSelected, charactersArray);
  // Second Character
  let secondCharacterSelected = charactersArray[Math.floor(Math.random()*charactersArray.length)]
  indexOfCharacterSelected = findIndexOfCharacterInArray(charactersArray, secondCharacterSelected);
  charactersArray = removeCharacterFromArray(indexOfCharacterSelected, charactersArray);
  // Third Character
  let thirdCharacterSelected = charactersArray[Math.floor(Math.random()*charactersArray.length)]
  // indexOfCharacterSelected = findIndexOfCharacterInArray(charactersArray, thirdCharacterSelected);
  // charactersArray = removeCharacterFromArray(indexOfCharacterSelected, charactersArray);
  console.log("characters selected", firstCharacterSelected, secondCharacterSelected, thirdCharacterSelected);
  return [calculateHealth(firstCharacterSelected), calculateHealth(secondCharacterSelected), calculateHealth(thirdCharacterSelected)];

};

const findIndexOfCharacterInArray = (charactersArray, characterSelection) => {
  let indexOfCharacter;
  charactersArray.forEach((character) => {
    if (character === characterSelection) {
      indexOfCharacter = charactersArray.indexOf(character);
    }
  })
  return indexOfCharacter;
}

const removeCharacterFromArray = (indexOfCharacter, charactersArray) => {
  charactersArray.splice(indexOfCharacter, indexOfCharacter);
  return charactersArray;
}