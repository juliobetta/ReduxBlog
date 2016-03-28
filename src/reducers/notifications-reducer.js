import { EMPTY_NOTIFICATIONS } from '../constants';


const INITIAL_STATE = { messages: [], statusCode: null, error: false };

export default function(state = INITIAL_STATE, action)  {
  switch(action.type) {
    case EMPTY_NOTIFICATIONS: return INITIAL_STATE;

    default:
      if(action.payload === undefined || action.payload.data === undefined) {
        return state;
      }

      return {
        ...state,
        messages:   action.payload.data.errors || [],
        statusCode: action.payload.status || null,
        error:      action.payload.data.errors !== undefined
      };
  }
}
