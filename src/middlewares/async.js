export default function({ dispatch, getState }) {
  return next => action => {
    if (action instanceof Function) {
      return action(dispatch, getState);
    }

    return next(action);
  };
}
