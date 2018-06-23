import api from './Api';
/**
 * Users service provider to make crud operations
 *
 * @class Users
 */
class Users {
  /**
   * Gets list of user from endpoint
   *
   * @returns promise
   * @memberof Users
   */
  getUsers() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get('/users');
        resolve(res);
      } catch (e) {
        reject(e);
      }
    })
  }
  /**
   *  Get single user from endpoint
   *
   * @param {number} userId
   * @returns {promise} user
   * @memberof Users
   */
  getUser(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get(`/users/${userId}`);
        resolve(res);
      } catch (e) {
        reject(e);
      }
    })
  }
  /**
   * Adds new user to the endpoint
   *
   * @param {Object} user
   * @returns {object} user
   * @memberof Users
   */
  addUser(user) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.post('/users', user);
        resolve(res);
      } catch (e) {
        reject(e);
      }
    })
  }

  /**
   * Edit user information
   *
   * @param {Object} user
   * @returns {object} user
   * @memberof Users
   */
  editUser(userId, user) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.put(`/users/${userId}`, user);
        resolve(res);
      } catch (e) {
        reject(e);
      }
    })
  }

  /**
   * Delete user information
   *
   * @param {Object} user
   * @returns {object} user
   * @memberof Users
   */
  deleteUser(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.delete(`/users/${userId}`);
        resolve(res);
      } catch (e) {
        reject(e);
      }
    })
  }
}

export default new Users();