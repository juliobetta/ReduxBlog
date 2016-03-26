import axios from 'axios';
import { embedToken } from './index';

export const API_URL = 'http://0.0.0.0:3000/api';
export const GET     = 'get';
export const POST    = 'post';
export const PATCH   = 'patch';
export const DELETE  = 'delete';

export const api = ({ method, uri, data = null }) => {
  let args = [`${API_URL}/${uri}`];

  if(data !== null) {
    args.push(data);
  }

  args.push(embedToken());

  return axios[method](...args);
};
