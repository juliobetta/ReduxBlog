import { fetchAll, fetchOne }            from '../utils/local-api';
import { webApi }                        from '../utils/web-api';
import { POSTS_RESOURCE, SYNC_RESOURCE } from '../utils/database-schema';
import { GET, PATCH }                    from '../constants/http-methods';


export const SYNC_START  = 'SYNC_START';
export const SYNC_FINISH = 'SYNC_FINISH';

const LAST_SYNC = 'last_sync';


const updateSyncDate = () => {
  localStorage.setItem(LAST_SYNC, +new Date());
};

const getLastSyncDate = () => {
  return +localStorage.getItem(LAST_SYNC);
};


export function syncDown() {
  return {
    type: SYNC_START,
    payload: webAPI({ method: GET, uri: 'sync/down' }).then(
      (response) => {

        // insert/update registers on database.
        // update last sync date
      }
    )
  };
}


export function syncUp() {
  const params = { updated_at: ['gte', getLastSyncDate()] };

  return {
    type: SYNC_START,
    payload: fetchAll({ resource: POSTS_RESOURCE, params }).then((posts) => {
      console.log('to be posted', posts);

      return webApi({ method: PATCH, uri: 'sync/up', data: { posts } }).then(
        (response) => {
          console.log(response);
          updateSyncDate();
          return Promise.resolve(response);
        }
      ).catch(error => { /* Do NOTHING for now */ });
    })
  };
}
