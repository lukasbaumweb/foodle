import axios from "axios";
import { Auth } from "./auth";
import constants from "./constants";

const removeTrailingSlash = (str) =>
  str.charAt(str.length - 1) === "/" ? str.substr(0, str.length - 1) : str;

const generateSearchUrl = (filters) => {
  return Object.entries(filters)
    .reduce((acc, cur) => {
      return acc + cur[0] + "=" + cur[1] + "&";
    }, "?")
    .slice(0, -1);
};
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

  async getFoodles(props) {
    let searchParams = "";
    if (props.filter) searchParams = generateSearchUrl(props.filter);
    const query = axios.get(`${this.url}/foodle${searchParams}`, this.options);
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
      `${this.url}/foodle/image/${foodleId}`,
      { imageId },
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
      data,
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
      return data;
    } catch (error) {
      const { request, response } = error;
      if (response) {
        const { statusCode, error } = response.data.data;

        if (statusCode === 440) {
          Auth.logout(error);
          return;
        }

        throw new Error(error);
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

  async register({ firstName, lastName, email, password }) {
    const query = axios.post(
      `${this.url}/auth/register`,
      {
        firstName,
        lastName,

        email,
        password,
        mode: "user",
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
