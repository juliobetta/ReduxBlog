import { push }                              from 'react-router-redux';
import { NETWORK_OFFLINE }                   from '../constants';
import { GET, PATCH }                        from '../constants/http-methods';
import { updateSyncDate, getLastSyncDate }   from '../utils';
import { fetchAll, fetchOne, processInBulk } from '../utils/local-api';
import { webApi }                            from '../utils/web-api';
import  Post                                 from '../utils/daos/post';
import { SIGNOUT_USER }                      from '../actions/users-actions';
import { FETCH_POSTS }                       from '../actions/posts-actions';


export const SYNC_STARTED  = 'SYNC_STARTED';
export const SYNC_FINISHED = 'SYNC_FINISHED';


function processResponse(response) {
  return processInBulk(response.data);
}


function processError({ error, dispatch }) {
  if(error.offline) {
    dispatch({ type: NETWORK_OFFLINE, payload: true });
    return;
  }

  if(error.status === 401) {
    dispatch({ type: SIGNOUT_USER });
    dispatch(push('/sign_in'));
  }
}


export function syncDown() {
  return dispatch => {
    dispatch({ type: SYNC_STARTED });

    webApi({ method: GET, uri: `sync?updated_at=${getLastSyncDate()}` })
      .then(processResponse)
      .then(() => {
        updateSyncDate();
        dispatch({ type: SYNC_FINISHED });
      })
      .catch(error => processError({ error, dispatch }));
  };
}


export function syncUp() {
  return dispatch => {
    const params = { updated_at: ['gte', getLastSyncDate()] };

    dispatch({ type: SYNC_STARTED });

    Post.fetchAll(params).then((posts) => {
      const data = { data: { posts } };

      webApi({ method: PATCH, uri: 'sync', data })
        .then(processResponse)
        .then(() => {
          updateSyncDate();
          dispatch({ type: SYNC_FINISHED });
        })
        .catch(error => processError({ error, dispatch }));
    });
  };
}


export function syncAll() {
  return dispatch => {
    webApi({ method: GET, uri: `sync?updated_at=${getLastSyncDate()}` })
      .then(processResponse)
      .then(() => {
        const params = { updated_at: ['gte', getLastSyncDate()] };

        return Post.fetchAll(params).then((posts) => {
          const data = { data: { posts } };

          return webApi({ method: PATCH, uri: 'sync', data })
                  .then(processResponse)
                  .then(() => {
                    updateSyncDate();
                    return Promise.resolve(true);
                  });
        });
      })
      .then(Post.index)
      .then((posts) => {
        dispatch({ type: FETCH_POSTS, payload: posts });
        dispatch({ type: SYNC_FINISHED });
      })
      .catch(error => processError({ error, dispatch }));
  };
}
