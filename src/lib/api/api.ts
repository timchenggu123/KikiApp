// import { cards, decks } from "../dummy";
import { SERVER_URL, checkResponse } from "./common";

export const asyncGetDecks = async () => {
  const response = await fetch(SERVER_URL + '/decks', {
    method: 'Get',
    credentials: 'include', // Include cookies for cross-origin requests
  });
  if (checkResponse(response)) {
    return response.json();
  }
  return undefined;
};

export const asyncGetDeckCards = async (did: Number) => {
    const response = await fetch(SERVER_URL + `/deck/${did}/cards`, {
        method: 'Get',
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
};

export const asyncGetStudy = async (did: Number) => {
    const response = await fetch(SERVER_URL + `/study/${did}/next`, {
        method: 'Get',
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
};

export const asyncPostStudyAnswer = async (cid: Number, rating: Number, time_started: Number) => {
    const response = await fetch(SERVER_URL + `/study/answer`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ cid, rating, time_started}),
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
}

export const asyncQueryCard = async (cid: Number) => {
    const response = await fetch(`/api/cards/${cid}`);
    if (checkResponse(response)) {
        return response.json();
    }
    return undefined;
}

export const asyncPostAddCardRaw = async (did: Number, front: String, back: String) => {
    const response = await fetch(SERVER_URL + `/deck/${did}/add/raw`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ front, back}),
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
}

export const asyncGetAddCardFromCard = async (did: Number, cid: Number) => {
  const response = await fetch(SERVER_URL + `/deck/${did}/add/from/${cid}`, {
      method: 'Get',
      credentials: 'include', // Include cookies for cross-origin requests
    });
    if (checkResponse(response)) {
      return response.json();
    }
    return undefined;
}

export const asyncRemoveCard = async (cid: Number) => {
    const response = await fetch(SERVER_URL + `/card/remove/${cid}`, {
        method: 'GeT',
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
}

export const asyncGetDeckConfig = async (did: Number) => {
    const response = await fetch(SERVER_URL + `/deck/config/${did}`, {
        method: 'Get',
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
}

export const asyncPostDeckConfig = async (did: Number, config: any) => {
    const response = await fetch(SERVER_URL + `/deck/config/${did}`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(config),
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
}

export const asyncRemoveDeck = async (did: Number) => {
    const response = await fetch(SERVER_URL + `/deck/remove/${did}`, {
        method: 'Get',
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
}

export const asyncPostAddDeck = async (name: String) => {
    const response = await fetch(SERVER_URL + `/deck/add`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ name }),
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
}

export const asyncPostUploadDeck = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(SERVER_URL + `/upload/deck`, {
        method: 'Post',
        body: formData,
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
}
