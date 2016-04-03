import { SIGNIN_USER, SIGNOUT_USER, GET_USER, CREATE_USER,
         UPDATE_USER, DELETE_USER } from '../actions/users-actions';


const INITIAL_STATE = { currentUser: null, token: null };


export default function(state = INITIAL_STATE, action) {
  if(action.error) {
    return INITIAL_STATE;
  }

  switch(action.type) {
    case DELETE_USER:
    case SIGNOUT_USER:
      return INITIAL_STATE;

    case SIGNIN_USER:
    case GET_USER:
    case UPDATE_USER:
    case CREATE_USER:
      const token = action.payload.token || null;

      return {
        ...state, token,
        currentUser: action.payload || null,
        errors: []
      };
  }

  return state;
}
