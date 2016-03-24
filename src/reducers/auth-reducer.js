import { AUTH_SIGNIN } from '../actions/auth-actions';


const INITIAL_STATE = { currentUser: null, isSignedIn: false, errors: [] };


export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_SIGNIN: return {
      ...state,
      isSignedIn: action.payload.data.token !== null,
      currentUser: action.payload.data || null,
      errors: action.payload.data.errors || []
    };
  }

  return state;
}
