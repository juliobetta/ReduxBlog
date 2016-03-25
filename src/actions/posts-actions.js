import axios from 'axios';
import { API_URL } from '../constants/common';
import { embedToken } from '../utils';

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


export function fetchPosts(token = null) {
  const url     = `${API_URL}/posts`;
  const request = axios.get(url, embedToken(token));

  return {
    type:    FETCH_POSTS,
    payload: request
  };
}


export function createPost(data, token = null) {
  const url     = `${API_URL}/posts`;
  const request = axios.post(url, data, embedToken(token));

  return {
    type:    CREATE_POST,
    payload: request
  };
}


export function getPost(id, token = null) {
  const url     = `${API_URL}/posts/${id}`;
  const request = axios.get(url, embedToken(token));

  return {
    type:    GET_POST,
    payload: request
  };
}


export function deletePost(id, token = null) {
  const url     = `${API_URL}/posts/${id}`;
  const request = axios.delete(url, embedToken(token));

  return {
    type:    DELETE_POST,
    payload: request
  };
}


export function updatePost(id, data, token = null) {
  const url     = `${API_URL}/posts/${id}`;
  const request = axios.patch(url, data, embedToken(token));

  return {
    type: UPDATE_POST,
    payload: request
  };
}
