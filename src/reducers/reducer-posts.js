import { FETCH_POSTS, GET_POST, UPDATE_POST,
         DELETE_POST, EMPTY_POST } from '../actions/index';


const INITIAL_STATE = { all: [], post: null };


export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POSTS: return { ...state, all: action.payload.data };
    case GET_POST:    return { ...state, post: action.payload.data };
    case EMPTY_POST:  return { ...state, post: null };

    case UPDATE_POST:
      const changed = state.all.map((post) => {
        return post.id === action.payload.data.id ? action.payload.data : post;
      });
      return { ...state, all: changed };

    case DELETE_POST:
      const filtered = state.all.filter((post) => {
        return post.id !== action.payload.data.id
      });
      return { ...state, all: filtered };
  }

  return state;
}
