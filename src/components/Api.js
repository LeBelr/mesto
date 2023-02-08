export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getErr(err) {
    console.log(err);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(this._getRes)
      .catch(this._getErr);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._getRes)
      .catch(this._getErr);
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data)
    })
      .then(this._getRes)
      .catch(this._getErr);
  }

  createCard(item) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(item)
    })
      .then(this._getRes)
      .catch(this._getErr);
  }

  handleDeleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(this._getRes)
      .catch(this._getErr);
  }

  handleLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT'
    })
      .then(this._getRes)
      .catch(this._getErr);
  }

  handleDeleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(this._getRes)
      .catch(this._getErr);
  }

  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data)
    })
      .then(this._getRes)
      .catch(this._getErr);
  }
}