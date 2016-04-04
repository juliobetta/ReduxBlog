import { fetchAll }       from './local-api';
import webAPI             from './web-api';
import { POSTS_RESOURCE } from './database-schema';
import { GET, PATCH }     from '../constants/http-methods';


export const down() => {
  return webAPI({ method: GET, resource: 'sync/down' }).then((response) => {
    // insert/update registers on database.
    // update last sync date
  });
};


export const up() => {
  return fetchAll({ resource: POSTS_RESOURCE }).then((results) => {
    return webAPI({ method: PATCH, resource: 'sync/up' }).then((response) => {
      // update last sync date
    });
  });
};
