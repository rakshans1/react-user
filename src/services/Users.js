import api from './Api';
/**
 * Users service provider to make crud operations
 *
 * @class Users
 */
class Users {
  /**
   *
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
}

export default new Users();