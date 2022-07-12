import FoodleAPI from "./api";
import { CONFIG } from "./config";

/**
 * Determines how long a session should be valid (currently: 7 days)
 */
const EXPIRY_TIME = 1000; //* 60 * 60 * 7;

class Auth {
  constructor() {
    this._api = new FoodleAPI();

    this._session = new Session(window);
    this._session.init(this);
  }

  onAuthStateChanged(callback) {
    callback(this._session.getUser());
  }

  async checkAuthStatus() {
    try {
      await this._api.isLoggedIn();
    } catch (err) {
      this._session.destroy();
      throw new Error("not authenticated");
    }
  }

  async login(email, password) {
    const { data } = await this._api.login(email, password);
    if (data) {
      this._session.setAuthToken(data.token);
      this._session.setUser(data);
      this.save();
    }
  }

  async register(payload) {
    const { data } = await this._api.register(payload);

    this._session.setAuthToken(data.token);
    this._session.setUser(data);
    this.save();
  }

  static logout(error) {
    window.localStorage.removeItem(CONFIG.LOCAL_STORAGE_USER_METADATA);
    window.localStorage.removeItem(CONFIG.LOCAL_STORAGE_SESSION_KEY);

    if (error === CONFIG.SESSION_EXPIRED) {
      window.location.href = "/logout?e=" + CONFIG.SESSION_EXPIRED_ABBR;
    } else {
      window.location.href = "/logout";
    }
  }

  async getCurrentUser() {
    return this._api.getCurrentUser();
  }

  async updateUser(payload) {
    return this._api.updateUser(payload);
  }

  async changePassword(payload) {
    return this._api.changePassword(payload);
  }

  static getAuthToken() {
    return Session.getAuthToken();
  }

  getUser() {
    return this._session.getUser();
  }

  isLoggedIn() {
    return this._session.exists;
  }

  save() {
    window.localStorage.setItem(
      CONFIG.LOCAL_STORAGE_USER_METADATA,
      this.toString()
    );
  }

  toString() {
    return JSON.stringify({
      createdAt: this.createdAt,
    });
  }
}

class Session {
  constructor() {
    this.token = null;
    this.metadata = null;
    this.exists = false;
  }

  init(authInstance) {
    const storage = this.getStoredData();
    if (storage) {
      this.token = storage.token;
      this.metadata = storage.metadata;
      this.exists = true;
    } else if (
      new Date(storage?.savedAt).getTime() - new Date().getTime() >
      EXPIRY_TIME
    ) {
      authInstance?.refresh();
    } else {
      this.exists = false;
    }
  }

  getStoredData() {
    let storage = window.localStorage.getItem(CONFIG.LOCAL_STORAGE_SESSION_KEY);

    if (storage) {
      storage = JSON.parse(storage);
      storage.savedAt = new Date(storage.savedAt);
      delete storage.metadata.token;
    }
    return storage;
  }

  setAuthToken(token) {
    this.token = token;
    this.save();
  }

  static getAuthToken() {
    let storage = window.localStorage.getItem(CONFIG.LOCAL_STORAGE_SESSION_KEY);
    if (storage) {
      storage = JSON.parse(storage);
      return storage.metadata.token;
    }
    return null;
  }

  setUser(data) {
    this.metadata = data;
    this.save();
  }

  getUser() {
    const storage = this.getStoredData();
    return storage?.metadata;
  }

  save() {
    window.localStorage.setItem(
      CONFIG.LOCAL_STORAGE_SESSION_KEY,
      this.toString()
    );
  }

  destroy() {
    window.localStorage.removeItem(CONFIG.LOCAL_STORAGE_SESSION_KEY);
  }

  toString() {
    return JSON.stringify({
      savedAt: new Date().getTime(),
      token: this.token,
      metadata: this.metadata,
    });
  }
}

export { Auth };
