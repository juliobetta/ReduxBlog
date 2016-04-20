import { NETWORK_OFFLINE } from '../constants';
import { SIGNOUT_USER }    from '../actions/users-actions';


export function handleError({ error, dispatch }) {
  console.debug(error);

  if(error.offline) {
    dispatch({ type: NETWORK_OFFLINE, payload: true });
    return;
  }

  if(error.status === 401) {
    dispatch({ type: SIGNOUT_USER });
    dispatch(push('/sign_in'));
  }
}
