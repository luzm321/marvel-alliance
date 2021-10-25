import { getToken } from "./authManager";

const cardUrl = '/api/card';

export const getCardsDeckById = (deckId) => {
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