import { getToken } from "./authManager";

const cardUrl = '/api/card';

export const getCardsByDeckId = (deckId) => {
    return getToken().then((token) => {
      return fetch(`${cardUrl}/${deckId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("An unknown error occurred while trying to get all cards from deck.");
        }
      });
    });
  };

  export const addCard = (card) => {
    return getToken().then((token) => {
    return fetch(cardUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card)
      }).then(res => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error("An unknown error occurred while trying to save a new card.");
        }
      });
    });
  };