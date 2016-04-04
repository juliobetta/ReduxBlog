import { fetchAll }       from './local-api';
import webAPI             from './web-api';
import { POSTS_RESOURCE } from './database-schema';
import { GET, PATCH }     from '../constants/http-methods';


export const SYNC_START  = 'SYNC_START';
export const SYNC_FINISH = 'SYNC_FINISH';


export function down() {
  return {
    type: SYNC_START,
    payload: webAPI({ method: GET, resource: 'sync/down' }).then(
      (response) => {
        // insert/update registers on database.
        // update last sync date
      }
    )
  };
}


export function up() {
  return {
    type: SYNC_START,
    payload: fetchAll({ resource: POSTS_RESOURCE }).then((results) => {
      return webAPI({ method: PATCH, resource: 'sync/up' }).then((response) => {
        // update last sync date
      });
    })
  };
}
