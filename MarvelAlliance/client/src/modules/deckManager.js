import { getToken } from "./authManager";

const deckUrl = '/api/deck';

export const getAllDecks = () => {
    return getToken().then((token) => {
      return fetch(deckUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("An unknown error occurred while trying to get all decks.");
        }
      });
    });
};

export const getCurrentUserDecks = () => {
    return getToken().then((token) => {
      return fetch(`${deckUrl}/myDecks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("An unknown error occurred while trying to get user's decks.");
        }
      });
    });
};