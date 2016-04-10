import { push }                            from 'react-router-redux';
import { syncUp }                          from './sync-actions';
import * as API                            from '../utils/local-api';
import { POSTS_RESOURCE, orderDirections } from '../utils/database-schema';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const GET_POST    = 'GET_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const EMPTY_POST  = 'EMPTY_POST';


export function emptyPost() {
  return {
    type: EMPTY_POST,
    payload: {}
  };
}


export function fetchPosts() {
  return {
    type: FETCH_POSTS,
    payload: API.fetchAll({
      resource: POSTS_RESOURCE,
      params: { deleted_at: null },
      options: {
        orderBy: [
          ['created_at', orderDirections.DESC]
        ]
      }
    })
  };
}


export function getPost(id) {
  return {
    type:    GET_POST,
    payload: API.fetchOne({ resource: POSTS_RESOURCE, params: { id } })
  };
}


export function createPost(data) {
  return dispatch => {
    API.create({ resource: POSTS_RESOURCE, data })
       .then(results => {
          syncUp()(dispatch);
          dispatch({ type: CREATE_POST, payload: results });
          dispatch(push('/'));
       });
  }
}


export function deletePost(id) {
  return dispatch => {
    API.softDelete({ resource: POSTS_RESOURCE, params: { id } })
       .then(results => {
          syncUp()(dispatch);
          dispatch({ type: DELETE_POST, payload: id });
          dispatch(push('/'));
       });
  }
}


export function updatePost(id, data) {
  return dispatch => {
    API.update({ resource: POSTS_RESOURCE, params: { id }, data })
       .then(results => {
          syncUp()(dispatch);
          dispatch({ type: UPDATE_POST, payload: results });
          dispatch(push('/'));
       });
  }
}
