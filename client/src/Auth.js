class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static getSolution() {
    return localStorage.getItem('solution');
  }

  static getLayout() {
    return localStorage.getItem('layout');
  }

  static setInfo(solution, layout) {
    localStorage.setItem('solution', solution);
    localStorage.setItem('layout', layout);
  }


}

export default Auth;
