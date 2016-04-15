import User                          from '../utils/daos/user';
import { wipeDatabase }              from '../utils/local-api';
import { webApi }                    from '../utils/web-api';
import { POST, DELETE, PATCH, GET }  from '../constants/http-methods';


export const CREATE_USER  = 'CREATE_USER';
export const DELETE_USER  = 'DELETE_USER';
export const UPDATE_USER  = 'UPDATE_USER';
export const GET_USER     = 'GET_USER';
export const SIGNIN_USER  = 'SIGNIN_USER';
export const SIGNOUT_USER = 'SIGNOUT_USER';


export function registerUser(data) {
  return {
    type: CREATE_USER,
    payload: webApi({ method: POST, uri: 'users', data }).then((response) => {
      return User.save(response.data);
    })
  };
}


export function getUser() {
  return {
    type: GET_USER,
    payload: User.current()
  };
}


export function signin(data) {
  return {
    type: SIGNIN_USER,
    payload: webApi({ method: POST, uri: 'sessions', data }).then((response) => {
      return User.save(response.data);
    })
  };
}


export function signout() {
  return {
    type: SIGNOUT_USER,
    payload: wipeDatabase()
  };
}


export function cancelUser() {
  return {
    type: DELETE_USER,
    payload: webApi({ method: DELETE, uri: 'users/0' }).then(wipeDatabase)
  };
}


export function updateUser(data) {
  return {
    type: UPDATE_USER,
    payload: webApi({ method: PATCH, uri: 'users/0', data }).then((response) =>{
      return User.save(response.data);
    })
  };
}
