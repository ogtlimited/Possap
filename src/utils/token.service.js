/* eslint-disable class-methods-use-this */
class TokenService {
  getToken() {
    const token = localStorage.getItem('token');

    return token;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  removeUser() {
    localStorage.removeItem('user');
  }

  clearStorage() {
    localStorage.clear();
  }
}

export default new TokenService();
