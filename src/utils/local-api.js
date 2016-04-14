import { schema } from './database-schema';
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


export function create({ resource, data }, transaction = false) {
  return schema.then((database) => {
    const table = database.getSchema().table(resource);
    const row   = table.createRow(defaults(table, data));
    const scope = database.insert().into(table).values([row]);

    if(transaction) {
      return scope;
    }

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


export function destroy({ resource, params = {} }, transaction = false) {
  return schema.then((database) => {
    const table      = database.getSchema().table(resource);
    const conditions = extractConditionsWith(table, params);
    const scope      = database.delete().from(table).where(conditions);

    if(transaction) {
      return scope;
    }

    return scope.exec().then(() => {
      return Promise.resolve(params.id || null);
    });
  });
}


export function softDelete({ resource, params = {} }, transaction = false) {
  return schema.then((database) => {
    const table      = database.getSchema().table(resource);
    const conditions = extractConditionsWith(table, params);
    const scope      = database.update(table)
                               .set(table.updated_at, getCurrentTimestamp())
                               .set(table.deleted_at, getCurrentTimestamp())
                               .where(conditions);
    if(transaction) {
      return scope;
    }

    return scope.exec().then(() => {
      return Promise.resolve(params.id || null);
    });
  });
}


export function update({ resource, data, params = {}}, transaction = false) {
  return schema.then((database) => {
    const table      = database.getSchema().table(resource);
    const conditions = extractConditionsWith(table, params);

    let scope = database.update(table);

    if(params.id) {
      data = { ...data, id: params.id };
    }

    scope = extractUpdatesWith(scope, table, data).where(conditions);


    if(transaction) {
      return scope;
    }

    return scope.exec().then(() => Promise.resolve(data));
  });
}


export function processInBulk(data) {
  return schema.then((database) => {
    const promises = [];
    let resource, params, attrs;

    for(resource of Object.keys(data)) {

      for(attrs of data[resource]) {

        params = [
          OR, { id: attrs.id || null, remote_id: attrs.remote_id || null }
        ];

        if(attrs.deleted_at) {
          promises.push(destroy({ resource, params }));
        } else {

          // try to create
          promises.push(
            fetchOne({ resource, params }).then(
              () => update({ resource, data: attrs, params }),
              () => create({ resource, data: attrs })
            )
          );
        }
      }
    }

    return Promise.all(promises);
  });
}
