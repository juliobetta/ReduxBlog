import { logChange }   from '../utils/local-api';
import { LOG_CHANGED } from '../constants';


export default function({ dispatch }) {
  return next => action => {
    if(!action.log || !action.payload || !action.payload.then) {
      return next(action);
    }

    return action.payload.then(
      (result) => {
        logChange({ ...action.log, data: result });
        dispatch({ type: LOG_CHANGED, payload: true });

        return Promise.resolve(result);
      },
      (error) => dispatch({ ...action, log: false, payload: error, error: true })
    );
  };
}
