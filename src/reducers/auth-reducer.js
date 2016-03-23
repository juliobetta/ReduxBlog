import { AUTH_SIGNIN } from '../actions/auth-actions';


const INITIAL_STATE = { currentUser: null, isSignedIn: false };


export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_SIGNIN: return {
      ...state,
      currentUser: action.payload.data
    };
  }

  return state;
}
