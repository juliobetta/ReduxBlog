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



// #############################################################################
// PRIVATE FUNCTIONS ###########################################################
// #############################################################################

function processResponse(response) {
  return processInBulk(response.data);
}


function processError({ error, dispatch }) {
  console.log(error);

  if(error.offline) {
    dispatch({ type: NETWORK_OFFLINE, payload: true });
    return;
  }

  if(error.status === 401) {
    dispatch({ type: SIGNOUT_USER });
    dispatch(push('/sign_in'));
  }
}


function fetchAllAndSyncUp() {
  const params = { updated_at: ['gte', getLastSyncDate()] };

  return Post.fetchAll(params).then((posts) => {
    const data = { data: { posts } };

    return webApi(
      {
        data,
        method: PATCH,
        uri: 'sync',
      }
    ).then(processResponse);
  });
}


function syncAllDown() {
  return webApi(
    {
      method: GET,
      uri: `sync?updated_at=${getLastSyncDate()}`
    }
  ).then(processResponse);
}



// #############################################################################
// PUBLIC FUNCTIONS ############################################################
// #############################################################################

export function syncDown() {
  return dispatch => {
    dispatch({ type: SYNC_STARTED });

    syncAllDown.then(() => {
      updateSyncDate();
      dispatch({ type: SYNC_FINISHED });
    }).catch(error => processError({ error, dispatch }));
  };
}


export function syncUp() {
  return dispatch => {
    dispatch({ type: SYNC_STARTED });

    fetchAllAndSyncUp().then(() => {
      updateSyncDate();
      dispatch({ type: SYNC_FINISHED });
    }).catch(error => processError({ error, dispatch }));
  };
}


export function syncAll() {
  return dispatch => {
      syncAllDown()
      .then(fetchAllAndSyncUp)
      .then(Post.index)
      .then((posts) => {
        updateSyncDate();
        dispatch({ type: FETCH_POSTS, payload: posts });
        dispatch({ type: SYNC_FINISHED });
      }).catch(error => processError({ error, dispatch }));
  };
}
