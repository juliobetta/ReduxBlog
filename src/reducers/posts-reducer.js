import { FETCH_POSTS, GET_POST, UPDATE_POST,
         DELETE_POST, EMPTY_POST } from '../actions/posts-actions';


const INITIAL_STATE = { all: [], post: null };


const updatePost = (state, data) => {
  return state.all.map((post) => {
    return post.id === data.id ? data : post;
  });
};

const deletePost = (state, id) => {
  return state.all.filter((post) => {
    return post.id !== id;
  });
};


export default function(state = INITIAL_STATE, action) {
  if(action.payload && action.payload.data && action.payload.data.errors) {
    return INITIAL_STATE;
  }

  switch(action.type) {
    case EMPTY_POST:  return { ...state, post: null };
    case FETCH_POSTS: return { ...state, all: action.payload.data };
    case GET_POST:    return { ...state, post: action.payload.data };

    case UPDATE_POST:
    return { ...state, all: updatePost(state, action.payload.data) };

    case DELETE_POST:
    return { ...state, all: deletePost(state, action.payload.id) };
  }

  return state;
}
