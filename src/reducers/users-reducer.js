import { getToken, saveToken } from '../utils';
import { SIGNIN_USER, SIGNOUT_USER, GET_USER, CREATE_USER,
         UPDATE_USER, DELETE_USER } from '../actions/users-actions';


const INITIAL_STATE = { currentUser: null, token: getToken(), errors: [] };


export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SIGNOUT_USER:
      saveToken(null);
      return INITIAL_STATE;

    case SIGNIN_USER:
    case GET_USER:
    case UPDATE_USER:
    case CREATE_USER:
      if(action.payload.data.errors) {
        return { ...state, errors: action.payload.data.errors };
      }

      const token = action.payload.data.token || null;
      saveToken(token);

      return {
        ...state, token,
        currentUser: action.payload.data || null,
        errors: []
      };
  }

  return state;
}
