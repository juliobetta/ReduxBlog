import { NETWORK_OFFLINE } from '../actions/network-actions';
import { SYNC_FINISHED }   from '../actions/sync-actions';


const INITIAL_STATE = { offline: false };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SYNC_FINISHED:   return { offline: false };
    case NETWORK_OFFLINE: return { offline: action.payload };
  }

  return state;
}
