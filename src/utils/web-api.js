import axios          from 'axios';
import { fetchOne } from './local-api';
import { USERS_RESOURCE } from './database-schema';


export const API_HOST = 'http://reduxblogserver.herokuapp.com';
export const API_URL  = `${API_HOST}/api`;
export const GET      = 'get';
export const POST     = 'post';
export const PATCH    = 'patch';
export const DELETE   = 'delete';


/**
 * Check whether internet is reachable
 * @return {Promise}
 */
const isHostReachable = () => {
  const rand = Math.floor((1 + Math.random()) * 0x10000);

  let server = window.location.hostname;
  if (window.location.port !== '') {
    server += ':'+window.location.port;
  }

  return axios.head(API_HOST, { rand }).then(
    (response) => Promise.resolve(),
    (error)    => Promise.reject(error)
  );

};


/**
 * Make api call
 * @param  {Array} args = []
 * @return {Promise}
 */
const call = (method, uri, args = []) => {
  return isHostReachable().then(
    ()      => Promise.resolve(axios[method](...args)),
    (error) => Promise.reject({
      data: {
        errors: ['No Network. Please try again later']
      }
    })
  );
};


/**
 * Web API
 * @param  {Object} { method, uri, data = null }
 * @return {Promise}
 */
export const webApi = ({ method, uri, data = null }) => {
  let args = [`${API_URL}/${uri}`];

  if(data !== null) {
    args.push(data);
  }

  return fetchOne({ resource: USERS_RESOURCE }).then((user) => {
    args.push({
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    return call(method, uri, args);
  }).catch(() => call(method, uri, args));
};
