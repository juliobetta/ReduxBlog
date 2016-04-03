import * as API           from '../utils/local-api';
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
    type:    FETCH_POSTS,
    payload: API.fetchAll({
      resource: POSTS_RESOURCE,
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
  return {
    type:    CREATE_POST,
    payload: API.create({ resource: POSTS_RESOURCE, data })
  };
}


export function deletePost(id) {
  return {
    type:    DELETE_POST,
    payload: API.destroy({ resource: POSTS_RESOURCE, params: { id } })
  };
}


export function updatePost(id, data) {
  return {
    type:    UPDATE_POST,
    payload: API.update({ resource: POSTS_RESOURCE, params: { id }, data })
  };
}
