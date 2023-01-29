export default class SessionStorage {
  static has(key) {
    return sessionStorage.getItem(key) !== null;
  }

  static get(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  static put(key, val) {
    if (!this.has(key)) {
      sessionStorage.setItem(key, JSON.stringify(val));
    }
  }

  static remove(key) {
    sessionStorage.removeItem(key);
  }

  static clearStorage() {
    sessionStorage.clear();
  }
}
