import axios from "axios";

class Foodle_API {
  constructor(url) {
    // example: https://domain.tld/api/v1
    this.url = (url || process.env.REACT_APP_API_URL)?.trimEnd("/");
  }

  async get(collection, options) {
    const query = axios.get(`${this.url}/${collection}`, options);
    const result = await this.executeQuery(query);
    return result;
  }

  async post(collection, { id, data }, options) {
    const query = axios.post(`${this.url}/${collection}/${id}`, { data }, options);
    const result = await this.executeQuery(query);
    return result;
  }

  async put(collection, { id, data }, options) {
    const query = axios.put(`${this.url}/${collection}/${id}`, { data }, options);
    const result = await this.executeQuery(query);
    return result;
  }

  async delete(collection, id, options) {
    const query = axios.delete(`${this.url}/${collection}/${id}`, options);
    const result = await this.executeQuery(query);
    return result;
  }

  async executeQuery(promise) {
    const result = await promise();
    const data = result.data;
    const error = this.error(result.error);
    return { data, error };
  }

  error(err) {
    console.error(err);
    return err;
  }
}

export default Foodle_API;
