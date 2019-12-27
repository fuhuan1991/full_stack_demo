import fetch from 'unfetch';

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

export const getAllStudents = () => fetch('/api/students').then(checkStatus);

export const addNewStudent = student => fetch('api/students', {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(student),
}).then(checkStatus);

export const login = user => {
  const {name, password} = user;
  const url = `/api/users/login?name=${name}&password=${password}`;
  return fetch(url, {
    method: 'GET',
  }).then(checkStatus);
}

export const signup = user => fetch('api/users', {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(user),
}).then(checkStatus);

export const getUserNotes = userId => fetch(`api/notes/getUserNotes/${userId}`, {
  method: 'GET'
}).then(checkStatus);

export const updateNote = note => fetch('api/notes', {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'PUT',
  body: JSON.stringify(note),
}).then(checkStatus);

export const createNote = note => {
  const userId = note.userId;
  return fetch(`api/notes/${userId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(note),
  }).then(checkStatus);
}

export const deleteNote = userId => fetch(`api/notes/${userId}`, {
  method: 'DELETE'
}).then(checkStatus);