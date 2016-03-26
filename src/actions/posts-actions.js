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
  const request = api({ method: GET, uri: 'posts' });

  return {
    type:    FETCH_POSTS,
    payload: request
  };
}


export function createPost(data) {
  const request = api({ method: POST, uri: 'posts', data });

  return {
    type:    CREATE_POST,
    payload: request
  };
}


export function getPost(id) {
  const request = api({ method: GET, uri: `posts/${id}`});

  return {
    type:    GET_POST,
    payload: request
  };
}


export function deletePost(id) {
  const request = api({ method: DELETE, uri: `posts/${id}` });

  return {
    type:    DELETE_POST,
    payload: request
  };
}


export function updatePost(id, data) {
  const request = api({ method: PATCH, uri: `posts/${id}`, data });

  return {
    type: UPDATE_POST,
    payload: request
  };
}
