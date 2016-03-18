import axios from 'axios';
import { API_URL, API_KEY } from '../constants/common';


export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';


export function fetchPosts() {
  const url     = `${API_URL}/posts?key=${API_KEY}`;
  const request = axios.get(url);

  return {
    type:    FETCH_POSTS,
    payload: request
  };
}


export function createPost(props) {
  const url     = `${API_URL}/posts?key=${API_KEY}`;
  const request = axios.post(url, props);

  return {
    type:    CREATE_POST,
    payload: request
  };
}
