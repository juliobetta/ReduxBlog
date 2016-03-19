import { FETCH_POSTS, GET_POST, DELETE_POST, EMPTY_POST } from '../actions/index';


const INITIAL_STATE = { all: [], post: null };


export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POSTS: return { ...state, all: action.payload.data };
    case GET_POST:    return { ...state, post: action.payload.data };
    case EMPTY_POST:  return { ...state, post: null };
    case DELETE_POST:
      const filtered = state.all.filter((post) => {
        return post.id !== action.payload.data.id
      });
      return { ...state, all: filtered }
  }

  return state;
}
