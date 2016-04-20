import { webApi } from '../utils/web-api';
import { HEAD }   from '../constants/http-methods';


export const NETWORK_OFFLINE = 'NETWORK_OFFLINE';


/**
 * Set network offline status
 * @param {Boolean} status
 * @return {Object}
 */
export function setNetworkStatus(status) {
  return {
    type:    NETWORK_OFFLINE,
    payload: status
  };
}


/**
 * Check network status
 * @return {Function}
 */
export function checkNetworkIsOnline() {
  return dispatch => {
    webApi({ method: HEAD }).then(
      ()      => dispatch({ type: NETWORK_OFFLINE, payload: false }),
      (error) => {
        dispatch({ type: NETWORK_OFFLINE, payload: error.offline })
      }
    );
  };
}
