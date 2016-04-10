import { LAST_SYNC } from '../constants';

/**
 * Update last sync date
 * @return {void}
 */
export function updateSyncDate() {
  localStorage.setItem(LAST_SYNC, +new Date());
}


/**
 * Get last sync date
 * @return {Integer} timestamp
 */
export function getLastSyncDate() {
  return +localStorage.getItem(LAST_SYNC);
}
