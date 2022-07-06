import FoodleAPI from "./api";
import { translate } from "./translater";
import CONSTANTS from "./constants";

const LOCAL_STORAGE_USER_METADATA = "foodleData";
const LOCAL_STORAGE_SESSION_KEY = "foodleSession";
const EXPIRY_TIME = 1000 * 60 * 60 * 7; //7d
const EVENTS = {
  authStateChanged: "authStateChanged",
};

const handleError = (error) => {
  if (error.response) {
    return error.response?.data?.error;
  } else if (error.request) {
    console.error("Request", error.request);
    return { error: translate("unknown-error") };
  } else {
    return { error: error.message };
  }
};

class Auth {
  constructor() {
    this._api = new FoodleAPI();

    this.attachEvents();
    this._session = new Session(window);
    this._session.init(this);
  }

  attachEvents() {
    Object.values(EVENTS).forEach((event) => new Event(event));

    document.addEventListener(
      EVENTS.authStateChanged,
      (e) => {
        console.log(e);
      },
      false
    );
  }

  onAuthStateChanged(callback) {
    callback(this._session.getUser());
  }

  async refresh() {
    this._api.isLoggedIn();
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
    window.localStorage.removeItem(LOCAL_STORAGE_USER_METADATA);
    window.localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);

    if (error === CONSTANTS.SESSION_EXPIRED) {
      window.location.href = "/logout?e=" + CONSTANTS.SESSION_EXPIRED_ABBR;
    } else {
      window.location.href = "/logout";
    }
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
    window.localStorage.setItem(LOCAL_STORAGE_USER_METADATA, this.toString());
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
    let storage = window.localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);

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
    let storage = window.localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
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
    window.localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, this.toString());
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
