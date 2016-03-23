import axios from 'axios';
import { API_URL, API_KEY } from '../constants/common';


export const AUTH_SIGNIN = 'AUTH_SIGNIN';


export function signin(data) {
  // const url     = `${API_URL}/auth`;
  // const request = axios.post(url, data);

  return {
    type:    AUTH_SIGNIN,
    payload: { data: null }
  };
}
