import { SYNC_START, SYNC_FINISH } from '../actions/sync-actions';

const INITIAL_STATE = { started: false, finished: false }


export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SYNC_START:
    return { started: true, finished: false };

    case SYNC_FINISH:
    return { started: false, finished: true }
  }

  return state;
}
