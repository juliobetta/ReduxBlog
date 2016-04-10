import { updateSyncDate, getLastSyncDate }   from '../utils';
import { fetchAll, fetchOne, processInBulk } from '../utils/local-api';
import { webApi }                            from '../utils/web-api';
import { POSTS_RESOURCE, SYNC_RESOURCE }     from '../utils/database-schema';
import { NETWORK_OFFLINE }                   from '../constants';
import { GET, PATCH }                        from '../constants/http-methods';


export const SYNC_STARTED  = 'SYNC_STARTED';
export const SYNC_FINISHED = 'SYNC_FINISHED';


export function syncDown() {
  return dispatch => {
    dispatch({ type: SYNC_STARTED });

    webAPI({ method: GET, uri: 'sync' }).then(
      (response) => {

        // insert/update registers on database.
        // update last sync date

        dispatch({ type: SYNC_FINISHED });
      }
    );
  };
}


export function syncUp() {
  const params = { updated_at: ['gte', getLastSyncDate()] };

  return dispatch => {
    dispatch({ type: SYNC_STARTED });

    fetchAll({ resource: POSTS_RESOURCE, params }).then((posts) => {
      const data = { data: { posts } };

      webApi({ method: PATCH, uri: 'sync', data }).then(
        (response) => {
          updateSyncDate();
          processInBulk(response.data).then(
            () => dispatch({ type: SYNC_FINISHED })
          );
        }
      ).catch(error => {
        if(error.offline) {
          dispatch({ type: NETWORK_OFFLINE, payload: true });
        }
      });
    });
  };
}
