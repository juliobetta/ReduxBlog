import { conditions, orderDirections } from './database-schema';


/**
 * get current timestamp
 * @return {Float}
 */
export function getCurrentTimestamp() {
  return new Date().getTime();
}


/**
 * Generate UUID
 * @return {String}
 */
export function generateId() {
  let d = new Date().getTime();

  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d/16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });

  return uuid;
}


/**
 * Extract conditions from params
 * @see https://github.com/google/lovefield/blob/master/docs/spec/04_query.md
 * @example
 * params = {
 *   id: ['eq', 1],
 *   val: ['gt', 2]
 * }
 * // or
 * params = {
 *   id: 1,
 *   val: ['gt', 2]
 * }
 * @param  {Lovefield.Table} table
 * @param  {Object} params
 * @return {Object}
 */
export function extractConditionsWith(table, params) {
  if(typeof params !== 'object') {
    return null;
  }

  if(Object.entries(params).length === 0) {
    return null;
  }

  const args = [];

  for(let [key, value] of Object.entries(params)) {
    if(value instanceof Array) {
      args.push(table[key][value[0]](value[1]));
    } else {
      args.push(table[key]['eq'](value));
    }
  }

  return conditions.and(...args);
}


/**
 * Extract values from data and pass to Lovefield's update method
 * @param  {Lovefield.Scope} scope
 * @param  {Lovefield.Table} table
 * @param  {Object} data = null
 * @return {Lovefield.Scope}
 */
export function extractUpdatesWith(scope, table, data = null) {
  if(!data) {
    return scope;
  }

  for(let [key, value] of Object.entries(data)) {
    scope.set(table[key], value);
  }

  if(table.updated_at) {
    scope.set(table.updated_at, data.updated_at || getCurrentTimestamp());
  }

  return scope;
}


/**
 * Extract query options.
 * Example:
 * const options = {
 *   orderBy: [
 *     ['id', orderDirections.DESC],
 *     ['created_at'] // ASC by default
 *   ]
 * }
 * @param  {Lovefield.Scope} scope
 * @param  {Lovefield.Table} table
 * @param  {Object} { orderBy = [] }
 * @return {Lovefeld.Scope}
 */
export function extractOptionsWith(scope, table, { orderBy = [] }) {
  if(orderBy.length) {
    let field, dir;
    for([field, dir] of orderBy) {
      dir = dir === undefined ? orderDirections.ASC : dir;
      scope.orderBy(table[field], dir);
    }
  }

  return scope;
}


/**
 * Fill out data with default values
 * @param  {Lovefield.Table} table
 * @param  {Object} data
 * @return {Obbject}
 */
export function defaults(table, data = {}) {
  if(table.persisted) {
    data['persisted'] = false;
  }

  if(table.id) {
    data['id'] = generateId();
  }

  if(table.created_at) {
    data['created_at'] = data.created_at || getCurrentTimestamp();
  }

  if(table.updated_at) {
    data['updated_at'] = data.created_at || getCurrentTimestamp();
  }

  return data;
}
