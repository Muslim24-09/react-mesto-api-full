const authorisationData = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52', options: {
    authorization: '4d3c9e1d-cc98-4110-97fa-b50511b9880a',
    'Content-Type': 'application/json'
  }
}

class Api {
  _baseUrl;
  _options;

  constructor({ baseUrl, options }) {
    this._baseUrl = baseUrl;
    this._options = options
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getAddingPictures() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._options
    })
      .then(res => this._checkResponse(res))
  }

  addItem({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._options,
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    })
      .then(res => this._checkResponse(res))
  }

  removeItem(itemId) {
    return fetch(`${this._baseUrl}/cards/${itemId}`, {
      method: 'DELETE',
      headers: this._options,
    })
      .then(res => this._checkResponse(res))
  }

  changeLikeCardStatus(itemId, isLiked) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/${itemId}/likes`, {
        method: 'DELETE',
        headers: this._options
      })
        .then(res => this._checkResponse(res));
    } else {
      return fetch(`${this._baseUrl}/cards/${itemId}/likes`, {
        method: 'PUT',
        headers: this._options
      })
        .then(res => this._checkResponse(res));
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._options
    })
      .then(res => this._checkResponse(res))
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    })
      .then(res => this._checkResponse(res))
  }

  updateUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options,
      body: JSON.stringify({
        avatar: `${avatar}`
      })

    })
      .then(res => this._checkResponse(res))
  }
}
export const api = new Api(authorisationData)


