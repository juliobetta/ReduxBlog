import axios from 'axios';
import User  from '../models/user';


export const API_HOST          = 'http://docker:3000';
export const API_URL           = `${API_HOST}/api`;
export const NETWORK_ERROR_MSG = 'Network Error'; // from axios


/**
 * Make api call
 * @param  {Array} args = []
 * @return {Promise}
 */
function call (method, uri, args = []) {
  return axios[method](...args).then(
    response => Promise.resolve(response),
    error    => Promise.reject({
      ...error,
      offline: error.message && error.message === NETWORK_ERROR_MSG
    })
  );
}


/**
 * Web API
 * @param  {Object} { method, uri, data = null }
 * @return {Promise}
 */
export function webApi({ method, uri, data = null }) {
  let args = [uri ? `${API_URL}/${uri}` : API_HOST];

  if(data !== null) {
    args.push(data);
  }

  return User.current().then(
    user => {
      args.push({
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      return call(method, uri, args);
    },
    error => {
      console.log(error);
      return call(method, uri, args);
    }
  );
}
