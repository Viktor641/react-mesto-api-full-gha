export class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Код ошибки: ${res.status}`);
    }
  }

  getUserData() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => { return this._checkResponse(res); })
  }

  sendAvatarData(avatarLink) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatarLink.avatar })
    })
      .then(res => { return this._checkResponse(res); })
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => { return this._checkResponse(res); })
  }

  addNewCard({ name, link }) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ name, link })
    })
      .then(res => { return this._checkResponse(res); })
  }

  sendUserData(profileData) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({ name: profileData.name, about: profileData.job })
    })
      .then(res => { return this._checkResponse(res); })
  }

  deleteCardId(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: {
        authorization: `Bearer ${token}`
      },
      method: 'DELETE',
    })
      .then(res => { return this._checkResponse(res); })
  }

  putLike(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: {
        authorization: `Bearer ${token}`
      },
      method: 'PUT',
    })
      .then(res => { return this._checkResponse(res); })
  }

  deleteLike(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: {
        authorization: `Bearer ${token}`
      },
      method: 'DELETE',
    })
      .then(res => { return this._checkResponse(res); })
  }
}

const api = new Api({
  baseUrl: 'https://api.sudarkinvmesto.nomoreparties.co',
});

export default api