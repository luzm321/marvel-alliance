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

export const addDeck = (deck) => {
  return getToken().then((token) => {
  return fetch(deckUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deck)
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error("An unknown error occurred while trying to save a new deck.");
      }
    });
  });
};

export const updateDeck = (deck) => {
  return getToken().then((token) => {
  return fetch(deckUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deck)
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error("An unknown error occurred while trying to update an existing deck.");
      }
    });
  });
};

