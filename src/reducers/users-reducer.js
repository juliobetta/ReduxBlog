import { AUTH_USER } from '../actions/users-actions';


const INITIAL_STATE = { currentUser: null, isSignedIn: false, errors: [] };


export default function(state = INITIAL_STATE, action) {

  switch(action.type) {
    case AUTH_USER: return {
      ...state,
      currentUser: action.payload.data        || null,
      isSignedIn:  action.payload.data.token  || null,
      errors:      action.payload.data.errors || []
    };
  }

  return state;
}
