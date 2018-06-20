import axios from 'axios';

import { ENV } from '../config/environment';

/**
 * Api class in which uses fetch as http handler
 *
 * @class Api
 */
class Api {
  constructor() {
    this.apiUrl = ENV.API_URL;
    axios.defaults.baseURL = this.apiUrl;
  }
  /**
   *
   *
   * @param {any} { url, params, options }
   * @returns promise
   * @memberof Api
   */
  get(url, options = {}) {
    const defaultOptions = {
    };
    const config = { ...defaultOptions, ...options };
    return new Promise((resolve, reject) => {
      axios.get(url, config)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  }
  /**
   *
   *
   * @param {any} { url, options, data }
   * @returns promise
   * @memberof Api
   */
  post(url, data, options = {}) {
    const defaultOptions = {
    };
    const config = { ...defaultOptions, ...options };
    return new Promise((resolve, reject) => {
      axios.post(url, data, config)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  }
}

export default new Api();
