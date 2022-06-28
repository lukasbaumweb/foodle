import axios from "axios";
import { Auth } from "./auth";
import constants from "./constants";

const removeTrailingSlash = (str) =>
  str.charAt(str.length - 1) === "/" ? str.substr(0, str.length - 1) : str;

class FoodleAPI {
  constructor(url) {
    this.url = removeTrailingSlash(url || process.env.REACT_APP_FOODLE_API_URL);

    this.authToken = window ? Auth.getAuthToken(window) : null;
    if (this.authToken !== null)
      this.options = {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      };
    else this.options = {};
  }

  async get(collection) {
    const query = axios.get(`${this.url}/${collection}`, this.options);
    const result = await this.executeQuery(query);
    return result;
  }

  async createFoodle(payload) {
    const query = axios.get(`${this.url}/foodle`, {
      data: payload,
      ...this.options,
    });
    const result = await this.executeQuery(query);
    return result;
  }

  async getFoodle(id) {
    const query = axios.post(`${this.url}/foodle/${id}`, {
      ...this.options,
    });
    const result = await this.executeQuery(query);
    return result;
  }

  async getFoodleImages(id) {
    const query = axios.get(`${this.url}/foodle/images/${id}`, {
      ...this.options,
    });
    const result = await this.executeQuery(query);
    return result;
  }

  async getRandomFoodle() {
    const query = axios.get(`${this.url}/foodle/random`, this.options);
    const result = await this.executeQuery(query);
    return result;
  }

  async deleteFoodle(id) {
    const query = axios.delete(`${this.url}/foodle/${id}`, {
      ...this.options,
    });
    const result = await this.executeQuery(query);
    return result;
  }

  async deleteFoodleImage(foodleId, imageId) {
    const query = axios.delete(
      `${this.url}/foodle/image/${foodleId}`,
      { data: { imageId: imageId } },
      { ...this.options }
    );
    const result = await this.executeQuery(query);
    return result;
  }

  async uploadImages(id, formData, loadingOptions) {
    const query = axios.post(`${this.url}/files/foodle/${id}`, formData, {
      ...this.options,
      ...loadingOptions,
      "Content-Type": "multipart/form-data",
    });
    const result = await this.executeQuery(query);
    return result;
  }

  async getIngredientConfig() {
    const query = axios.get(`${this.url}/config/ingredient`, this.options);
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
    try {
      const result = await promise;
      const data = result.data;
      const error = result.error;
      if (error) throw new Error(error);
      return data;
    } catch (error) {
      const { request, response } = error;
      if (response) {
        const { message, code, error } = response.data;
        const status = response.status;

        if (error === constants.SESSION_EXPIRED) {
          Auth.logout(window, error);
          return;
        }

        return {
          message,
          status,
          code,
        };
      } else if (request) {
        return {
          message: "server time out",
          status: 503,
        };
      } else {
        return {
          message: "opps! something went wrong while setting up request",
        };
      }
    }
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
    await this.executeQuery(query);

    return false;
  }
}

export default FoodleAPI;
