import { conditions } from './database-schema';


/**
 * Generate UUID
 * @return {String}
 */
export const generateId = () => {
  let d = new Date().getTime();

  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d/16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });

  return uuid;
};


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
 * @param  {Object} params = null
 * @return {Object}
 */
export const extractConditionsWith = (table, params = null) => {
  if(!params || typeof params !== 'object') {
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
};


/**
 * Extract values from data and pass to Lovefield's update method
 * @param  {Lovefield.Scope} scope
 * @param  {Lovefield.Table} table
 * @param  {Object} data = null
 * @return {Lovefield.Scope}
 */
export const extractUpdatesWith = (scope, table, data = null) => {
  if(!data) {
    return scope;
  }

  for(let [key, value] of Object.entries(data)) {
    scope.set(table[key], value);
  }

  return scope;
}

/**
 * Fill out data with default values
 * @param  {Lovefield.Table} table
 * @param  {Object} data
 * @return {Obbject}
 */
export const defaults = (table, data = {}) => {
  if(table.persisted) {
    data['persisted'] = false;
  }

  if(table.id) {
    data['id'] = generateId();
  }

  if(table.created_at) {
    data['created_at'] = +new Date();
  }

  if(table.updated_at) {
    data['updated_at'] = +new Date();
  }

  return data;
};
