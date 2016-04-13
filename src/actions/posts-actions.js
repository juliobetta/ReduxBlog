import { push }   from 'react-router-redux';
import { syncUp } from './sync-actions';
import Post       from '../models/post';

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
    payload: Post.index()
  };
}


export function getPost(id) {
  return {
    type:    GET_POST,
    payload: Post.fetchOne(id)
  };
}


export function createPost(data) {
  return dispatch => {
    Post.create(data).then(results => {
      syncUp()(dispatch);
      dispatch({ type: CREATE_POST, payload: results });
      dispatch(push('/'));
    });
  }
}


export function deletePost(id) {
  return dispatch => {
    Post.delete(id).then(results => {
      syncUp()(dispatch);
      dispatch({ type: DELETE_POST, payload: id });
      dispatch(push('/'));
    });
  }
}


export function updatePost(id, data) {
  return dispatch => {
    Post.update(id, data).then(results => {
      syncUp()(dispatch);
      dispatch({ type: UPDATE_POST, payload: results });
      dispatch(push('/'));
    });
  }
}
