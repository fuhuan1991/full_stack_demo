import fetch from 'unfetch';

// check the status of all sort of response
const checkStatus = response => {
  if (response.ok) {
    return response;
  } else {
      let error = new Error(response.statusText);
      error.response = response;
      response.json().then(e => {
        error.error = e;
      });
      return Promise.reject(error);
    }
}

// login
export const login = user => {
  const {name, password} = user;
  const url = `/api/users/login?name=${name}&password=${password}`;
  return fetch(url, {
    method: 'GET',
  }).then(checkStatus);
}

// add a new user
export const signup = user => fetch('api/users', {
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + getJWTFromCookie(),
  },
  method: 'POST',
  body: JSON.stringify(user),
}).then(checkStatus);

// get all the notes of a user
export const getUserNotes = userId => fetch(`api/notes/getUserNotes/${userId}`, {
  method: 'GET'
}).then(checkStatus);

// get all the events of a user
export const getUserEvents = userId => fetch(`api/events/getUserEvents/${userId}`, {
  method: 'GET'
}).then(checkStatus);

//update a exsiting note
export const updateNote = note => fetch('api/notes', {
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + getJWTFromCookie(),
  },
  method: 'PUT',
  body: JSON.stringify(note),
}).then(checkStatus);

//update a exsiting event
export const updateEvent = event => fetch('api/events', {
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + getJWTFromCookie(),
  },
  method: 'PUT',
  body: JSON.stringify(event),
}).then(checkStatus);

// create a new note
export const createNote = note => {
  const userId = note.userId;
  return fetch(`api/notes/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + getJWTFromCookie(),
    },
    method: 'POST',
    body: JSON.stringify(note),
  }).then(checkStatus);
}

// create a new event
export const createEvent = event => {
  const userId = event.userId;
  return fetch(`api/events/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + getJWTFromCookie(),
    },
    method: 'POST',
    body: JSON.stringify(event),
  }).then(checkStatus);
}

// delete a exsiting note
export const deleteNote = noteId => fetch(`api/notes/${noteId}`, {
  method: 'DELETE'
}).then(checkStatus);

// delete a exsiting event
export const deleteEvent = eventId => fetch(`api/events/${eventId}`, {
  method: 'DELETE'
}).then(checkStatus);

export const getJWTFromCookie = () => {
  const result = document.cookie.match(/jwt_token=([^;]*)[;]?/);
  if (result !== null && result.length >= 2) {
    return result[1];
  } else {
    return '';
  }
}
