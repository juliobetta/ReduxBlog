import axios from 'axios';
import { API_URL } from '../constants/common';
import { embedToken } from '../utils'


export const CREATE_USER = 'CREATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const AUTH_USER   = 'AUTH_USER';


export function register(data) {
  const url     = `${API_URL}/users`;
  const request = axios.post(url, data);

  return {
    type: CREATE_USER,
    payload: request
  };
}


export function signin(data) {
  const url     = `${API_URL}/sessions`;
  const request = axios.post(url, data);

  return {
    type: AUTH_USER,
    payload: request
  };
}


export function cancel(token = null) {
  embedToken(token);

  const url     = `${API_URL}/users/0`;
  const request = axios.delete(url);

  return {
    type: DELETE_USER,
    payload: request
  };
}


export function update(data, token = null) {
  embedToken(token);

  const url     = `${API_URL}/users/0`;
  const request = axios.patch(data);

  return {
    type: UPDATE_USER,
    payload: request
  };
}
