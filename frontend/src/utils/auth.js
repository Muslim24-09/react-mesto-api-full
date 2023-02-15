const BASE_URL = 'https://api.mooslim-mesto.nomoredomainsclub.ru'

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.message}`);
}

export const register = ({email, password}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(checkResponse)
};

export const login = ({email, password}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
  .then(checkResponse)// поставить выше then где ты localstorage
  .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    })
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(checkResponse)
};