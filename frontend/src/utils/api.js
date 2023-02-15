const authorisationData = {
  baseUrl: ' https://api.mooslim-mesto.nomoredomainsclub.ru',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}

class Api {
  _baseUrl;
  _headers;

  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _checkRequest(url, options) {
    options.credentials = 'include'
    return fetch(url, options)
      .then(res => {
        if (res.ok) {
          return res.json()
            .then(res => { return res.data })
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`))
      })
  }

  // сделано
  getAddingPictures() {
    const url = `${this._baseUrl}/cards`;
    const options = {
      method: 'GET',
      headers: this._headers
    }
    return this._checkRequest(url, options)
  }

  // сделано
  addItem({ name, link }) {
    const url = `${this._baseUrl}/cards`
    const options = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    }
    return this._checkRequest(url, options)
  }

  // done
  removeItem(itemId) {
    const url = `${this._baseUrl}/cards/${itemId}`
    const options = {
      method: 'DELETE',
      headers: this._headers
    }
    return this._checkRequest(url, options)
  }

  // done
  changeLikeCardStatus(itemId, isLiked) {
    const url = `${this._baseUrl}/cards/${itemId}/likes`
    if (!isLiked) {
      const options = {
        method: 'DELETE',
        headers: this._headers
      }
      return this._checkRequest(url, options)
    } else {
      const options = {
        method: 'PUT',
        headers: this._headers
      }
      return this._checkRequest(url, options)
    }
  }

  // сделано
  getUserInfo() {
    const url = `${this._baseUrl}/users/me`
    const options = {
      method: 'GET',
      headers: this._headers
    }
    return this._checkRequest(url, options)
  }


  updateUserInfo({ name, about }) {
    const url = `${this._baseUrl}/users/me`
    const options = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    }
    return this._checkRequest(url, options)
  }

  updateUserAvatar({ avatar }) {
    const url = `${this._baseUrl}/users/me/avatar`
    const options = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatar}`
      })
    }
    return this._checkRequest(url, options)
  }
}

export const api = new Api(authorisationData)


