import { AUTH_USER, CREATE_USER,
         UPDATE_USER, DELETE_USER } from '../actions/users-actions';


const INITIAL_STATE = { currentUser: null, token: null, errors: [] };


export default function(state = INITIAL_STATE, action) {

  switch(action.type) {
    case AUTH_USER:
    case UPDATE_USER:
    case CREATE_USER: return {
      ...state,
      currentUser: action.payload.data        || null,
      token:       action.payload.data.token  || null,
      errors:      action.payload.data.errors || []
    };
  }

  return state;
}
