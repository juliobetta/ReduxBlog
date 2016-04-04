import { LOG_CHANGED } from '../constants';

const INITIAL_STATE = { changed: false }


export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOG_CHANGED:
    return { ...state, changed: action.payload };
  }

  return state;
}
