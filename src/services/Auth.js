import api from './Api';
import {ENV} from '../config/environment'

class Auth {
  _token = null;

  login(username, password) {
    return new Promise(async (resolve, reject) => {
      const loginData = {
        username,
        password
      }
      try {
        const res = await api.post(`${ENV.AUTH_URL}/api/login`, loginData);
        const {token} = res;
        this._token = token;
        localStorage.setItem("token", token);
        resolve(token);
      } catch (e) {
        reject(e);
      }
    })
  }

  isAuthenticated() {
    let userToken = localStorage.getItem('token');
    this._token = userToken;
    return userToken;
  }

  logout() {
    this._token = null;
    localStorage.clear();
  }
}

export default new Auth();