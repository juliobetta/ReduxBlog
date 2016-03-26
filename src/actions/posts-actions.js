import { api, GET, POST, PATCH, DELETE } from '../utils/api';

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
    type:    FETCH_POSTS,
    payload: api({ method: GET, uri: 'posts' })
  };
}


export function createPost(data) {
  return {
    type:    CREATE_POST,
    payload: api({ method: POST, uri: 'posts', data })
  };
}


export function getPost(id) {
  return {
    type:    GET_POST,
    payload: api({ method: GET, uri: `posts/${id}`})
  };
}


export function deletePost(id) {
  return {
    type:    DELETE_POST,
    payload: api({ method: DELETE, uri: `posts/${id}` })
  };
}


export function updatePost(id, data) {
  return {
    type: UPDATE_POST,
    payload: api({ method: PATCH, uri: `posts/${id}`, data })
  };
}
