export default class LocalStorage {
  static has(key) {
    return localStorage.getItem(key) !== null;
  }

  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static put(key, val) {
    if (!this.has(key)) {
      localStorage.setItem(key, JSON.stringify(val));
    }
  }
}
