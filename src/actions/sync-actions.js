import { push }                              from 'react-router-redux';
import { updateSyncDate, getLastSyncDate }   from '../utils';
import { fetchAll, fetchOne, processInBulk } from '../utils/local-api';
import { webApi }                            from '../utils/web-api';
import { POSTS_RESOURCE, SYNC_RESOURCE }     from '../utils/database-schema';
import { NETWORK_OFFLINE }                   from '../constants';
import { GET, PATCH }                        from '../constants/http-methods';


export const SYNC_STARTED  = 'SYNC_STARTED';
export const SYNC_FINISHED = 'SYNC_FINISHED';


function processResponse(response) {
  updateSyncDate();
  return processInBulk(response.data);
}


function processError({ error, dispatch }) {
  if(error.offline) {
    dispatch({ type: NETWORK_OFFLINE, payload: true });
    return;
  }

  if(error.status === 401) {
    dispatch(push('/sign_in'));
  }
}


export function syncDown() {
  return dispatch => {
    dispatch({ type: SYNC_STARTED });

    webAPI({ method: GET, uri: 'sync' })
      .then(processResponse)
      .then(() => dispatch({ type: SYNC_FINISHED }))
      .catch(error => processError({ error, dispatch }));
  };
}


export function syncUp() {
  const params = { updated_at: ['gte', getLastSyncDate()] };

  return dispatch => {
    dispatch({ type: SYNC_STARTED });

    fetchAll({ resource: POSTS_RESOURCE, params }).then((posts) => {
      const data = { data: { posts } };

      webApi({ method: PATCH, uri: 'sync', data })
        .then(processResponse)
        .then(() => dispatch({ type: SYNC_FINISHED }))
        .catch(error => processError({ error, dispatch }));
    });
  };
}


export function syncAll() {
  const params = { updated_at: ['gte', getLastSyncDate()] };

  return dispatch => {
    webAPI({ method: GET, uri: 'sync', data: { start_from: getLastSyncDate() } })
      .then(processResponse)
      .then(() => {
        return fetchAll({ resource: POSTS_RESOURCE, params }).then((posts) => {
          const data = { data: { posts } };

          return webApi({ method: PATCH, uri: 'sync', data })
            .then(processResponse)
        });
      })
      .then(() => dispatch({ type: SYNC_FINISHED }))
      .catch(error => processError({ error, dispatch }));
  };
}
