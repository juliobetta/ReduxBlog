import { NETWORK_OFFLINE } from '../actions/network-actions';

const INITIAL_STATE = { offline: false };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case NETWORK_OFFLINE: return { offline: action.payload }
  }

  return state;
}
