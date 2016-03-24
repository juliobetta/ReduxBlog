import axios from 'axios';
import { API_URL } from '../constants/common';


export const AUTH_SIGNIN = 'AUTH_SIGNIN';


export function signin(data) {
  const url     = `${API_URL}/sessions`;
  const request = axios.post(url, data);

  return {
    type: AUTH_SIGNIN,
    payload: request
  };
}
