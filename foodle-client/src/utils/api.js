import axios from "axios";

const removeTrailingSlash = (str) =>
  str.charAt(str.length - 1) === "/" ? str.substr(0, str.length - 1) : str;

class FoodleAPI {
  constructor(url) {
    this.url = removeTrailingSlash(url || process.env.REACT_APP_FOODLE_API_URL);
    this.options = {};
    this.authToken = null;
  }

  async get(collection) {
    const query = axios.get(`${this.url}/${collection}`, this.options);
    const result = await this.executeQuery(query);
    return result;
  }

  async post(collection, { id, data }) {
    const query = axios.post(
      `${this.url}/${collection}/${id}`,
      { data },
      this.options
    );
    const result = await this.executeQuery(query);
    return result;
  }

  async put(collection, { id, data }) {
    const query = axios.put(
      `${this.url}/${collection}/${id}`,
      { data },
      this.options
    );
    const result = await this.executeQuery(query);
    return result;
  }

  async delete(collection, id) {
    const query = axios.delete(`${this.url}/${collection}/${id}`, this.options);
    const result = await this.executeQuery(query);
    return result;
  }

  async executeQuery(promise) {
    const result = await promise;
    const data = result.data;
    const error = result.error;
    if (error) this.errorHandler(error);
    return { data, error };
  }

  async login(username, password) {
    const query = axios.post(
      `${this.url}/auth/login`,
      {
        username,
        password,
      },
      this.options
    );
    const result = await this.executeQuery(query);
    return result;
  }

  async isLoggedIn(sessionKey) {
    this.options = {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    };
    const query = axios.post(
      `${this.url}/auth/check`,
      {
        token: sessionKey,
      },
      this.options
    );
    const { data, error } = await this.executeQuery(query);

    return false;
  }

  errorHandler = (error) => {
    const { request, response } = error;
    if (response) {
      const { message } = response.data;
      const status = response.status;
      return {
        message,
        status,
      };
    } else if (request) {
      return {
        message: "server time out",
        status: 503,
      };
    } else {
      return { message: "opps! something went wrong while setting up request" };
    }
  };
}

export default FoodleAPI;
