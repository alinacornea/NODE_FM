class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  static setProfile(picture) {
    localStorage.setItem('picture', picture);
  }

  static setUser(email) {
    localStorage.setItem('user', email);
  }

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }
  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('picture');
    localStorage.removeItem('preview');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static getUser() {
    return localStorage.getItem('user');
  }

  static getProfile(){
    return localStorage.getItem('picture');
  }


}

export default Auth;
