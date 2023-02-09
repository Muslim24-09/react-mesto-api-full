// const BASE_URL = 'https://auth.nomoreparties.co';
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
    credentials: 'include',
    headers: {
      // "Content-Type": "application/json",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
  .then((data) => {
    console.log(777, data);
      // if (data.token) {
      if (data.ok) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    })
    .then(checkResponse)
};

// export const checkToken = () => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       // Authorization: `Bearer ${jwt}`,
//     },
//     credentials: 'include',
//   })
//     .then(checkResponse)
// };