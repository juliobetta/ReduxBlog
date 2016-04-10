import { SYNC_STARTED, SYNC_FINISHED } from '../actions/sync-actions';

const INITIAL_STATE = { started: false, finished: false }


export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SYNC_STARTED:  return { started: true,  finished: false };
    case SYNC_FINISHED: return { started: false, finished: true  };
  }

  return state;
}
