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

export const asyncGetDeckNotes = async (did: Number, query: string, offset= 0) => {
    const response = await fetch(SERVER_URL + `/deck/${did}/notes/${query}/${offset}`, {
        method: 'Get',
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
};

export const asyncGetNote = async (nid: Number) => {
    const response = await fetch(SERVER_URL + `/notes/${nid}`, {
        method: 'Get',
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
};

export const asyncGetCardNote = async (cid: Number) => {
    const response = await fetch(SERVER_URL + `/cards/${cid}/note`, {
        method: 'Get',
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
}

export const asyncEditNote = async (nid: Number, fields: string[]) => {
    const response = await fetch(SERVER_URL + `/note/update/${nid}`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(fields),
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response;
      }
      return undefined;
}

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

export const asyncPostAddCardDict = async (did: Number, fields:any) => {
  const response = await fetch(SERVER_URL + `/deck/${did}/add/dict`, {
      method: 'Post',
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(fields),
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
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({cid}),
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
}

export const asyncSuspendCard = async (cid: Number) => {
    const response = await fetch(SERVER_URL + `/card/suspend`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({cid}),
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
}

export const asyncBatchRemoveNotes = async (nids: Number[]) => {
    const response = await fetch(SERVER_URL + `/note/batchremove`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({nids}),
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


export const asyncGetDeckStats = async (did: Number) => {
    const response = await fetch(SERVER_URL + `/deck/${did}/stats`, {
        method: 'Get',
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
}

export const asyncLogout = async () => {
    const response = await fetch(SERVER_URL + `/auth/logout`, {
        method: 'Get',
        credentials: 'include', // Include cookies for cross-origin requests
      });
      if (checkResponse(response)) {
        return response.json();
      }
      return undefined;
}
