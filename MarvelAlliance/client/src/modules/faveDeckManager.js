import { getToken } from "./authManager";

const faveDeckUrl = '/api/favoriteDeck';

export const getAllFaveDecks = () => {
    return getToken().then((token) => {
      return fetch(faveDeckUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("An unknown error occurred while trying to get all favorite decks.");
        }
      });
    });
};

export const getFaveDeckById = (id) => {
    return getToken().then((token) => {
      return fetch(`${faveDeckUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("An unknown error occurred while trying to get the favorite deck.");
        }
      });
    });
  };

  export const addFaveDeck = (faveDeck) => {
    return getToken().then((token) => {
    return fetch(faveDeckUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(faveDeck)
      }).then(res => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error("An unknown error occurred while trying to save a new favorite deck.");
        }
      });
    });
  };

  export const deleteFaveDeck = (id) => {
    return getToken().then((token) => {
      return fetch(`${faveDeckUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
    });
  };