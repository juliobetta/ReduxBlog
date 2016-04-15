import { webApi }                    from '../utils/web-api';
import { POST, DELETE, PATCH, GET }  from '../constants/http-methods';
import { create, destroy, fetchOne } from '../utils/local-api';
import { USERS_RESOURCE }            from '../utils/database-schema';


export const CREATE_USER  = 'CREATE_USER';
export const DELETE_USER  = 'DELETE_USER';
export const UPDATE_USER  = 'UPDATE_USER';
export const GET_USER     = 'GET_USER';
export const SIGNIN_USER  = 'SIGNIN_USER';
export const SIGNOUT_USER = 'SIGNOUT_USER';


/**
 * Create User on local api and resolve the data
 * @param  {Object} { data }
 * @return {Promise}
 */
const createAndResolveCurrentUser = ({ data }) => {
  return create({
    resource: USERS_RESOURCE,
    data: { current_user: data }
  }).then((result) => Promise.resolve(result.current_user));
};


export function registerUser(data) {
  return {
    type: CREATE_USER,
    payload: webApi({ method: POST, uri: 'users', data }).then((response) => {
      return createAndResolveCurrentUser(response);
    })
  };
}


export function getUser() {
  return {
    type: GET_USER,
    payload: fetchOne({ resource: USERS_RESOURCE }).then((result) => {
      return Promise.resolve(result.current_user);
    })
  };
}


export function signin(data) {
  return {
    type: SIGNIN_USER,
    payload: webApi({ method: POST, uri: 'sessions', data }).then((response) =>{
      return destroy({ resource: USERS_RESOURCE }).then(() => {
        return createAndResolveCurrentUser(response);
      });
    })
  };
}


export function signout() {
  return {
    type: SIGNOUT_USER,
    payload: destroy({ resource: USERS_RESOURCE })
  };
}


export function cancelUser() {
  return {
    type: DELETE_USER,
    payload: webApi({ method: DELETE, uri: 'users/0' })
  };
}


export function updateUser(data) {
  return {
    type: UPDATE_USER,
    payload: webApi({ method: PATCH, uri: 'users/0', data }).then((response) =>{
      return destroy({ resource: USERS_RESOURCE }).then(() => {
        return createAndResolveCurrentUser(response);
      });
    })
  };
}
