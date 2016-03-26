import { api, POST, DELETE, PATCH, GET } from '../utils/api';
import { getToken } from '../utils';


export const CREATE_USER = 'CREATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_USER    = 'GET_USER';
export const AUTH_USER   = 'AUTH_USER';
export const GET_TOKEN   = 'GET_TOKEN';


export function registerUser(data) {
  const request = api({ method: POST, uri: 'users', data });

  return {
    type: CREATE_USER,
    payload: request
  };
}


export function getUser() {
  const request = api({ method: GET, uri: 'users/0' });

  return {
    type: GET_USER,
    payload: request
  };
}


export function signin(data) {
  const request = api({ method: POST, uri: 'sessions', data });

  return {
    type: AUTH_USER,
    payload: request
  };
}


export function getSavedToken() {
  return {
    type: GET_TOKEN,
    payload: { token: getToken() }
  };
}


export function cancelUser() {
  const request = api({ method: DELETE, uri: 'users/0' });

  return {
    type: DELETE_USER,
    payload: request
  };
}


export function updateUser(data) {
  const request = api({ method: PATCH, uri: 'users/0', data });

  return {
    type: UPDATE_USER,
    payload: request
  };
}
