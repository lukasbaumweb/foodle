import axios from "axios";
import { Auth } from "./auth";
import { CONFIG } from "./config";

/**
 * Removes trailing slash from string
 * @param {String} str custom string
 * @returns string without trailing slash
 */
const removeTrailingSlash = (str = "") =>
  str?.charAt(str.length - 1) === "/" ? str.substring(0, str.length - 1) : str;

/**
 *  Constructs a search string for browsers and apis from custom filters
 * @param {Object} filters consists of a filterKey and its filterValue as
 * object { filterKey: filterValue }
 * @returns search string for URLs starting with ?
 */
const generateSearchUrl = (filters) => {
  return Object.entries(filters)
    .reduce((acc, cur) => {
      return acc + cur[0] + "=" + cur[1] + "&";
    }, "?")
    .slice(0, -1);
};

/**
 * FoodleAPI class to communicate with foodle api
 */
class FoodleAPI {
  constructor(url) {
    this.url = removeTrailingSlash(url || CONFIG.API_URL);

    this.authToken = window ? Auth.getAuthToken(window) : null;
    if (this.authToken !== null)
      this.options = {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          "Access-Control-Allow-Origin": this.url || "*",
        },
      };
    else this.options = {};
  }

  async getFoodles(props) {
    let searchParams = "";
    if (props.filter) searchParams = generateSearchUrl(props.filter);
    const query = axios.get(`${this.url}/foodle${searchParams}`, this.options);
    const result = await this.executeQuery(query);
    return result;
  }

  async getFoodlesByQuery(filter) {
    let searchParams = generateSearchUrl(filter);
    const query = axios.get(
      `${this.url}/foodle/query/all${searchParams}`,
      this.options
    );
    const result = await this.executeQuery(query);
    return result;
  }

  async getMyFoodles(props) {
    let searchParams = "";
    if (props.filter) searchParams = generateSearchUrl(props.filter);
    const query = axios.get(
      `${this.url}/foodle/author/my${searchParams}`,
      this.options
    );
    const result = await this.executeQuery(query);
    return result;
  }

  async createFoodle(payload) {
    const query = axios.post(`${this.url}/foodle`, payload, this.options);
    const result = await this.executeQuery(query);
    return result;
  }

  async updateFoodle(id, payload) {
    const query = axios.put(`${this.url}/foodle/${id}`, payload, this.options);
    const result = await this.executeQuery(query);
    return result;
  }

  async getFoodle(id) {
    const query = axios.get(`${this.url}/foodle/${id}`, {
      ...this.options,
    });
    const result = await this.executeQuery(query);
    return result;
  }

  async getFoodleImages(id) {
    const query = axios.get(`${this.url}/foodle/images/${id}`, this.options);
    const result = await this.executeQuery(query);
    return result;
  }

  async getPublicFoodle(id) {
    const query = axios.get(`${this.url}/foodle/${id}`, this.options);
    const result = await this.executeQuery(query);
    return result;
  }

  async getRandomFoodle() {
    const query = axios.get(`${this.url}/foodle/type/random`, this.options);
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
      `${this.url}/files/${foodleId}/${imageId}/`,
      this.options
    );
    const result = await this.executeQuery(query);
    return result;
  }

  async removeIngredientFromFoodle(foodleId, ingredientId) {
    const query = axios.delete(
      `${this.url}/foodle/ingredient/${foodleId}/${ingredientId}`,
      this.options
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

  async getConfig(entity) {
    const query = axios.get(`${this.url}/config/${entity}`, this.options);
    const result = await this.executeQuery(query);
    return result;
  }

  async getVersion() {
    const query = axios.get(`${this.url}/`, this.options);
    const result = await this.executeQuery(query);
    return result;
  }

  async getChangelog() {
    const query = axios.get(`${this.url}/changes`, this.options);
    const result = await this.executeQuery(query);
    return result;
  }

  async getCurrentUser() {
    const query = axios.get(`${this.url}/auth/user`, this.options);
    const result = await this.executeQuery(query);
    return result;
  }
  async updateUser(payload) {
    const query = axios.put(`${this.url}/auth/user`, payload, this.options);
    const result = await this.executeQuery(query);
    return result;
  }

  async changePassword(payload) {
    const query = axios.put(
      `${this.url}/auth/changePassword`,
      payload,
      this.options
    );
    const result = await this.executeQuery(query);
    return result;
  }

  async executeQuery(promise) {
    try {
      const result = await promise;
      const data = result.data;
      return data;
    } catch (error) {
      const { request, response } = error;
      if (response) {
        const { status, data } = response;

        if (status === 440) {
          Auth.logout(error);
          return;
        }

        if (data.data?.error) {
          throw new Error(data.data.error);
        } else {
          throw new Error(data);
        }
      } else if (request) {
        throw new Error("server time out");
      } else {
        throw new Error("opps! something went wrong while setting up request");
      }
    }
  }

  async login(email, password) {
    const query = axios.post(
      `${this.url}/auth/login`,
      {
        email,
        password,
      },
      this.options
    );
    const result = await this.executeQuery(query);
    return result;
  }

  async register(payload) {
    const query = axios.post(
      `${this.url}/auth/register`,
      payload,
      this.options
    );
    const result = await this.executeQuery(query);
    return result;
  }

  async isLoggedIn() {
    this.options = {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    };
    const query = axios.get(`${this.url}/auth/check`, {
      ...this.options,
    });

    await this.executeQuery(query);

    return false;
  }
}

export default FoodleAPI;
