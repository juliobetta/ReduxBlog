import { getToken, saveToken } from '../utils';
import { AUTH_USER, GET_TOKEN, GET_USER, CREATE_USER,
         UPDATE_USER, DELETE_USER } from '../actions/users-actions';


const INITIAL_STATE = { currentUser: null, token: null, errors: [] };


export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_TOKEN: return { ...state, token: action.payload.token };

    case AUTH_USER:
    case GET_USER:
    case UPDATE_USER:
    case CREATE_USER:
      const token = action.payload.data.token || null;
      saveToken(token);
      return {
        ...state, token,
        currentUser: action.payload.data        || null,
        errors:      action.payload.data.errors || []
      };
  }

  return state;
}
