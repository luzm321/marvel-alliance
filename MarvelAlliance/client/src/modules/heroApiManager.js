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


// Builds NPC hand for battle session of game and combines both random heroes and villains arrays into 1 array:
export const createNPCHand = () => {
  //retrieving 20 random heroes
  return getRandomHeroes().then((randomMarvelHeroes) => {
    console.log("random heroes", randomMarvelHeroes);
    //retrieving 20 random villains
    return getRandomVillains().then((randomMarvelVillains) => {
      console.group("random villains", randomMarvelVillains);
      // Making a promise and adding all villains to the randomMarvelHeroes array (1 single array in promise) because need to add all 20 random villains
      // to the randomMarvelHeroes array
      let combineHeroesAndVillainsArrays = new Promise((resolve) => {
        // need to make a loop method that executes the iteration to ensure that all villains get added to the randomMarvelHeroes array
        // before resolving the loop:
        let loop = () => { 
          randomMarvelVillains.forEach((villain) => {
            randomMarvelHeroes.push(villain);
          });
        }
        resolve(loop());
      });
      
      // returning and resolving promise:
      return combineHeroesAndVillainsArrays.then(() => {
        // selecting 3 random ones from the array
        console.log('all characters array', randomMarvelHeroes);
        let allCharactersArray = randomMarvelHeroes;
        // pass all characters array into method that retrieves 3 chracters from that array:
        return getThreeCharacterSelectionsFromArray(allCharactersArray);
      })

    });
  });
};


// Method that retrieves 3 characters from the allCharactersArray
const getThreeCharacterSelectionsFromArray = (charactersArray) => {
  let indexOfCharacterSelected; // index will be used later to delete a character that has been selected from the array so it does
  //not get chosen again to ensure that there are no duplicate characters in NPC hand:
  // First Character
  // generates random number based on length of charactersArray and rounds it down to a whole number:
  let firstCharacterSelected = charactersArray[Math.floor(Math.random()*charactersArray.length)] 
  // finds index of character selected from the charactersArray
  indexOfCharacterSelected = findIndexOfCharacterInArray(charactersArray, firstCharacterSelected);
  // removes character from charactersArray so there's no duplicate on the next character selection:
  charactersArray = removeCharacterFromArray(indexOfCharacterSelected, charactersArray);
  // Second Character (repeats steps from code above)
  let secondCharacterSelected = charactersArray[Math.floor(Math.random()*charactersArray.length)]
  indexOfCharacterSelected = findIndexOfCharacterInArray(charactersArray, secondCharacterSelected);
  charactersArray = removeCharacterFromArray(indexOfCharacterSelected, charactersArray);
  // Third Character (don't need to remove 3rd selected character as method will only get 3 characters and there won't be a 4th selection
  //so don't need to account for a duplicate character being selected)
  let thirdCharacterSelected = charactersArray[Math.floor(Math.random()*charactersArray.length)]
  // indexOfCharacterSelected = findIndexOfCharacterInArray(charactersArray, thirdCharacterSelected);
  // charactersArray = removeCharacterFromArray(indexOfCharacterSelected, charactersArray);
  console.log("characters selected", firstCharacterSelected, secondCharacterSelected, thirdCharacterSelected);
  // returns all 3 characters with their health stat calculated based on other stats by calculateHealth method from StatCalculations component:
  return [calculateHealth(firstCharacterSelected), calculateHealth(secondCharacterSelected), calculateHealth(thirdCharacterSelected)];

};

// returns index of character selected from the charactersArray that contains the randomly generated heroes and villains:
const findIndexOfCharacterInArray = (charactersArray, characterSelection) => {
  let indexOfCharacter;
  // charactersArray.forEach((character) => {
  //   if (character === characterSelection) {
      indexOfCharacter = charactersArray.indexOf(characterSelection);
    // }
  // })
  return indexOfCharacter;
}

// removes a selected character from the charactersArray to ensure there are no duplicate characters chosen for the subsequent character
// selections up to the 3rd character selected:
const removeCharacterFromArray = (indexOfCharacter, charactersArray) => {
  // splice method takes out the character at specified index in charactersArray
  //(pass into splice method the index of starting item and ending item so it removes only that item from array)
  charactersArray.splice(indexOfCharacter, indexOfCharacter);
  return charactersArray;
}