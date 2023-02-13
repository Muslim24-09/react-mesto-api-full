// const BASE_URL = 'https://auth.nomoreparties.co';
const BASE_URL = 'https://api.mooslim-mesto.nomoredomainsclub.ru'

function checkResponse(res) {
  console.log(111, res);
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`222${res.message}`);
}

export const register = ({email, password}) => {
  return fetch(`${BASE_URL}/signup`, {
    credentials: 'include',
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
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
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
  .then(checkResponse)// поставить выше then где ты localstorage
  .then((data) => {
      if (data.token) {
      // if (data.ok) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    })
};

export const checkToken = () => {
  const jwt = localStorage.getItem("jwt")
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookies: `jwt=${jwt}`,
    },
    credentials: 'include',
  })
    .then(checkResponse)
};