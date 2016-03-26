import { api, POST, DELETE, PATCH, GET } from '../utils/api';
import { getToken } from '../utils';


export const CREATE_USER  = 'CREATE_USER';
export const DELETE_USER  = 'DELETE_USER';
export const UPDATE_USER  = 'UPDATE_USER';
export const GET_USER     = 'GET_USER';
export const SIGNIN_USER  = 'SIGNIN_USER';
export const SIGNOUT_USER = 'SIGNOUT_USER';


export function registerUser(data) {
  return {
    type: CREATE_USER,
    payload: api({ method: POST, uri: 'users', data })
  };
}


export function getUser() {
  const token = getToken();

  return {
    type: GET_USER,
    payload: api({ method: GET, uri: 'users/0' })
  };
}


export function signin(data) {
  return {
    type: SIGNIN_USER,
    payload: api({ method: POST, uri: 'sessions', data })
  };
}


export function signout() {
  return {
    type: SIGNOUT_USER,
    payload: {}
  };
}


export function cancelUser() {
  return {
    type: DELETE_USER,
    payload: api({ method: DELETE, uri: 'users/0' })
  };
}


export function updateUser(data) {
  return {
    type: UPDATE_USER,
    payload: api({ method: PATCH, uri: 'users/0', data })
  };
}
