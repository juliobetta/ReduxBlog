import { schema, getResources } from './database-schema';
import { resetSyncDate } from './index';
import { extractConditionsWith, extractUpdatesWith, getCurrentTimestamp,
         extractOptionsWith, defaults, OR
       } from './database-utils';


export function fetchAll({ resource, params = {}, options = {} }) {
  return schema.then((database) => {
    const table      = database.getSchema().table(resource);
    const conditions = extractConditionsWith(table, params);
    const scope      = database.select().from(table);

    return extractOptionsWith(scope, table, options).where(conditions).exec();
  });
}


export function fetchOne({ resource, params = {} }) {
  return schema.then((database) => {
    const table      = database.getSchema().table(resource);
    const conditions = extractConditionsWith(table, params);

    return database.select().from(table).where(conditions).exec().then((r) => {
      if(r[0] === undefined) {
        return Promise.reject();
      }

      return Promise.resolve(r[0]);
    });
  });
}


export function create({ resource, data }) {
  return schema.then((database) => {
    const table = database.getSchema().table(resource);
    const row   = table.createRow(defaults(table, data));
    const scope = database.insert().into(table).values([row]);

    return scope.exec().then(
      (result) => {
        if(result[0] === undefined) {
          return Promise.reject();
        }

        return Promise.resolve(result[0]);
      }
    );
  });
}


export function destroy({ resource, params = {} }) {
  return schema.then((database) => {
    const table      = database.getSchema().table(resource);
    const conditions = extractConditionsWith(table, params);
    const scope      = database.delete().from(table).where(conditions);

    return scope.exec().then(() => {
      return Promise.resolve(params.id || null);
    });
  });
}


export function softDelete({ resource, params = {} }) {
  return schema.then((database) => {
    const table      = database.getSchema().table(resource);
    const conditions = extractConditionsWith(table, params);
    const scope      = database.update(table)
                               .set(table.updated_at, getCurrentTimestamp())
                               .set(table.deleted_at, getCurrentTimestamp())
                               .where(conditions);

    return scope.exec().then(() => {
      return Promise.resolve(params.id || null);
    });
  });
}


export function update({ resource, data, params = {}}) {
  return schema.then((database) => {
    const table      = database.getSchema().table(resource);
    const conditions = extractConditionsWith(table, params);

    let scope = database.update(table);

    if(params.id) {
      data = { ...data, id: params.id };
    }

    scope = extractUpdatesWith(scope, table, data).where(conditions);

    return scope.exec().then(() => Promise.resolve(data));
  });
}


export function insertOrUpdate({ resource, data, params = {} }) {
  return fetchOne({ resource, params }).then(
    () => update({ resource, data, params }),
    () => create({ resource, data })
  );
}


export function processInBulk(data) {
  return schema.then((database) => {
    const promises = [];
    let params, resource, attrs;

    for(resource of Object.keys(data)) {
      for(attrs of data[resource]) {

        params = {
          criteria: OR,
          fields: { id: attrs.id || '', remote_id: attrs.remote_id || 0 }
        };

        if(attrs.deleted_at) {
          promises.push(destroy({ resource, params }));
        } else {
          promises.push(insertOrUpdate({ resource, data: attrs, params }));
        }
      }
    }

    return Promise.all(promises);
  });
}


export function wipeDatabase() {
  resetSyncDate();
  const promises = getResources().map((resource) => destroy({ resource }));
  return Promise.all(promises);
}
